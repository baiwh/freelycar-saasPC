<template>
  <div id="app">

    <el-container>

      <el-header style="background: #409EFF;height: 80px">
        <img class="logo" src="./../static/logo-white.png" alt="">
      </el-header>

      <el-container>

        <el-aside width="200px">
          <el-menu default-active="active" class="el-menu-vertical-demo" @open="handleOpen"
                   @close="handleClose" @select="handleSelect">

            <el-menu-item index="0">
              <template slot="title">
                <i class="el-icon-star-on"></i>
                <span>首页</span>
              </template>
            </el-menu-item>

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>消费开单</span>
              </template>
              <el-submenu index="/QuickBilling" class="el-submenu-margin">
                <template slot="title">快速开单</template>
                <el-menu-item index="/SettlementCenter">结算中心</el-menu-item>
              </el-submenu>
              <el-submenu index="/DocumentManagement" class="el-submenu-margin">
                <template slot="title">单据管理</template>
                <el-menu-item index="/DocumentDetails">单据详情</el-menu-item>
              </el-submenu>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-service"></i>
                <span>会员管理</span>
              </template>
              <el-submenu index="/CustomerManagement" class="el-submenu-margin">
                <template slot="title">客户管理</template>
                <el-menu-item index="/AddNewCustomers">新增客户</el-menu-item>
                <el-menu-item index="/ModifyCustomerInformation">修改客户信息</el-menu-item>
                <el-submenu index="/CustomerInformation" class="el-submenu-margin">
                  <template slot="title">客户信息</template>
                  <el-menu-item index="/ExpensesRecord">消费记录</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="/MemberProcessing" class="el-submenu-margin">
                <template slot="title">会员办理</template>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>产品管理</span>
              </template>
              <el-submenu index="/ProjectManagement" class="el-submenu-margin">
                <template slot="title">项目管理</template>
                <el-menu-item index="/ItemCategory">项目类别</el-menu-item>
              </el-submenu>
              <el-menu-item index="/CardManagement" class="el-submenu-margin">
                <template slot="title">卡类管理</template>
              </el-menu-item>
              <el-menu-item index="/CreditVoucherManagement" class="el-submenu-margin">
                <template slot="title">抵用券管理</template>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-edit"></i>
                <span>财务管理</span>
              </template>
              <el-submenu index="/IncomeInquiry" class="el-submenu-margin">
                <template slot="title">收入查询</template>
                <el-menu-item index="/IncomeBreakdown">收入明细</el-menu-item>
                <el-submenu index="/HistoricalIncome" class="el-submenu-margin">
                  <template slot="title">历史收入</template>
                  <el-menu-item index="/HistoricalIncomeBreakdown">历史收入明细</el-menu-item>
                </el-submenu>
              </el-submenu>

              <el-menu-item index="/DataReport" class="el-submenu-margin">
                <template slot="title">数据报表</template>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item index="/EmployeeManagement" class="el-submenu-margin">
                <template slot="title">员工管理</template>
              </el-menu-item>
              <el-menu-item index="/StoreManagement" class="el-submenu-margin">
                <template slot="title">门店管理</template>
              </el-menu-item>
            </el-submenu>

          </el-menu>
        </el-aside>

        <el-main>
          <el-container>
            <el-header class="nav-title">{{$route.name}}</el-header>
            <el-main>
              <router-view/>
            </el-main>
          </el-container>

        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      handleOpen: function (key) {
        if (key.length > 1) {
          this.$router.push(key);
        }
      },
      handleClose: function () {

      },
      handleSelect(key) {
        this.$router.push(key);
        // this.breadcrumbItems  = ['消费开单']
      },
    }
  }
</script>

<style lang="less">
  body {
    margin: 0;
    padding: 0;
  }

  .logo {
    height: 55px;
    width: 185px;
    position: relative;
    transform: translateY(-50%);
    top: 50%;
  }

  .el-submenu-margin {
    margin-left: 15px;
  }

  .el-aside {
    overflow: hidden;
  }

  .nav-title {
    border-bottom: 1px solid #ebeef5;
    line-height: 45px;
  }

  #app {
  }
</style>
