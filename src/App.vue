<template>
  <div id="app">

    <el-container>

      <el-header style="background: #409EFF;height: 80px">
        <img class="logo" src="./../static/logo-white.png" alt="">
      </el-header>

      <el-container>

        <el-aside width="200px">
          <el-menu default-active="active" class="el-menu-vertical-demo" @open="handleOpen"
                   @close="handleClose" @select="handleSelect" router="true">

            <el-menu-item index="0">
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
              <el-menu-item index="/QuickBilling"
                            class="el-submenu-margin">快速开单</el-menu-item>
              <el-menu-item index="/DocumentManagement"
                            class="el-submenu-margin">单据管理</el-menu-item>
            </el-submenu>

            <el-submenu index="会员管理">
              <template slot="title">
                <i class="el-icon-service"></i>
                <span>会员管理</span>
              </template>
              <el-menu-item index="/MemberProcessing"
                            class="el-submenu-margin">会员办理</el-menu-item>
              <el-menu-item index="/CustomerManagement"
                            class="el-submenu-margin">客户管理</el-menu-item>
            </el-submenu>

            <el-submenu index="产品管理">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>产品管理</span>
              </template>
              <el-menu-item index="/ProjectManagement"
                            class="el-submenu-margin">项目管理</el-menu-item>
              <el-menu-item index="/CardManagement"
                            class="el-submenu-margin">卡类管理</el-menu-item>
              <el-menu-item index="/CreditVoucherManagement"
                            class="el-submenu-margin">抵用券管理</el-menu-item>
            </el-submenu>

            <el-submenu index="财务管理">
              <template slot="title">
                <i class="el-icon-edit"></i>
                <span>财务管理</span>
              </template>
              <el-menu-item index="/IncomeInquiry"
                            class="el-submenu-margin">收入查询</el-menu-item>
              <el-menu-item index="/FlowDetails"
                            class="el-submenu-margin">流水明细</el-menu-item>
            </el-submenu>

            <el-submenu index="系统设置">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item index="/EmployeeManagement"
                            class="el-submenu-margin">员工管理</el-menu-item>
              <el-menu-item index="/StoreManagement"
                            class="el-submenu-margin">门店管理</el-menu-item>
            </el-submenu>

          </el-menu>
        </el-aside>

        <el-main>
          <el-container>
            <el-header class="nav-title">
              <el-breadcrumb style="line-height: 45px" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{navPath[0]}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
              </el-breadcrumb>
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
        navPath: []
      }
    },
    methods: {
      handleOpen: function (key) {
        if (key.length > 1) {
          // this.$router.push(key);
        }
      },
      handleClose: function () {

      },
      handleSelect(key,path) {
        console.log(path)
        // this.$router.push(key);
        this.navPath = path
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
