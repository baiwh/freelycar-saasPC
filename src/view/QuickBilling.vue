<template>
  <div>
    <el-card>
      <el-row :gutter="60">
        <el-col :span="8">车牌号码：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <addNewButton></addNewButton>
        </el-col>
        <el-col :span="8">客户管理：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="8">是否会员：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="8">品牌型号：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="8">手机号码：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="8">接车时间：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="8">上次里程：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="8">历史消费：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="8">接车人员：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="8">本次里程：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="8">剩余金额：
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'QuickBilling',
    data() {
      return {
        input: ''
      }
    },
    methods: {},
    mounted: function () {

    }
  }
</script>

<style lang="less">
  .el-input{
    width: 60%;
  }
</style>
