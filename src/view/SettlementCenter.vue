<template>
  <div>

    <!--服务项目模块-->
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>服务项目</span>
      </div>
      <el-table :data="consumerProjectInfos" show-summary :summary-method="getProjectSummaries">
        <el-table-column type="index" width="50" label="序号" align="center"/>
        <el-table-column width="70" align="center"/>
        <el-table-column property="project" label="项目" width="200" align="center"/>
        <el-table-column property="price" label="项目价格" width="120" align="center"/>
        <el-table-column property="staff" label="施工人员" align="center"/>
      </el-table>
    </el-card>

    <!--配件明细模块-->
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>配件明细</span>
      </div>
      <el-table :data="autoParts" show-summary :summary-method="getFittingSummaries">
        <el-table-column type="index" width="50" label="序号" align="center"/>
        <el-table-column width="70" align="center"/>
        <el-table-column property="fittingCategory" width="90" label="配件类别" align="center"/>
        <el-table-column property="fittingName" width="90" label="配件名称" align="center"/>
        <el-table-column property="number" width="70" label="数量" align="center"/>
        <el-table-column property="perPrice" width="70" label="单价" align="center"/>
        <el-table-column property="sumPrice" label="总价" align="center"/>
      </el-table>
    </el-card>

    <!--应付金额模块-->
    <el-row class="paymentInput">
      <el-col :span="6" :offset="18">
        应付金额：
        <el-input :value="amountsPayableComputed" size="small" class="inputWidth red" disabled/>
      </el-col>
    </el-row>

    <!--支付方式模块-->
    <el-card shadow="hover">
      <div slot="header" class="clearfix">
        <span>支付方式</span>
      </div>

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
        <el-col :span="7">
          <span class="fontSize">扣除金额：</span>
          <el-input v-model="deductionAmounts" size="small" class="inputWidth red"/>
        </el-col>
        <el-col :span="1">
          <add-new-button @click="handlePlusIconClick"></add-new-button>
        </el-col>
      </el-row>

      <!--可隐藏的叠加支付方式模块-->
      <div v-show="visible">
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
          <el-col :span="1" :offset="7">
            <add-new-button :minus="true" @click="handleRemoveIconClick"></add-new-button>
          </el-col>
        </el-row>
      </div>

      <!--确定按钮-->
      <el-row>
        <el-col :span="5" :offset="8">
          <el-button type="primary" size="small" @click="orderPayment">确定</el-button>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" size="small" @click="pendingOrder">结算</el-button>
        </el-col>
      </el-row>
      <div>


      </div>
    </el-card>

  </div>
</template>

<script>
  export default {
    name: 'SettlementCenter',
    data() {
      return {
        deductionAmounts: '',
        payAmounts: '',
        payMethods: '',
        payMethodOptions: [
          {
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
          }, {
            value: '6',
            label: '刷卡'
          }],
        usableCards: '',
        usableCardOptions: [
          {
            value: '1',
            label: '1500储值卡'
          }, {
            value: '2',
            label: '3000储值卡'
          }],
        visible: false,
        sumMoney: [],
        consumerOrder:[],
        consumerProjectInfos:[],
        autoParts:[],
      }
    },
    methods: {
      // 获取订单详情
      getOrderDetail(){
        this.$get('/order/detail',{
          id: this.$route.query.id
        }).then(res=>{
          console.log(res)
          this.consumerOrder = res.consumerOrder
          this.consumerProjectInfos = res.consumerProjectInfos
          this.autoParts = res.autoParts
        })
      },

      // 挂单
      pendingOrder() {
        this.$post('/order/pendingOrder',{
          "consumerOrder": {
            "id":"S0011901310003",
            "actualPrice": 100,
            "firstPayMethod": 0,
            "firstActualPrice": 22.5,
            "firstCardId": "4028802767ef13c40167ef1420d40000",
            "secondPayMethod": 1,
            "secondActualPrice": 77.5,
            "secondCardId": ""
          },
          "useCoupons": [
            {
              "id": "35XJKE"
            },
            {
              "id": "36XJKE"
            }
          ]
        }).then(res=>{

        })
      },
      // 结算
      orderPayment() {
        this.$post('/order/payment',{
          "consumerOrder": {
            "id":"S0011901310003",
            "actualPrice": 100,
            "firstPayMethod": 0,
            "firstActualPrice": 22.5,
            "firstCardId": "4028802767ef13c40167ef1420d40000",
            "secondPayMethod": 1,
            "secondActualPrice": 77.5,
            "secondCardId": ""
          },
          "useCoupons": [
            {
              "id": "35XJKE"
            },
            {
              "id": "36XJKE"
            }
          ]
        }).then(res=>{

        })
      },
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
            this.sumMoney[this.sumMoney.length] = sums[index]
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
        // console.log('typeof this.sumMoney:',typeof this.sumMoney)
        if (this.sumMoney.length !== 0) {
          console.log('typeof this.sumMoney:', this.sumMoney.reduce((prev, curr) => prev + curr))
          this.amountsPayableComputed = this.sumMoney.reduce((prev, curr) => prev + curr)
        }
      }
    },
    mounted: function () {
      this.getOrderDetail()
    }
  }
</script>

<style lang="less" scoped>
  .inputWidth {
    width: 50%;
  }

  .el-card {
    margin-bottom: 40px;
  }

  .el-row {
    margin: 30px 0;
  }

  .fontSize {
    font-size: 14px;
  }

  .marginHorizontal {
    margin: 0 auto;
  }

  .paymentInput {
    margin-bottom: 40px;
  }

  .red /deep/ .el-input__inner {
    color: red !important;
  }

</style>
