
/**
 * Home-模块的仓库
 */

import { reqCategoryList, getBanner, getFloorList } from "@/api"
// 存储数据的地方
const state = {
    // 三级菜单得数据
    categoryList: [],
    // 轮播图得数据
    bannerList: [],
    floorList: []
}

//修改state数据的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}

// 可以处理业务逻辑
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    // 获取轮播图的数据
    async getBannerList({ commit }) {
        let result = await getBanner()
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }

    },
    // 获取floor的数据
    async getFloorList({ commit }) {
        let result = await getFloorList()
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
        }

    }
}

// 可以理解为计算属性
const getters = {}


export default {
    state,
    mutations,
    actions,
    getters
}