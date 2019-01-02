<template>
    <div>
      <!--收入查询页面选择区间-->
      <el-row>
        <el-col :span="12">
          <el-radio-group v-model="tabPosition" @change="onRadioChange">
            <el-radio-button label="today">今日</el-radio-button>
            <el-radio-button label="thisMonth">本月</el-radio-button>
            <el-radio-button label="search">区间查找</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="12" v-show="visible">
          <span>选择查找日期</span>
          <el-date-picker
            v-model="datePickerValue"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="dateWidth"/>
        </el-col>
      </el-row>

      <!--收入查询页面卡片-->
      <el-row :gutter="40">
        <el-col :span="12" v-for="(item, index) of incomeInquiryCard" :key="index">
          <el-card :class="['text-center',item.cardClass]" shadow="hover">
            <div slot="header" class="clearfix">
              <span>{{item.title}}</span>
            </div>
            <div>￥{{item.number}}</div>
          </el-card>
        </el-col>
      </el-row>

      <!--历史收支查询模块-->
      <el-row>
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>历史收支查询</span>
          </div>
          <el-table :data="incomeInquiryTable">
            <el-table-column property="date" label="时间" align="center"/>
            <el-table-column property="actualIncome" label="实际收入" align="center"/>
            <el-table-column property="actualExpenditure" label="实际支出" align="center"/>
          </el-table>
          <el-row class="more">
            <el-col :span="2" :offset="22">
              <a href="###">更多</a>
            </el-col>
          </el-row>
        </el-card>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: 'IncomeInquiry',
        data() {
            return {
              datePickerValue: '',
              tabPosition: 'today',
              visible: false,
              incomeInquiryCard: [{
                title: '实际收入',
                number: '12456.234',
                cardClass: 'orange'
              }, {
                title: '实际支出',
                number: '12456.234',
                cardClass: 'green'
              }],
              incomeInquiryTable: [{
                date: '2019-1',
                actualIncome: '23455',
                actualExpenditure: '234566'
              }, {
                date: '2019-1',
                actualIncome: '23455',
                actualExpenditure: '234566'
              }]
            }
        },
        methods: {
          onRadioChange (e) {
            this.visible = e === 'search' ? true : false
          }
        },
        mounted: function () {

        }
    }
</script>

<style lang="less" scoped>
.dateWidth {
  width: 70%;
}
.el-row {
  margin-bottom: 40px;
}
.text-center {
  text-align: center;
}
.more {
  margin: 20px 0;
}
.orange /deep/ .el-card__header {
  background-color: #f90;
}
.green /deep/ .el-card__header {
  background-color: #81cdd8;
}
</style>
