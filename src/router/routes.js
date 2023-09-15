// 引入一级路由组件
// import Home from '../pages/Home'
import Search from '../pages/Search'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '../pages/Trade'
import PaySuccess from '../pages/PaySuccess'
import Pay from '../pages/Pay'
import Center from '../pages/Center'

// 引入二级路由组件
import MyOrder from '../pages/Center/myOrder'
import GroupOrder from '../pages/Center/groupOrder'

export default
    [

        {
            path: "/center",
            component: Center,
            meta: { FtShow: true },
            // 二级路由组件
            children: [
                {
                    path: 'myorder',
                    component: MyOrder,
                },
                {
                    path: 'grouporder',
                    component: GroupOrder,
                },
                {
                    path: '/center',
                    redirect: '/center/myorder',
                },
            ]
        },
        {
            path: "/paysuccess",
            component: PaySuccess,
            meta: { FtShow: true },
        },
        {
            path: "/pay",
            component: Pay,
            meta: { FtShow: true },
            beforeEnter: (to, from, next) => {
                // 支付页必须从交易页跳转
                if (from.path == '/trade') {
                    next()
                } else {
                    // 中断当前导航，如果浏览器的URL改变了，那么URL充值到from路由对应的地址
                    next(false)
                }
            }
        },
        {
            path: "/home",
            // 路由懒加载
            component: () => import('../pages/Home'),
            meta: { FtShow: true }
        },
        {
            path: "/trade",
            component: Trade,
            meta: { FtShow: true },
            // 路由独享守卫
            beforeEnter: (to, from, next) => {
                // 交易页必须从购物车来
                if (from.path == '/shopcart') {
                    next()
                } else {
                    // 中断当前导航，如果浏览器的URL改变了，那么URL充值到from路由对应的地址
                    next(false)
                }
            }
        },
        {
            name: 'search',
            path: "/search/:keyword",
            component: Search,
            meta: { FtShow: true }

        },
        {
            path: "/login",
            component: Login,
            meta: { FtShow: false }

        },
        {
            path: "/register",
            component: Register,
            meta: { FtShow: false }

        },
        {
            path: "/detail/:skuid",
            component: Detail,
            meta: { FtShow: true }

        },
        {
            name: 'addcartsuccess',
            path: "/addcartsuccess",
            component: AddCartSuccess,
            meta: { FtShow: true }

        },
        {
            name: 'shopcart',
            path: "/shopcart",
            component: ShopCart,
            meta: { FtShow: true }

        },
        {
            path: "*",
            redirect: "/home",

        },
    ]
