<template>
  <div>
    <!--接完交状态-->
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>当前状态</span>
      </div>
      <el-steps process-status="finish" :active="stepActive" finish-status="success">
        <el-step title="接车"></el-step>
        <el-step title="完成"></el-step>
        <el-step title="交车"></el-step>
      </el-steps>
    </el-card>

    <el-card shadow="hover">
      <el-row :gutter="20" class="marginTop">
        <el-col :span="8">
          <el-form :data="carInfoForm" label-width="100px">
            <el-form-item label="车牌号码：" prop="carNumber">
              <el-input v-model="carInfoForm.carNumber" disabled size="small"/>
            </el-form-item>
            <el-form-item label="车牌型号：" prop="carModel">
              <el-input v-model="carInfoForm.carModel" disabled size="small"/>
            </el-form-item>
            <el-form-item label="上次里程：" prop="lastMileage">
              <el-input v-model="carInfoForm.carNumber" disabled size="small"/>
            </el-form-item>
            <el-form-item label="本次里程：" prop="thisMileage">
              <el-input v-model="carInfoForm.carNumber" disabled size="small"/>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form :data="carInfoForm" label-width="100px">
            <el-form-item label="客户姓名：" prop="clientName">
              <el-input v-model="carInfoForm.clientName" disabled size="small"/>
            </el-form-item>
            <el-form-item label="手机号码：" prop="clientPhone">
              <el-input v-model="carInfoForm.clientPhone" disabled size="small"/>
            </el-form-item>
            <el-form-item label="停车位置：" prop="parkPlace">
              <el-input v-model="carInfoForm.parkPlace" disabled size="small"/>
            </el-form-item>
            <el-form-item label="接车时间：" prop="pickUpTime">
              <el-input v-model="carInfoForm.pickUpTime" disabled size="small"/>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-form :data="carInfoForm" label-width="100px">
            <el-form-item label="完工时间：" prop="completionTime">
              <el-input v-model="carInfoForm.completionTime" disabled size="small"/>
            </el-form-item>
            <el-form-item label="交车时间：" prop="deliveryTime">
              <el-input v-model="carInfoForm.deliveryTime" disabled size="small"/>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>

    <!--服务项目模块-->
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>服务项目</span>
      </div>
      <el-table :data="documentDetailProjectTable" show-summary :summary-method="getProjectSummaries">
        <el-table-column type="index" width="50" label="序号" align="center"/>
        <el-table-column width="50" align="center"/>
        <el-table-column property="project" label="项目" align="center"/>
        <el-table-column property="price" label="项目价格" align="center"/>
        <el-table-column property="staff" label="施工人员" align="center"/>
      </el-table>
    </el-card>

    <!--配件明细模块-->
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>配件明细</span>
      </div>
      <el-table :data="fittingDetailsTable" show-summary :summary-method="getFittingSummaries">
        <el-table-column type="index" width="50" label="序号" align="center"/>
        <el-table-column width="70" align="center"/>
        <el-table-column property="fittingCategory" label="配件类别" align="center"/>
        <el-table-column property="fittingName" label="配件名称" align="center"/>
        <el-table-column property="number" label="数量" align="center"/>
        <el-table-column property="perPrice" label="单价" align="center"/>
        <el-table-column property="sumPrice" label="总价" align="center"/>
      </el-table>
    </el-card>

    <!--整单金额、实收金额-->
    <el-card shadow="hover">
      <el-row>
        <el-col :span="6" :offset="18">
          整单金额：
          <el-input :value="wholeAmount" size="small" class="inputWidth red" disabled/>
        </el-col>
        <el-col :span="6" :offset="18" class="marginTop">
          实收金额：
          <el-input :value="payAmounts" size="small" class="inputWidth red" disabled/>
        </el-col>
      </el-row>
    </el-card>

    <!--确定按钮-->
    <el-row>
      <el-col :span="6" :offset="18">
        <el-button type="primary" class="buttonStyle">返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'DocumentDetails',
    data() {
      return {
        carInfoForm: {
          carNumber: '',
          carModel: '',
          lastMileage: '',
          thisMileage: '',
          clientName: '',
          clientPhone: '',
          parkPlace: '',
          pickUpTime: '',
          completionTime: '',
          deliveryTime: ''
        },
        documentDetailProjectTable: [{
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
        wholeAmount: '25',
        payAmounts: '0',
        stepActive: 1,
        stepStatus: 'wait'
      }
    },
    methods: {
      getProjectSummaries(param) {
        // 计算服务项目的总价
        const {columns, data} = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 1) {
            sums[index] = '合计'
            return
          } else if (index === 3) {
            const values = data.map(item => Number(item.price))
            sums[index] = values.reduce((prev, curr) => prev + curr)
          }
        })
        console.log('sums:', sums)
        return sums
      },
      getFittingSummaries(param) {
        // 计算配件明细的总价
        const {columns, data} = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 1) {
            sums[index] = '合计'
            return
          } else if (index === columns.length - 1) {
            const values = data.map(item => Number(item.sumPrice))
            sums[index] = values.reduce((prev, curr) => prev + curr)
          }
        })
        return sums
      }
    },
    mounted: function () {

    }
  }
</script>

<style lang="less" scoped>
  .el-card {
    margin-bottom: 40px;
  }

  .marginTop {
    margin-top: 20px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .inputWidth {
    width: 50%;
  }

  .red /deep/ .el-input__inner {
    color: red !important;
    font-size: 18px;
    font-weight: 700;
  }

  .buttonStyle {
    width: 150px;
    text-align: center;
  }
</style>
