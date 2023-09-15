
/**
 * ShopCart模块的仓库
 */

import { getCartList, deleteCart, changeChecked } from "@/api"

// 存储数据的地方
const state = {
    cartList: []
}

//修改state数据的唯一手段
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}

// 可以处理业务逻辑
const actions = {
    async getCartList({ commit }) {
        let result = await getCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    async deleteCart({ commit }, skuId) {
        let result = await deleteCart(skuId)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('删除失败'))
        }
    },
    // 修改产品的选中状态
    async changeChecked({ commit }, { skuId, isChecked }) {

        let result = await changeChecked(skuId, isChecked)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    // 删除所有选中的产品
    deleteAllChecked({ dispatch, getters }) {

        // 获取购物车中全部的产品
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let result = item.isChecked == 1 ? dispatch('deleteCart', item.skuId) : ''
            PromiseAll.push(result)
        });
        // 如果返回的结果有一个失败，返回即为false
        return Promise.all(PromiseAll)
    },
    updateAllChecked({ dispatch, state }, flag) {
        let PromiseAll = []
        if (state.cartList.length > 0) {
            state.cartList[0].cartInfoList.forEach(item => {
                let result = dispatch('changeChecked', { skuId: item.skuId, isChecked: flag })
                PromiseAll.push(result)
            });
        }
        return Promise.all(PromiseAll)
    }
}

// 可以理解为计算属性
const getters = {
    cartList(state) {
        return state.cartList[0] || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}