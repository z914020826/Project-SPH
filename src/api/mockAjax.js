// 对axios进行二次封装


// 引入axios
import axios from "axios";
// 引入进度条  start方法代表进度条开始，done方法代表进度条结束
import nProgress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css"

// 利用axios对象的方法，创建一个axios实例
const app = axios.create({
    // 配置对象

    // 基础路径，发请求的时候，路径当中会出现api
    baseURL: '/mock',
    // 设置超时时间,5s
    timeout: 5000
})

// 请求拦截器：再发请求之前，请求拦截器可以检测到，可以在请求发出去之前做的一些事情
app.interceptors.request.use((config) => {
    // config:请求对象，其中有一个重要的属性，header请求头

    //进度条开始动
    nProgress.start()
    // 返回
    return config
})

// 响应拦截器
app.interceptors.response.use(
    (res) => {
        // 进度条结束
        nProgress.done()
        // 成功的回调
        return res.data
    },
    (error) => {
        // 失败的回调
        return Promise.reject(new Error('fail'))
    }
)

// 对外暴露
export default app;







