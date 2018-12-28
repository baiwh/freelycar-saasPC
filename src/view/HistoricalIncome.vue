<template>
    <div>
      <!--按年份查表-->
      <el-row>
        <el-col :span="6">
          <span>选择年份：</span>
          <el-select v-model="year" placeholder="请选择" class="width">
            <el-option
              v-for="item in yearOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <!--历史收入表格-->
      <el-card shadow="hover">
        <el-table :data="historicalIncomeTable">
          <el-table-column type="index" label="序号" align="center"/>
          <el-table-column property="date" label="时间" align="center"/>
          <el-table-column property="paidAmount" label="实收金额" align="center"/>
        </el-table>
      </el-card>

      <!--更多-->
      <el-row>
        <el-col :span="2" :offset="22">
          <a href="###">更多</a>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: 'HistoricalIncome',
        data() {
            return {
              year: '',
              yearOptions: [{
                value: '1',
                label: '2013'
              }, {
                value: '2',
                label: '2014'
              }, {
                value: '3',
                label: '2015'
              },{
                value: '4',
                label: '2016'
              }],
              historicalIncomeTable: [{
                date: '2018-11',
                paidAmount: '12345'
              }, {
                date: '2018-11',
                paidAmount: '12345'
              },{
                date: '2018-11',
                paidAmount: '12345'
              },{
                date: '2018-11',
                paidAmount: '12345'
              },{
                date: '2018-11',
                paidAmount: '12345'
              },{
                date: '2018-11',
                paidAmount: '12345'
              }]
            }
        },
        methods: {},
        mounted: function () {

        }
    }
</script>

<style lang="less" scoped>
.width {
  width: 50%;
}
.el-card {
  margin: 40px 0 20px;
}
</style>
