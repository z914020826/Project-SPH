import Vue from 'vue'
import App from './App.vue'

// 全局组件
import TypeNav from "./components/TypeNav"
import Pagination from "@/components/Pagination"
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)

// element-ui
import { MessageBox } from 'element-ui';
// Vue.component(MessageBox.name, MessageBox);
// element-ui注册组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入仓库
import store from "./store"

// 引入路由
import router from "@/router"

// 统一接口api文件夹里面的所有请求函数
import * as API from '@/api'

// 引入mock数据
import "./mock/mockServe"

// 引入swiper样式
import 'swiper/swiper-bundle.min.css'

// 引入并加载懒加载

import atm from "@/assets/images/1.gif"

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: atm,
})

// 引入表单验证插件
import "@/plugins/validate"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this
    // 将所有的接口放到Vue原型身上
    Vue.prototype.$API = API
  },
  // 注册仓库,组件实力的身上会多一个属性$store
  store,
  // 注册路由：KV一致
  router,

}).$mount('#app')
