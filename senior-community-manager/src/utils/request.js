import axios from "axios";
import {ElMessage} from 'element-plus'

const request = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 30000 // 后台超时时间
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
request.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json;charset=utf-8';
        return config
    },
    error => {
        return Promise.reject(error)
});

    // response 拦截器
    // 可以在接口响应后统一处理结果
    request.interceptors.response.use(
        response => {
            let res = response.data;
            // 如果是返回的文件
            if (response.config.responseType === 'blob') {
                return res
            }
            // 兼容服务端返回的字符串数据
            if (typeof res === 'string') {
                res = res ? JSON.parse(res) : res
            }
            return res;
        },
        error => {
            if (error.response.status === 404) {
                ElMessage.error('请求资源不存在')
            } else if (error.response.status === 500) {
                ElMessage.error('服务器错误，请联系管理员')
            } else {
                ElMessage.error(error.message)
            }           
            return Promise.reject(error)
        }
    )

export default request
