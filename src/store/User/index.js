
/**
 * User模块的仓库
 */
import { getCode, getUserInfo, userLogin, userRegister, userLogout } from "@/api"
import { setToken, getToken, removeToken } from "@/utils/token"


// 存储数据的地方
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}

//修改state数据的唯一手段
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    USERLOGOUT(state) {
        // 清除所有用户得数据
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}


// 可以处理业务逻辑
const actions = {

    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await getCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(result.message)
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await userRegister(user)
        console.log(result);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(result.message)
        }
    },
    // 用户登录
    async userLogin({ commit }, user) {
        let result = await userLogin(user)
        if (result.code == 200) {

            commit('USERLOGIN', result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(result.message)
        }
    },

    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await getUserInfo()
        console.log(result);
        if (result.code == 200) {
            // 提交用户信息
            commit('GETUSERINFO', result.data)
            // 持久化存储
            return 'ok'
        } else {
            return Promise.reject(result.message)
        }
    },
    // 用户退出
    async userLogout({ commit }) {
        let result = await userLogout()
        if (result.code == 200) {
            commit('USERLOGOUT')
            return 'ok'
        } else {
            return Promise.reject(result.message)
        }
    }
}

// 可以理解为计算属性
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}