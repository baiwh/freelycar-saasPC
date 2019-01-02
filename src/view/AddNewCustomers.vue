<template>
  <div>
    <!--客户信息-->
    <el-card shadow="hover">
      <div slot="header">
        <span>客户信息</span>
      </div>
      <el-row>
        <el-col :span="10">
          <el-form :model="clientForm" :rules="clientFormRules" ref="clientForm" label-width="100px">
            <el-form-item label="客户姓名：" prop="clientName">
              <el-input v-model="clientForm.clientName"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="clientPhone">
              <el-input v-model="clientForm.clientPhone"></el-input>
            </el-form-item>
            <el-form-item label="生日：" prop="clientBirth">
              <el-date-picker v-model="clientForm.clientBirth" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="行驶证号：">
              <el-input v-model="clientForm.drivingLicenseNumber"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form :model="clientForm" :rules="clientFormRules" ref="clientForm" label-width="100px">
            <el-form-item label="性别：" prop="clientGender">
              <el-radio-group v-model="clientForm.clientGender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄：" prop="clientAge">
              <el-input v-model="clientForm.clientAge"></el-input>
            </el-form-item>
            <el-form-item label="身份证：" prop="clientIDCard">
              <el-input v-model="clientForm.clientIDCard"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>

    <!--车辆信息-->
    <el-card shadow="hover">
      <div slot="header">
        <span>车辆信息</span>
      </div>
      <el-row>
        <el-col :span="10">
          <el-form :model="carInfoForm" :rules="carInfoForm" ref="carInfoForm" label-width="100px">
            <el-form-item label="车牌号码：" prop="carNumber">
              <el-input v-model="carInfoForm.carNumber"></el-input>
            </el-form-item>
            <el-form-item label="品牌车系：" prop="carBrand">
              <el-button type="primary" icon="el-icon-plus"></el-button>
            </el-form-item>
            <el-form-item label="车辆型号：" prop="carModel">
              <el-input v-model="carInfoForm.carModel"></el-input>
            </el-form-item>
            <el-form-item label="上次里程：" prop="lastMileage">
              <el-input v-model="carInfoForm.lastMileage"></el-input>
            </el-form-item>
            <el-form-item label="本次里程：" prop="thisMileage">
              <el-input v-model="carInfoForm.thisMileage"></el-input>
            </el-form-item>
            <el-form-item label="车架号：" prop="frameNumber">
              <el-input v-model="carInfoForm.frameNumber"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-form :model="carInfoForm" :rules="carInfoForm" ref="carInfoForm" label-width="110px">
            <el-form-item label="是否新车：" prop="isNewCar">
              <el-radio-group v-model="clientForm.isNewCar">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="保险开始日期：" prop="insuranceStart">
              <el-date-picker v-model="clientForm.insuranceStart" type="date" placeholder="选择日期"/>
            </el-form-item>
            <el-form-item label="保险截止日期：" prop="insuranceEnd">
              <el-date-picker v-model="clientForm.insuranceEnd" type="date" placeholder="选择日期"/>
            </el-form-item>
            <el-form-item label="保险金额：" prop="insuranceAmount">
              <el-input v-model="carInfoForm.insuranceAmount"></el-input>
            </el-form-item>
            <el-form-item label="上牌时间：" prop="boardingDate">
              <el-date-picker v-model="clientForm.boardingDate" type="date" placeholder="选择日期"/>
            </el-form-item>
            <el-form-item label="发动机号：" prop="engineNumber">
              <el-input v-model="carInfoForm.engineNumber"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>

    <!--按钮-->
    <el-row>
      <el-col :span="2" :offset="8">
        <el-button type="primary">保存</el-button>
      </el-col>
      <el-col :span="2" :offset="2">
        <el-button type="primary">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'AddNewCustomers',
    data() {
      return {
        //客户信息绑定表单
        clientForm: {
          clientName: '',
          clientGender: '',
          clientPhone: '',
          clientAge: '',
          clientBirth: '',
          clientIDCard: '',
          drivingLicenseNumber: ''
        },
        //客户表单验证，非自定义验证，若自定义验证，待修改
        clientFormRules: {
          clientName: [
            {required: true, message: '请输入客户姓名', trigger: 'blur'},
            {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
          ],
          clientPhone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'}
          ]
        },
        //车辆信息绑定表单
        carInfoForm: {
          carNumber: '',
          isNewCar: "",
          carBrand: '',
          insuranceStart: '',
          carModel: '',
          insuranceEnd: '',
          lastMileage: '',
          insuranceAmount: '',
          thisMileage: '',
          boardingDate: '',
          frameNumber: '',
          engineNumber: ''
        }
      }
    },
    methods: {},
    mounted: function () {

    }
  }
</script>

<style lang="less" scoped>
  .el-card {
    margin-bottom: 40px;
  }
</style>
