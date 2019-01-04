<template>
  <div>
    <!--第一部分。基本信息-->
    <el-card shadow="hover">
      <el-row :gutter="60">
        <el-col :span="8">车牌号码：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <router-link to="/AddNewCustomers">
            <addNewButton></addNewButton>
          </router-link>
        </el-col>
        <el-col :span="8">客户管理：
          <el-input v-model="input" disabled></el-input>
          <router-link to="/AddNewCustomers">
            <addNewButton></addNewButton>
          </router-link>
        </el-col>
        <el-col :span="8">是否会员：
          <el-radio disabled v-model="radio" label="是">会员</el-radio>
          <el-radio disabled v-model="radio" label="否">非会员</el-radio>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="8">品牌型号：
          <el-input v-model="input" disabled></el-input>
        </el-col>
        <el-col :span="8">手机号码：
          <el-input v-model="input" disabled></el-input>
        </el-col>
        <el-col :span="8">接车时间：
          <el-date-picker v-model="datetime" type="datetime"
                          placeholder="选择日期时间"></el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="8">上次里程：
          <el-input v-model="input" disabled></el-input>
          /km
        </el-col>
        <el-col :span="8">历史消费：
          <el-input v-model="input" disabled></el-input>
          /元
        </el-col>
        <el-col :span="8">接车人员：
          <el-select v-model="selectValue" placeholder="请选择">
            <el-option v-for="item in selectOptions" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="8">本次里程：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          /km
        </el-col>
        <el-col :span="8">剩余金额：
          <el-input v-model="input" disabled></el-input>
          /元
        </el-col>
      </el-row>
    </el-card>

    <!--第二部分。故障-->
    <el-card shadow="hover">
      <div slot="header">
        <span>故障描述</span>
      </div>
      <el-input type="textarea" autosize
                placeholder="请输入故障描述" v-model="faultDescription"></el-input>
    </el-card>

    <!--第三部分。服务项目-->
    <el-card shadow="hover">
      <div slot="header">
        <span>服务项目</span>
        <el-button type="primary" class="addButton" icon="el-icon-plus" plain>添加</el-button>
      </div>
      <el-table :data="tableData1" show-summary :summary-method="getSummaries" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="price" label="项目价格"></el-table-column>
        <el-table-column prop="staffName" label="施工人员"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--第四部分。使用配件-->
    <el-card shadow="hover">
      <div slot="header">
        <span>使用配件</span>
        <el-button type="primary" class="addButton" icon="el-icon-plus" plain>添加</el-button>
      </div>
      <el-table :data="tableData2" show-summary :summary-method="getFittingSummaries" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="type" label="配件类别"></el-table-column>
        <el-table-column prop="name" label="配件名称"></el-table-column>
        <el-table-column prop="count" label="数量"></el-table-column>
        <el-table-column prop="unitPrice" label="单价"></el-table-column>
        <el-table-column label="总价">
          <template slot-scope="scope">{{scope.row.count*scope.row.unitPrice}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--金额结算等-->
    <el-row>
      <el-col :offset="9" :span="5">项目：<span class="redPrice">70</span>元</el-col>
      <el-col :span="5">配件：<span class="redPrice">70</span>元</el-col>
      <el-col :span="5">整单金额：<span class="redPrice">70</span>元</el-col>
    </el-row>
    <el-row>
      <el-col :offset="16" :span="4">
        <el-button type="primary">保存</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary">结算</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'QuickBilling',
    data() {
      return {
        input: '',
        radio: '否',
        datetime: '',
        selectOptions: [{
          value: '选项1',
          label: '111'
        }, {
          value: '选项2',
          label: '222'
        }],
        selectValue: '',
        faultDescription: '',
        tableData1: [{
          projectName: 'a',
          price: 1,
          staffName: 'a'
        }, {
          projectName: 'b',
          price: 2,
          staffName: 'b'
        }],
        tableData2: [{
          type: 'a',
          name: 'a',
          people: 'a',
          count: 2,
          unitPrice: 5
        }, {
          type: 'b',
          name: 'b',
          people: 'b',
          count: 2,
          unitPrice: 3
        }]
      }
    },
    methods: {
      handleDelete() {
        console.log('this', this.radio)
      },
      sum(param, totalIndex, totalPriceIndex, ride) {
        const {columns, data} = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === totalIndex) {
            sums[index] = '合计'
            return
          } else if (index === totalPriceIndex) {
            if (ride) {
              const values = data.map(item => Number(item.count * item.unitPrice))
              sums[index] = eval(values.join("+"))
            } else {
              const values = data.map(item => Number(item.price))
              sums[index] = values.reduce((prev, curr) => prev + curr)
            }
          }
        })
        return sums
      },
      getSummaries(param) {
        return this.sum(param, 0, 2)
      },
      getFittingSummaries(param) {
        return this.sum(param, 0, 5, true)
      }
    },
    mounted: function () {

    }
  }
</script>

<style lang="less" scoped>
  .el-input {
    width: 60%;
  }

  .el-row {
    margin: 20px 0;
  }

  .el-card {
    margin-bottom: 40px;
  }

  .addButton {
    margin: 0 20px;
  }

  .redPrice {
    color: red;
    font-size: 25px;
    margin: 20px;
  }
</style>
