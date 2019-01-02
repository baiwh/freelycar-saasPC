<template>
  <div>
    <!--客户信息模块-->
    <el-card shadow="hover">
      <div slot="header">
        <span>客户信息</span>
      </div>

      <!--表单部分-->
      <el-form :model="clientForm" :rules="clientFormRules" ref="clientForm" label-width="100px">

        <el-row>
          <el-col :span="11">
            <el-form-item label="客户姓名：" prop="clientName">
              <el-input v-model="clientForm.clientName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="性别：" prop="clientGender">
              <el-radio-group v-model="clientForm.clientGender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="手机号码：" prop="clientPhone">
              <el-input v-model="clientForm.clientPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="车牌号码：" prop="clientLicenseNumber">
              <el-input v-model="clientForm.clientLicenseNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="品牌车系：" prop="clientBrandCar">
              <el-button round type="primary" plain icon="el-icon-plus" size="small"></el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="车辆型号：">
              <el-select v-model="clientForm.clientVehicleModel" placeholder="请选择车辆型号">
                <el-option v-for="item in vehicleModelOptions" :key="item.index" :label="item.vehicleModel"
                           :value="item.vehicleModel"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <!--按钮-->
      <el-row>
        <el-col :span="2" :offset="20">
          <el-button type="primary">保存</el-button>
        </el-col>
      </el-row>

    </el-card>

    <!--会员信息模块-->
    <el-card shadow="hover">
      <div slot="header">
        <span>会员信息</span>
      </div>

      <!--表单部分-->
      <el-form :model="memberForm" ref="memberForm" label-width="100px">

        <el-row>
          <el-col :span="11">
            <el-form-item label="会员卡号：" prop="memberCard">
              <el-input v-model="memberForm.memberCard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="会员卡类：">
              <el-select v-model="memberForm.memberCardKind" placeholder="请选择会员卡类">
                <el-option v-for="item in memberCardKindOptions" :key="item.index" :label="item.memberCardKind"
                           :value="item.memberCardKind"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <i class="el-icon-circle-plus-outline icon"></i>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="售卡金额：" prop="memberCard">
              <el-input v-model="memberForm.cardAmount" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="有效期：" prop="validityPeriod">
              <el-input v-model="memberForm.validityPeriod" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="卡面金额：" prop="cardSurfaceAmount">
              <el-input v-model="memberForm.cardSurfaceAmount" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="折扣比例：" prop="discount">
              <el-input v-model="memberForm.discount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="支付方式：">
              <el-select v-model="memberForm.memberCardKind" placeholder="请选择储值卡">
                <el-option v-for="item in memberCardKindOptions" :key="item.index" :label="item.memberCardKind"
                           :value="item.memberCardKind"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="办理人员：">
              <el-select v-model="memberForm.handlingStaff" placeholder="请选择办理人员">
                <el-option v-for="item in handlingStaffOptions" :key="item.index" :label="item.handlingStaff"
                           :value="item.handlingStaff"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <!--按钮-->
      <el-row>
        <el-col :span="2" :offset="20">
          <el-button type="primary">办理</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'MemberProcessing',
    data() {
      return {
        //客户信息表单
        clientForm: {
          clientName: '',
          clientGender: '',
          clientPhone: '',
          clientLicenseNumber: '',
          clientBrandCar: '',
          clientVehicleModel: ''
        },
        //车牌型号选项
        vehicleModelOptions: [{
          index: '1',
          vehicleModel: '沃尔沃'
        }, {
          index: '2',
          vehicleModel: '悍马'
        }, {
          index: '3',
          vehicleModel: '吉普'
        }],
        //客户表单验证，非自定义验证，若自定义验证，待修改
        clientFormRules: {
          clientName: [
            {required: true, message: '请输入客户姓名', trigger: 'blur'},
            {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
          ],
          clientPhone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'}
          ],
          clientLicenseNumber: [
            {required: true, message: '请输入车牌号码', trigger: 'blur'}
          ],
          clientBrandCar: [
            {required: true, message: '请选择品牌车系', trigger: 'blur'}
          ]
        },
        //会员信息绑定表单
        memberForm: {
          memberCard: '',
          memberCardKind: '',
          cardAmount: '2000',
          validityPeriod: '1年',
          cardSurfaceAmount: '2500',
          discount: '无',
          payMethods: '',
          handlingStaff: ''
        },
        //支付手段选项
        payMethodsOptions: [{
          index: '1',
          payMethods: '现金'
        }, {
          index: '2',
          payMethods: '刷卡'
        }, {
          index: '3',
          payMethods: '支付宝'
        }, {
          index: '4',
          payMethods: '易付宝'
        }, {
          index: '5',
          payMethods: '微信'
        }],
        //会员卡类选项
        memberCardKindOptions: [{
          index: '1',
          memberCardKind: '3000储值卡'
        }],
        handlingStaffOptions: [{
          index: '1',
          handlingStaff: '小易'
        }, {
          index: '2',
          handlingStaff: '科科'
        }]
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

  .icon {
    margin: 10px 0 0 10px;
  }
</style>
