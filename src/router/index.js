import Vue from 'vue'
import Router from 'vue-router'
// 消费开单
import QuickBilling from '@/components/QuickBilling'
import SettlementCenter from '@/components/SettlementCenter'
import DocumentManagement from '@/components/DocumentManagement'
import DocumentDetails from '@/components/DocumentDetails'
// 会员管理
import CustomerManagement from '@/components/CustomerManagement'
import AddNewCustomers from '@/components/AddNewCustomers'
import ModifyCustomerInformation from '@/components/ModifyCustomerInformation'
import CustomerInformation from '@/components/CustomerInformation'
import ExpensesRecord from '@/components/ExpensesRecord'
import MemberProcessing from '@/components/MemberProcessing'
// 产品管理
import ProjectManagement from '@/components/ProjectManagement'
import ItemCategory from '@/components/ItemCategory'
import CardManagement from '@/components/CardManagement'
import CreditVoucherManagement from '@/components/CreditVoucherManagement'
// 财务管理
import IncomeInquiry from '@/components/IncomeInquiry'
import IncomeBreakdown from '@/components/IncomeBreakdown'
import HistoricalIncome from '@/components/HistoricalIncome'
import HistoricalIncomeBreakdown from '@/components/HistoricalIncomeBreakdown'
import DataReport from '@/components/DataReport'
// 系统设置
import EmployeeManagement from '@/components/EmployeeManagement'
import StoreManagement from '@/components/StoreManagement'

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
