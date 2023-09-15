/**
 * Trade模块的仓库
 */


/**
 * Search模块的仓库
 */

import { getAdressInfo, getOrderInfo } from "@/api"

// 存储数据的地方
const state = {
    addressInfo: [],
    orderInfo: {}
}

//修改state数据的唯一手段
const mutations = {
    GERADRESSINFO(state, addressInfo) {
        state.addressInfo = addressInfo
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}

// 可以处理业务逻辑
const actions = {
    // 获取用户地址信息
    async getAdressInfo({ commit }) {
        let result = await getAdressInfo()
        console.log(result);
        if (result.code == 200) {
            commit('GERADRESSINFO', result.data)
        }
    },
    // 获取商品清单信息
    async getOrderInfo({ commit }) {
        let result = await getOrderInfo()
        console.log('商品清单', result);
        if (result.code == 200) {
            commit('GETORDERINFO', result.data)
        }
    }


}

// 可以理解为计算属性
const getters = {


}

export default {
    state,
    actions,
    mutations,
    getters
}