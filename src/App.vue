<template>
  <div id="app">

    <el-container>

      <el-header style="background: #409EFF;height: 80px">
        <el-row type="flex" align="middle" style="height: 80px">
          <el-col :span="22">
            <img class="logo" src="./../static/logo-white.png" alt="">
          </el-col>
          <el-col :span="2"><span class="user-name">{{userName}}</span></el-col>
          <!--<el-col :span="2">-->
            <!--<el-button size="small">注销</el-button>-->
          <!--</el-col>-->
        </el-row>
      </el-header>

      <el-container>

        <el-aside width="200px">
          <el-menu default-active="active" class="el-menu-vertical-demo"
                   :collapse="isCollapse" :router="true">

            <el-menu-item index="/home">
              <template slot="title">
                <i class="el-icon-star-on"></i>
                <span>首页</span>
              </template>
            </el-menu-item>

            <el-submenu index="消费开单">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>消费开单</span>
              </template>
              <el-menu-item index="/ConsumptionOrder/QuickBilling"
                            class="el-submenu-margin">快速开单</el-menu-item>
              <el-menu-item index="/ConsumptionOrder/DocumentManagement"
                            class="el-submenu-margin">单据管理</el-menu-item>
            </el-submenu>

            <el-submenu index="会员管理">
              <template slot="title">
                <i class="el-icon-service"></i>
                <span>会员管理</span>
              </template>
              <el-menu-item index="/MembershipManagement/MemberProcessing"
                            class="el-submenu-margin">会员办理</el-menu-item>
              <el-menu-item index="/MembershipManagement/CustomerManagement"
                            class="el-submenu-margin">客户管理</el-menu-item>
            </el-submenu>

            <el-submenu index="产品管理">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>产品管理</span>
              </template>
              <el-menu-item index="/ProductManagement/ItemCategory"
                            class="el-submenu-margin">项目类别</el-menu-item>
              <el-menu-item index="/ProductManagement/CardManagement"
                            class="el-submenu-margin">卡类管理</el-menu-item>
              <el-menu-item index="/ProductManagement/CreditVoucherManagement"
                            class="el-submenu-margin">抵用券管理</el-menu-item>
            </el-submenu>

            <el-submenu index="财务管理">
              <template slot="title">
                <i class="el-icon-edit"></i>
                <span>财务管理</span>
              </template>
              <el-menu-item index="/FinancialManagement/IncomeInquiry"
                            class="el-submenu-margin">收入查询</el-menu-item>
              <el-menu-item index="/FinancialManagement/FlowDetails"
                            class="el-submenu-margin">流水明细</el-menu-item>
            </el-submenu>

            <el-submenu index="系统设置">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item index="/SystemSetup/EmployeeManagement"
                            class="el-submenu-margin">员工管理</el-menu-item>
              <el-menu-item index="/SystemSetup/StoreManagement"
                            class="el-submenu-margin">门店管理</el-menu-item>
            </el-submenu>

          </el-menu>
        </el-aside>

        <el-main>
          <el-container>
            <el-header class="nav-title">
              <el-row>
                <!--<el-col :span="1">-->
                  <!--<el-button icon="el-icon-d-arrow-left" circle @click="modifyNav"></el-button>-->
                <!--</el-col>-->
                <el-col :span="22">
                  <el-breadcrumb style="line-height: 45px" separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item v-show="$route.matched.length>1">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-show="$route.matched.length>1">{{$route.matched[0].name}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
                  </el-breadcrumb>
                </el-col>
              </el-row>

            </el-header>
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
    data() {
      return {
        userName:'admin',
        isCollapse: false
      }
    },
    methods: {
      // 收起/打开左侧导航
      modifyNav(){
        this.isCollapse = !this.isCollapse
      }
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

  .user-name{
    color: white;
  }
  #app {
  }
</style>
