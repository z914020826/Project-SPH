// API接口进行统一管理

import app from "./Ajax"
import mockApp from "./mockAjax"

// 三级联动的接口  地址：/api/product/getBaseCategoryList  请求方式：GET   参数：无
export const reqCategoryList = () => {
    // 发请求:返回的结果是Promise对象
    return app({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}
// 获取banner
export const getBanner = () => {
    // 发请求:返回的结果是Promise对象
    return mockApp({
        url: '/banner',
        method: 'get'
    })
}

// 获取floor
export const getFloorList = () => {
    // 发请求:返回的结果是Promise对象
    return mockApp({
        url: '/floor',
        method: 'get'
    })
}

// 获取搜索模块 地址：api/list 请求方式：POST  
/** 参数
 * {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
 * 
 */
export const getSearchInfo = (params) => {
    // 给服务器传递得参数至少是一个空对象{}
    return app({
        url: '/list',
        method: 'post',
        data: params
    })
}

// 获取产品详情得接口  URL：/api/item/{ skuId }  请求方式：GET
export const getGoodsInfo = (skuId) => {
    // 给服务器传递得参数至少是一个空对象{}
    return app({
        url: `/item/${skuId}`,
        method: 'get',
    })
}

// 添加产品到购物车的接口  URL：/api/cart/addToCart/{ skuId }/{ skuNum }  请求方式：POST  
export const addShopCart = (skuId, skuNum) => {
    // 给服务器传递得参数至少是一个空对象{}
    return app({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post',
    })
}

// 获取购物车列表的接口 URL：/api/cart/cartList   请求方式：GET
export const getCartList = () => {
    // 给服务器传递得参数至少是一个空对象{}
    return app({
        url: '/cart/cartList',
        method: 'get',
    })
}

// 删除购物车产品的接口  URL：/api/cart/deleteCart/{skuId} 请求方式：DELETE
export const deleteCart = (skuId) => {
    // 给服务器传递得参数至少是一个空对象{}
    return app({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete',
    })
}

// 切换商品选中状态的接口  URL：/api/cart/checkCart/{skuID}/{isChecked}  请求方式：GET
export const changeChecked = (skuId, isChecked) => {
    // 给服务器传递得参数至少是一个空对象{}
    return app({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get',
    })
}

//获取验证码   URL:/api/user/passport/sendCode/{phone}  请求方式：GET
export const getCode = (phone) => {
    // 给服务器传递得参数至少是一个空对象{}
    return app({
        url: `/user/passport/sendCode/${phone}`,
        method: 'get',
    })
}
//用户注册   URL:/api/user/passport/register  请求方式：POST
export const userRegister = (data) => {
    // 给服务器传递得参数至少是一个空对象{}
    return app({
        url: `/user/passport/register`,
        data,
        method: 'post',
    })
}
//用户登录   URL:/api/user/passport/login  请求方式：POST
export const userLogin = (data) => {
    // 给服务器传递得参数至少是一个空对象{}
    return app({
        url: `/user/passport/login`,
        data,
        method: 'post',
    })
}
//用户信息   URL:/api/user/passport/auth/getUserInfo  请求方式：GET
export const getUserInfo = () => {
    // 给服务器传递得参数至少是一个空对象{}
    return app({
        url: `/user/passport/auth/getUserInfo`,
        method: 'get',
    })
}

// 用户退出  URL：/api/user/passport/logout     请求方式：GET
export const userLogout = () => {
    // 给服务器传递得参数至少是一个空对象{}
    return app({
        url: `/user/passport/logout `,
        method: 'get',
    })
}

// 获取用户地址信息 URL：/api/user/userAddress/auth/findUserAddressList  请求方式：GET
export const getAdressInfo = () => {
    return app({
        url: '/user/userAddress/auth/findUserAddressList',
        method: 'get'
    })
}

// 获取商品清单 URL：/api/order/auth/trade  请求方式：GET
export const getOrderInfo = () => {
    return app({
        url: '/order/auth/trade',
        method: 'get'
    })
}

// 获取商品清单 URL：/api/order/auth/submitOrder?tradeNo={tradeNo}  请求方式：POST
export const submitOrder = (tradeNo, data) => {
    return app({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method: 'post'
    })
}
// 获取商品清单 URL：/api/payment/weixin/createNative/{orderId}  请求方式：GET
export const getPayInfo = (orderId) => {
    return app({
        url: `/payment/weixin/createNative/${orderId}`,
        method: 'get'
    })
}

// 获取支付订单状态 URL：/api/payment/weixin/queryPayStatus/{orderId}   请求方式：GET
export const getPayStatus = (orderId) => {
    return app({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: 'get'
    })
}

// 获取订单列表  URL：/api/order/auth/{page}/{limit}    请求方式：GET
export const getOrderList = (page, limit) => {
    return app({
        url: `/order/auth/${page}/${limit} `,
        method: 'get'
    })
}

