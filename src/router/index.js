import Vue from 'vue'
import Router from 'vue-router'
// 消费开单
import QuickBilling from '@/view/QuickBilling'
import SettlementCenter from '@/view/SettlementCenter'
import DocumentManagement from '@/view/DocumentManagement'
import DocumentDetails from '@/view/DocumentDetails'
// 会员管理
import CustomerManagement from '@/view/CustomerManagement'
import AddNewCustomers from '@/view/AddNewCustomers'
import ModifyCustomerInformation from '@/view/ModifyCustomerInformation'
import CustomerInformation from '@/view/CustomerInformation'
import ExpensesRecord from '@/view/ExpensesRecord'
import MemberProcessing from '@/view/MemberProcessing'
// 产品管理
import ProjectManagement from '@/view/ProjectManagement'
import ItemCategory from '@/view/ItemCategory'
import CardManagement from '@/view/CardManagement'
import CreditVoucherManagement from '@/view/CreditVoucherManagement'
// 财务管理
import IncomeInquiry from '@/view/IncomeInquiry'
import IncomeBreakdown from '@/view/IncomeBreakdown'
import HistoricalIncome from '@/view/HistoricalIncome'
import HistoricalIncomeBreakdown from '@/view/HistoricalIncomeBreakdown'
import DataReport from '@/view/DataReport'
// 系统设置
import EmployeeManagement from '@/view/EmployeeManagement'
import StoreManagement from '@/view/StoreManagement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/QuickBilling',
      name: '快速开单',
      component: QuickBilling
    },
    {
      path: '/SettlementCenter',
      name: '结算中心',
      component: SettlementCenter
    },
    {
      path: '/DocumentManagement',
      name: '单据管理',
      component:DocumentManagement
    },
    {
      path: '/DocumentDetails',
      name: '单据详情',
      component:DocumentDetails
    },
    {
      path: '/CustomerManagement',
      name: '客户管理',
      component:CustomerManagement
    },
    {
      path: '/AddNewCustomers',
      name: '新增客户',
      component:AddNewCustomers
    },
    {
      path: '/ModifyCustomerInformation',
      name: '修改客户信息',
      component:ModifyCustomerInformation
    },
    {
      path: '/CustomerInformation',
      name: '客户信息',
      component:CustomerInformation
    },
    {
      path: '/ExpensesRecord',
      name: '消费记录',
      component:ExpensesRecord
    },
    {
      path: '/MemberProcessing',
      name: '会员办理',
      component:MemberProcessing
    },
    {
      path: '/ProjectManagement',
      name: '项目管理',
      component:ProjectManagement
    },
    {
      path: '/ItemCategory',
      name: '项目类别',
      component:ItemCategory
    },
    {
      path: '/CardManagement',
      name: '卡类管理',
      component:CardManagement
    },
    {
      path: '/CreditVoucherManagement',
      name: '抵用券管理',
      component:CreditVoucherManagement
    },
    {
      path: '/IncomeInquiry',
      name: '收入查询',
      component:IncomeInquiry
    },
    {
      path: '/IncomeBreakdown',
      name: '收入明细',
      component:IncomeBreakdown
    },
    {
      path: '/HistoricalIncome',
      name: '历史收入',
      component:HistoricalIncome
    },
    {
      path: '/HistoricalIncomeBreakdown',
      name: '历史收入明细',
      component:HistoricalIncomeBreakdown
    },
    {
      path: '/DataReport',
      name: '数据报表',
      component:DataReport
    },
    {
      path: '/EmployeeManagement',
      name: '员工管理',
      component:EmployeeManagement
    },
    {
      path: '/StoreManagement',
      name: '门店管理',
      component:StoreManagement
    }
  ],
  mode: 'history',
})
