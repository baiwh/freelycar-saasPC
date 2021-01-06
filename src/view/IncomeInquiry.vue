<template>
  <div class="minwidth">
    <!--选择区间-->
    <el-row>
      <el-col :span="8">
        <el-radio-group v-model="tabPosition" @change="onButtonChange">
          <el-radio-button label="today">今日</el-radio-button>
          <el-radio-button label="thisMonth">本月</el-radio-button>
          <el-radio-button label="search">区间</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="12" v-if="visible">
        <el-date-picker v-model="datePickerValue" type="daterange"
                        range-separator="~" value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期" class="dateWidth"></el-date-picker>
        <el-button type="primary" @click="searchData">查询</el-button>
      </el-col>
      <!--<el-col :span="4" :offset="num">-->
        <!--<el-button type="primary" icon="el-icon-download">导出Excel</el-button>-->
      <!--</el-col>-->
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <span style="fontsize: 26px">总营业额：{{ sum }}元</span>
      </el-col>
    </el-row>
    <el-row>
      <div class="store-echart" id="storeEcharts"></div>
    </el-row>
    <el-row>
      <el-table :data="storeList" border style="width: 93%">
        <el-table-column prop="0" label="项目名称"></el-table-column>
        <el-table-column prop="1" label="所属服务商"></el-table-column>
        <el-table-column prop="2" label="营业额"></el-table-column>
        <el-table-column prop="3" label="占比"></el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'IncomeInquiry',
    data() {
      return {
        loading: true,
        tabPosition: 'today',
        datePickerValue: '',
        amountMethodsTable: [],
        visible: false,
        num: 12,
        searchDate: {
          today: '',
          thisMonth: [],
        },
        storeId:'',
        storeList:[],
        startTime:'',
        endTime:'',
        sum:'',
        storeOption:{},
        storeName:'',
      }
    },
    methods: {
      
      searchStoreData() {
      this.$get("/order/getIncomeByStore", {
        storeId: this.storeId,
        startTime: this.startTime,
        endTime: this.endTime,
      }).then((res) => {
        console.log(res);
        this.sum = res.sum;
        this.storeList = res.list;
        var storeList = [],
            price = [],
            listItem = res.list;
        for(let i in listItem){
          storeList.push(listItem[i][0]+'('+listItem[i][1]+')');
          price.push(listItem[i][2]);
        }
        console.log(storeList);
        
      this.storeOption = {
        title: {
          text: this.storeName+'各项目营业额（元）',
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "value",
          boundaryGap: false,
        },
        yAxis: {
          type: "category",
          data: storeList,
        },
        series: [
          {
            name: "营业额",
            type: "bar",
            data: price,
            barWidth: 30,
            itemStyle: {
              normal: {
                color: "#409EFF",
              },
            },
          },
        ],
      };
      console.log("查询网点");
      let storeEcharts = echarts.init(document.getElementById("storeEcharts"));
      storeEcharts.setOption(this.storeOption);
      });
    },

      // 按钮区间
      onButtonChange(e) {
        if (e === 'today') {
          this.setToday();
          this.searchStoreData();
        }
        if (e === 'thisMonth') {
          this.setMonth();
          this.searchStoreData();
        }
        console.log(e)
        if(e === 'search'){
            this.visible = true;
        }else{
          this.visible = false;
        }
      },
      setMonth(){
      var date = new Date(),
      Y = date.getFullYear() + "-",
      M = (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-",
      D = '01';
      this.startTime = Y+M+D;
      this.endTime = '';
    },

      // 区间查询
      searchData() {
        console.log(this.datePickerValue)
      this.startTime = this.datePickerValue[0];
      this.endTime = this.datePickerValue[1];
      this.searchStoreData();
      },
      setToday(){
      var date = new Date(),
        Y = date.getFullYear() + "-",
        M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-",
        D = date.getDate();
        this.startTime = Y + M + (D-1);
        this.endTime = Y + M + D
      },
    },
    mounted: function () {
      this.storeId = localStorage.getItem('storeId')
      this.storeName = localStorage.getItem('storeName');
      this.setToday();
      this.searchStoreData()
    }
  }
</script>

<style lang="less" scoped>
  .echarts-box {
    height: 300px;
    width: 100%;
  }

  .dateWidth {
    width: 70%;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .el-row {
    margin-bottom: 40px;
  }

  .text-center {
    text-align: center;
  }

  .orange /deep/ .el-card__header {
    background-color: #f90;
  }

  .green /deep/ .el-card__header {
    background-color: #81cdd8;
  }

  .grey /deep/ .el-card__header {
    background-color: #ccc;
  }
  .store-echart {
  width: 1200px;
  height: 500px;
}
.minwidth{
  width : 100%;
  min-width: 1000px;
}
</style>
