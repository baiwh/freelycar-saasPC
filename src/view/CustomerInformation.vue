<template>
  <div>
    <!--客户资料-->
    <el-card shadow="hover">
      <div slot="header">
        <span>客户资料</span>
      </div>
      <el-row :gutter="30">
        <el-col :span="12">姓名：
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
        </el-col>
        <el-col :span="12">年龄：
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="12">手机号：
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
        </el-col>
        <el-col :span="12">性别：
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="12">生日：
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
        </el-col>
        <el-col :span="12">身份证：
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="12">行驶证号：
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
        </el-col>
        <el-col :span="12">积分：
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
        </el-col>
      </el-row>
    </el-card>

    <!--会员卡信息-->
    <el-card shadow="hover">
      <div slot="header">
        <span>会员卡信息</span>
      </div>
      <div>
        <el-button>开卡</el-button>
        <el-table :data="cardInfoTable">
          <el-table-column property="cardNumber" label="卡号" align="center"/>
          <el-table-column property="cardName" label="卡名称" align="center"/>
          <el-table-column property="cardOpeningTime" label="开卡时间" align="center"/>
          <el-table-column property="cardClosingTime" label="有效期至" align="center"/>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="onDetail(scope.row)">查看详情</el-button>
              <el-button type="text" size="small" @click="onRenewalCard(scope.row)">续卡</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!--优惠券信息-->
    <el-card shadow="hover">
      <div slot="header">
        <span>优惠券信息</span>
      </div>
      <el-table :data="couponInfoTable">
        <el-table-column property="couponName" label="抵用券名" align="center"/>
        <el-table-column property="expiryDate" label="到期日" align="center"/>
        <el-table-column property="couponPrice" label="价格" align="center"/>
        <el-table-column property="usableProject" label="可用项目" align="center"/>
      </el-table>
    </el-card>

    <!--车辆信息-->
    <el-card>
      <div slot="header">
        <span>车辆信息</span>
      </div>
      <div>
        <el-button @click="addNewCar">新增车辆</el-button>
        <el-table :data="carInfoTable">
          <el-table-column property="carNumber" label="车牌号码" align="center"/>
          <el-table-column property="carBrand" label="品牌" align="center"/>
          <el-table-column property="vehicleModel" label="车辆型号" align="center"/>
          <el-table-column property="mileage" label="里程数" align="center"/>
          <el-table-column property="engineNumber" label="发动机号" align="center"/>
          <el-table-column property="isNewCar" label="是否新车" align="center"/>
          <el-table-column property="insuranceAmount" label="保险金额" align="center"/>
          <el-table-column property="insuranceValidity" label="保险有效期" align="center"/>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!--消费记录-->
    <el-card shadow="hover">
      <div slot="header">
        <span>消费记录</span>
      </div>
      <el-table :data="expensesRecordTable">
        <el-table-column type="index" label="序号" align="center"/>
        <el-table-column property="projectName" label="项目" align="center"/>
        <el-table-column property="expensesAmounts" label="消费金额" align="center"/>
        <el-table-column property="payMethods" label="支付方式" align="center"/>
        <el-table-column property="isUseCard" label="是否使用会员卡扣" align="center"/>
        <el-table-column property="serviceTime" label="服务时间" align="center"/>
      </el-table>
      <el-row>
        <el-col :span="2" :offset="22">
          <el-button type="text">更多</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!--续卡对话框-->
    <el-dialog title="续卡充值" :visible.sync="renewalCardVisible">
      <el-form :data="renewalCardForm" label-width="130px">
        <el-form-item label="会员卡号：" prop="memberCardNumber">
          <el-input v-model="renewalCardForm.memberCardNumber" disabled size="mini"/>
        </el-form-item>
        <el-form-item label="卡名称：" prop="memberCardName">
          <el-input v-model="renewalCardForm.memberCardName" disabled size="mini"/>
        </el-form-item>
        <el-form-item label="会员卡类：" prop="memberCardCategory">
          <el-input v-model="renewalCardForm.memberCardCategory" disabled size="mini"/>
        </el-form-item>
        <el-form-item label="有效期（年）：" prop="validDate">
          <el-input v-model="renewalCardForm.validDate" disabled size="mini"/>
        </el-form-item>
        <el-form-item label="卡内余额：" prop="cardBalance">
          <el-input v-model="renewalCardForm.cardBalance" disabled size="mini"/>
        </el-form-item>
        <el-form-item label="续卡金额：">
          <el-select v-model="renewalCardForm.renewalCardAmounts" placeholder="请选择储值卡" size="mini">
            <el-option v-for="item in cardAmountsOptions" :key="item.index" :label="item.cardAmounts"
                       :value="item.cardAmounts"/>
          </el-select>
        </el-form-item>
        <el-form-item label="卡面金额：" prop="cardSurfaceAmounts">
          <el-input v-model="renewalCardForm.cardSurfaceAmounts" disabled size="mini"/>
        </el-form-item>
        <el-form-item label="支付方式：">
          <el-select v-model="renewalCardForm.payMethods" placeholder="请选择支付方式" size="mini">
            <el-option v-for="item in payMethodsOptions" :key="item.index" :label="item.payMethods"
                       :value="item.payMethods"/>
          </el-select>
        </el-form-item>
        <el-form-item label="办理人员：">
          <el-select v-model="renewalCardForm.staff" placeholder="请选择办理人员" size="mini">
            <el-option v-for="item in staffOptions" :key="item.index" :label="item.staffName"
                       :value="item.staffName"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!--查看详情对话框-->
    <el-dialog  title="会员卡详情" :visible.sync="detailsVisible">
      <el-row>
        <el-col :span="10" :offset="1">
          <span>卡类名称：</span>
          <el-input v-model="input" disabled size="mini"/>
        </el-col>
        <el-col :span="10" :offset="1">
          <span>卡类属性：</span>
          <el-input v-model="input" disabled size="mini"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <span>售卡金额：</span>
          <el-input v-model="input" disabled size="mini"/>
        </el-col>
        <el-col :span="10" :offset="1">
          <span>有效期：</span>
          <el-input v-model="input" disabled size="mini"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <span>实际金额：</span>
          <el-input v-model="input" disabled size="mini"/>
        </el-col>
        <el-col :span="10" :offset="1">
          <span>剩余金额：</span>
          <el-input v-model="input" disabled size="mini"/>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!--新增车辆对话框-->
    <el-dialog title="新增车辆" :visible.sync="addNewCarVisible">
      <el-form :model="addNewCarForm" label-width="120px">
        <el-row>
          <el-col :span="10" :offset="1">
            <el-form-item label="车牌号：" prop="carNumber">
              <el-input v-model="addNewCarForm.carNumber" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="车辆品牌：" prop="carBrand">
              <el-input v-model="addNewCarForm.carBrand" size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="1">
            <el-form-item label="车牌类型：" prop="vehicleModel">
              <el-input v-model="addNewCarForm.vehicleModel" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="保险起止时间：" prop="insuranceTime">
              <el-date-picker
                v-model="datePickerValue"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                class="dateWidth">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="1">
            <el-form-item label="是否二手车：" prop="isNewCar">
              <el-select v-model="addNewCarForm.isNewCar" placeholder="请选择储值卡">
                <el-option label="是" value="yes"/>
                <el-option label="否" value="no"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="保险金额：" prop="insuranceAmount">
              <el-input v-model="addNewCarForm.insuranceAmount" size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="1">
            <el-form-item label="里程数：" prop="mileage">
              <el-input v-model="addNewCarForm.mileage" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="上牌时间：" prop="addLicenseTime">
              <el-input v-model="addNewCarForm.addLicenseTime" size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="1">
            <el-form-item label="车架号：" prop="frameNumber">
              <el-input v-model="addNewCarForm.frameNumber" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="发动机号：" prop="engineNumber">
              <el-input v-model="addNewCarForm.engineNumber" size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addNewCarVisible = false">保存</el-button>
        <el-button @click="addNewCarVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'CustomerInformation',
    data() {
      return {
        input: '',
        cardInfoTable: [{
          cardNumber: '00781',
          cardName: '储值卡',
          cardOpeningTime: '',
          cardClosingTime: ''
        }],
        couponInfoTable: [],
        carInfoTable: [{
          carNumber: '1111',
        }],
        expensesRecordTable: [],
        renewalCardVisible: false,
        renewalCardForm: {
          memberCardNumber: '',
          memberCardName: '',
          memberCardCategory: '',
          validDate: '',
          cardBalance: '',
          renewalCardAmounts: '',
          cardSurfaceAmounts: '',
          payMethods: '',
          staff: ''
        },
        cardAmountsOptions: [{
          index: '1',
          cardAmounts: '1000储值卡'
        }],
        payMethodsOptions: [{
          index: '1',
          payMethods: '支付宝'
        }],
        staffOptions: [{
          index: '1',
          staffName: '小易'
        }],
        detailsVisible: false,
        addNewCarVisible: false,
        addNewCarForm: {
          carNumber: '',
          carBrand: '',
          vehicleModel: '',
          mileage: '',
          engineNumber: '',
          isNewCar: '',
          insuranceAmount: '',
          addLicenseTime: ''
        },
        datePickerValue: ''
      }
    },
    methods: {
      onRenewalCard(row) {
        this.renewalCardVisible = true
        this.renewalCardForm.memberCardNumber = row.cardNumber
        this.renewalCardForm.memberCardName = row.cardName
      },
      onDetail(row) {
        this.detailsVisible = true
      },
      addNewCar() {
        this.addNewCarVisible = true
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
.el-col > .el-input {
  width: 70%;
}
.dateWidth {
  width: 70%;
}
.el-date-picker {
  width: 99%;
}
</style>
