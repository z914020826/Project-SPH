
/**
 * Detail模块的仓库
 */

import { getGoodsInfo, addShopCart } from "@/api"

// 封装游客身份的模块
import { getUUID } from "@/utils/uuid_token"
// 存储数据的地方
const state = {
    // 商品信息数据
    goodsInfo: {},

    // 游客临时身份
    uuid_token: getUUID()
}

//修改state数据的唯一手段
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    },
}


// 可以处理业务逻辑
const actions = {
    // 获取产品信息
    async getGoodsInfo({ commit }, skuId) {
        let result = await getGoodsInfo(skuId);
        if (result.code == 200) {
            commit("GETGOODSINFO", result.data)
        }

    },
    // 将产品添加到购物车中
    // async定义的函数会默认返回一个Promise对象
    async addShopCart({ commit }, { skuId, skuNum }) {
        // 加入购物车，前台将数据带给服务器，不用返回数据
        let result = await addShopCart(skuId, skuNum);

        // 判断加入购物车是否成功
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('加入购物车失败'))
        }
    }

}

// 可以理解为计算属性
const getters = {
    // 路径导航
    categoryView(state) {
        return state.goodsInfo.categoryView || {}
    },
    // 产品信息
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    // 产品售卖属性
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    }
}


export default {
    state,
    actions,
    mutations,
    getters
}