
import { v4 as uuidv4 } from 'uuid';
// 要生成一个随机的字符串，并且每次执行不能发生变化，游客身份持久储存
export const getUUID = () => {
    // 先从本地存储获取uuid，看看是否存在
    let uuid_token = localStorage.getItem('UUIDTOKEN')

    if (!uuid_token) {
        // 如果本地没有uuid，那么就生成一个新的uuid
        uuid_token = uuidv4()
        localStorage.setItem("UUIDTOKEN", uuid_token)
    }

    return uuid_token
}