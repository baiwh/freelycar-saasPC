<template>
  <div>
    <!--查询条件-->
    <el-row>
      <el-col :span="5">
        <span>姓名：</span>
        <el-input v-model="name" size="small"></el-input>
      </el-col>
      <el-col :span="7">
        <span>手机号码：</span>
        <el-input v-model="phone" size="small"></el-input>
      </el-col>
      <el-col :span="7">
        <span>车牌号码：</span>
        <el-input v-model="carNumber" size="small"></el-input>
      </el-col>
      <el-col :span="4">
        <span>是否会员：</span>
        <el-button circle :type="buttonType" size="small" @click="onVipButton">是</el-button>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" size="small">查询</el-button>
      </el-col>
    </el-row>

    <!--按钮-->
    <el-row :gutter="30">
      <el-col :span="3">
        <router-link to="/MembershipManagement/AddNewCustomers">
          <el-button type="primary" plain size="small">新增客户</el-button>
        </router-link>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" plain size="small" @click="statisticsVisible = true">会员统计</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" icon="el-icon-download" size="small">导出表单</el-button>
      </el-col>
    </el-row>

    <!--客户表格-->
    <el-table :data="tableData" border>
      <el-table-column label="序号" type="index" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="price" label="手机号码" align="center"></el-table-column>
      <el-table-column prop="actualAmount" label="车牌号码" align="center"></el-table-column>
      <el-table-column prop="validityPeriod" label="品牌" align="center"></el-table-column>
      <el-table-column prop="creationTime" label="是否会员" align="center"></el-table-column>
      <el-table-column prop="creationTime" label="总消费次数" align="center"></el-table-column>
      <el-table-column prop="creationTime" label="最近到店时间" align="center"></el-table-column>
      <el-table-column prop="creationTime" label="卡内未消费金额" align="center"></el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <router-link to="/MembershipManagement/MemberProcessing">
            <el-button size="mini" type="primary">开卡</el-button>
          </router-link>
          <router-link to="/MembershipManagement/AddNewCustomers">
            <el-button size="mini" type="primary">修改</el-button>
          </router-link>
          <el-popover
            ref="popover{{$index}}"
            placement="top"
            width="160"
            v-model="scope.row.deleteVisible">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.deleteVisible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="scope.row.deleteVisible = false">确定</el-button>
            </div>
            <el-button size="mini" type="danger" slot="reference">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <!--分页器-->
    <pagingDevice
      :pageData.sync="pageData"
      @changePage="changePage"></pagingDevice>

    <!--会员统计模态框-->
    <el-dialog title="交车" :visible.sync="statisticsVisible" width="30%">
      <el-row>会员总数：{{memberCount}}</el-row>
      <el-row>本月新增：{{newMemberCount}}</el-row>
      <el-row>今日新增：{{todayNewCount}}</el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="statisticsVisible = false">取 消</el-button>
        <el-button type="primary" @click="statisticsVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'CustomerManagement',
    data() {
      return {
        buttonType: '',
        name: '',
        phone: '',
        carNumber: '',
        tableData: [{
          deleteVisible: false
        }, {
          deleteVisible: false
        }],
        pageData: {
          currentPage: 1,
          pageSize: 10,
          pageTotal: 100
        },
        statisticsVisible: false,
        memberCount: 5,
        newMemberCount: 1,
        todayNewCount: 0
      }
    },
    methods: {
      onVipButton() {
        this.buttonType = this.buttonType === '' ? 'primary' : ''
      },
      changePage() {}
    },
    mounted: function () {

    }
  }
</script>

<style lang="less" scoped>
  .el-input {
    width: 60%;
  }
  .el-row {
    margin-bottom: 40px;
  }
</style>
