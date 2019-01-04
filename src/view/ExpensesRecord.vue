<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-radio-group v-model="tabPosition" @change="onTabChange">
          <el-radio-button label="today">今日</el-radio-button>
          <el-radio-button label="thisMonth">本月</el-radio-button>
          <el-radio-button label="search">全部</el-radio-button>
        </el-radio-group>
      </el-col>

      <el-col :span="12" v-if="visible">
        <span>查找日期：</span>
        <el-date-picker
          v-model="datePickerValue"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="dateWidth">
        </el-date-picker>
      </el-col>
    </el-row>

    <!--消费记录表格-->
    <el-card shadow="hover">
      <div slot="header">
        <span>合计消费</span>
      </div>
      <el-table :data="expensesRecordTable">
        <el-table-column type="index" label="序号" align="center"/>
        <el-table-column property="projectName" label="项目" align="center"/>
        <el-table-column property="expensesAmounts" label="消费金额" align="center"/>
        <el-table-column property="payMethods" label="支付方式" align="center"/>
        <el-table-column property="isUseCard" label="是否使用会员卡扣" align="center"/>
        <el-table-column property="serviceTime" label="服务时间" align="center"/>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'ExpensesRecord',
    data() {
      return {
        tabPosition: 'today',
        visible: false,
        datePickerValue: '',
        expensesRecordTable: []
      }
    },
    methods: {
      onTabChange(e) {
        this.visible = e === 'search' ? true : false
      }
    },
    mounted: function () {

    }
  }
</script>

<style lang="less" scoped>
  .el-card {
    margin-top: 40px;
  }
  .dateWidth {
    width: 70%;
  }
</style>
