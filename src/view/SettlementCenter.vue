<template>
  <div>
    <!--服务项目模块-->
    <div>
      <p>服务项目</p>
      <el-table
        :data="settlementCenterTable"
        border
        style="width: 95%"
        show-summary
        :summary-method="getProjectSummaries"
      >
        <el-table-column type="index" width="50" label="序号" align="center"/>
        <el-table-column width="70" align="center"/>
        <el-table-column property="project" label="项目" width="200" align="center"/>
        <el-table-column property="price" label="项目价格" width="120" align="center"/>
        <el-table-column property="staff" label="施工人员" align="center"/>
      </el-table>
    </div>

    <!--配件明细模块-->
    <div class="marginTop">
      <p>配件明细</p>
      <el-table
        :data="fittingDetailsTable"
        border
        style="width: 95%"
        show-summary
        :summary-method="getFittingSummaries"
      >
        <el-table-column type="index" width="50" label="序号" align="center"/>
        <el-table-column width="70" align="center"/>
        <el-table-column property="fittingCategory" width="90" label="配件类别" align="center"/>
        <el-table-column property="fittingName" width="90" label="配件名称" align="center"/>
        <el-table-column property="number" width="70" label="数量" align="center"/>
        <el-table-column property="perPrice" width="70" label="单价" align="center"/>
        <el-table-column property="sumPrice" label="总价" align="center"/>
      </el-table>
    </div>

    <!--应付金额模块-->
    <div class="marginTop">
      <el-row>
        <el-col :span="8" :offset="16">
          应付金额：
          <el-input :value="amountsPayableComputed" size="small" class="inputWidth red" disabled/>
        </el-col>
      </el-row>
    </div>

    <!--支付方式模块-->
    <div>
      <p>支付方式</p>
      <el-row>
        <el-col :span="8">
          <span class="fontSize">支付方式：</span>
          <el-select v-model="payMethods" size="small" class="inputWidth">
            <el-option v-for="item in payMethodOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span class="fontSize">可用卡劵：</span>
          <el-select v-model="usableCards" size="small" class="inputWidth">
            <el-option v-for="item in usableCardOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span class="fontSize">扣除金额：</span>
          <el-input v-model="deductionAmounts" size="small" class="inputWidth red"/>
          <i class="el-icon-circle-plus-outline" @click="handlePlusIconClick"></i>
        </el-col>
      </el-row>
    </div>

    <!--可隐藏的叠加支付方式模块-->
    <div class="marginTop" v-show="visible">
      <el-row>
        <el-col :span="8">
          <span class="fontSize">支付方式：</span>
          <el-select v-model="payMethods" size="small" class="inputWidth">
            <el-option v-for="item in payMethodOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span class="fontSize">支付金额：</span>
          <el-input v-model="payAmounts" size="small" class="inputWidth red"/>
        </el-col>
        <el-col :span="2" :offset="6">
          <i class="el-icon-remove-outline" @click="handleRemoveIconClick"></i>
        </el-col>
      </el-row>
    </div>
    <div class="buttonStyle">
      <el-button type="primary" size="small" class="marginTop">确定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SettlementCenter',
    data() {
      return {
        settlementCenterTable: [{
          project: '维修维修维修',
          price: '554',
          staff: '张三'
        }, {
          project: '洗车',
          price: '20',
          staff: '李四'
        }, {
          project: '维修',
          price: '123',
          staff: '王五'
        }, {
          project: '维修',
          price: '11',
          staff: '赵六'
        }],
        fittingDetailsTable: [{
          fittingCategory: '机油',
          fittingName: '嘉实多机油',
          number: '20',
          perPrice: '1',
          sumPrice: '20.00'
        }],
        deductionAmounts: '',
        payAmounts: '',
        payMethods: '',
        payMethodOptions: [{
          value: '1',
          label: '会员卡'
        }, {
          value: '2',
          label: '现金'
        }, {
          value: '3',
          label: '微信'
        }, {
          value: '4',
          label: '支付宝'
        }, {
          value: '5',
          label: '易付宝'
        },{
          value: '6',
          label: '刷卡'
        }],
        usableCards: '',
        usableCardOptions: [{
          value: '1',
          label: '1500储值卡'
        }, {
          value: '2',
          label: '3000储值卡'
        }],
        visible: false,
        sumMoney: []
      }
    },
    methods: {
      getProjectSummaries(param) {
        // 计算服务项目的总价
         console.log(1)
         const { columns, data } = param
         const sums = []
         columns.forEach((column, index) => {
           if (index === 1) {
             sums[index] = '合计'
             return
           }else if(index === 3){
             const values = data.map(item => Number(item.price))
             sums[index] = values.reduce((prev, curr) => prev + curr)
             this.sumMoney[this.sumMoney.length] = sums[index]
           }
        })
        return sums
      },
      getFittingSummaries(param) {
        // 计算配件明细的总价
        console.log(2)
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if(index === 1){
            sums[index] = '合计'
            return
          }else if(index === columns.length-1){
            const values = data.map(item => Number(item.sumPrice))
            sums[index] = values.reduce((prev, curr) => prev + curr)
            this.sumMoney[this.sumMoney.length] = sums[index]
          }
        })
        return sums
      },
      handlePlusIconClick() {
        this.visible = true
      },
      handleRemoveIconClick() {
        this.visible = false
      }
    },
    computed: {
      amountsPayableComputed() {
        console.log(3)
        if(this.sumMoney.length !== 0){
          this.amountsPayableComputed = this.sumMoney.reduce((prev, curr) => prev + curr)
        }
      }
    },
    mounted: function () {

    }
  }
</script>

<style lang="less" scoped>
.inputWidth {
  width: 50%;
}
.marginTop {
  margin-top: 30px;
}
.fontSize {
  font-size: 14px;
}
.marginHorizontal {
  margin: 0 auto;
}
.buttonStyle {
  width: 200px;
  text-align: center;
  margin: 0 auto;
}
.red /deep/ .el-input__inner {
  color: red!important;
}
</style>
