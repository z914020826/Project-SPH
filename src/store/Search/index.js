
/**
 * Search模块的仓库
 */

import { getSearchInfo } from "@/api"

// 存储数据的地方
const state = {
    searchList: []
}

//修改state数据的唯一手段
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}

// 可以处理业务逻辑
const actions = {
    async getSearchList({ commit }, params = {}) {
        let result = await getSearchInfo(params);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}

// 可以理解为计算属性
const getters = {
    goodsList(state) {
        return state.searchList.goodsList
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    },
    attrsList(state) {
        return state.searchList.attrsList
    },
    total(state) {
        return state.searchList.total
    }

}

export default {
    state,
    actions,
    mutations,
    getters
}