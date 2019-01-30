<template>
  <div>
    <!--客户信息-->
    <el-card shadow="hover">
      <div slot="header">
        <span>客户信息</span>
      </div>
      <el-form :model="clientForm" :rules="clientFormRules" ref="clientForm" label-width="100px">

        <el-row>
          <el-col :span="10">
            <el-form-item label="客户姓名：" prop="name">
              <el-input v-model="clientForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="性别：" prop="gender">
              <el-radio-group v-model="clientForm.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="手机号：" prop="phone">
              <el-input v-model="clientForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="年龄：" prop="clientAge">
              <el-input v-model="clientForm.clientAge"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="生日：" prop="birthday">
              <el-date-picker v-model="clientForm.birthday" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="身份证：" prop="idNumber">
              <el-input v-model="clientForm.idNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="行驶证号：">
              <el-input v-model="clientForm.driverLicense"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-card>

    <!--按钮-->
    <el-row>
      <el-col :span="2" :offset="8">
        <el-button type="primary" @click="submitInfo">保存</el-button>
      </el-col>
      <el-col :span="2" :offset="2">
        <el-button type="primary" @click="concelSubmit">取消</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'ModifyCustomers',
    data() {
      return {
        //客户信息绑定表单
        clientForm: {
          name: '',
          gender: '',
          phone: '',
          age: '',
          birthday: '',
          idNumber: '',
          driverLicense: '',
          storeId: 1
        },
        //客户表单验证，非自定义验证，若自定义验证，待修改
        clientFormRules: {
          name: [
            {required: true, message: '请输入客户姓名', trigger: 'blur'},
            {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'}
          ]
        },
        carInfoFormRules:{
          licensePlate:[
            {required: true, message: '请输入手机号码', trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      // 提交信息
      submitInfo() {
        this.$post('/client/addClientAndCar', {

        }).then(res=>{

          // this.$router.go(-1)
        })
      },

      // 取消
      concelSubmit(){
        this.$router.go(-1)
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
</style>
