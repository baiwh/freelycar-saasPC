// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'

// elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 加号按钮组件
import addNewButton from '@/components/addNewButton'
Vue.component('addNewButton', addNewButton)
// 分页器组件
import pagingDevice from '@/components/pagingDevice'
Vue.component('pagingDevice', pagingDevice)

// import axios from 'axios'
// vue.use(axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
