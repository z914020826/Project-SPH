// 配置路由的地方

// 引入Vue
import Vue from "vue";

// 引入Vue-router
import VueRouter from "vue-router";

// 使用Vue-router
Vue.use(VueRouter)

import routes from "./routes"

// 引入store
import store from "@/store"


// 先把VueRouter原型对象的方法先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写Push、replace
// location 往哪跳转
// resolve  成功的回调
// reject   失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return {
            x: 0,
            y: 0
        }
    }
})
// 全局守卫：前置守卫（路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
    // to:可以获取到要跳转的那个路由信息
    // from:可以获取到从哪个路由来的信息
    // next:放行函数

    // console.log(store);
    let token = store.state.User.token
    let name = store.state.User.userInfo.name
    if (token) {
        // 如果有token，那么说明用户已经登录，那么将不能跳转到登录页面
        if (to.path == '/login') {
            // 如果用户要去登录页面，那么直接跳转到home页面
            next('/home')
        } else {
            if (name) {
                // 在有token的情况下，跳转之后，看看是否有用户信息 的存在，如果没有那么就获取用户信息
                next()
            } else {
                try {
                    // 获取用户信息在首页展示
                    await store.dispatch("getUserInfo");
                    next()
                } catch (error) {
                    // token失效了，获取不到用户的信息，那么就重新登录
                    // 清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 如果没有token，那么说明用户没有登录,那么就不能去【trade,pay，paysuccess，center】
        let toPath = to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
            alert('您未登录，请登录')
            next('/login?redirect=' + toPath)
        } else {
            next()
        }
    }

})
export default router