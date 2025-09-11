import axios from 'axios'
import {ElMessage} from 'element-plus'

const request = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 30000 // 后台超时时间
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
request.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json;charset=utf-8';
        
        // 添加token认证
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        
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
        
        // 处理401未授权错误
        if (res.code === 401) {
            // 清除token
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
            // 跳转到登录页
            window.location.href = '/login'
        }
        
        return res;
    },
    error => {
        console.error('请求错误详情:', error)
        
        // 检查是否有响应对象
        if (error.response) {
            console.error('错误响应数据:', error.response.data)
            console.error('错误状态码:', error.response.status)
            
            if (error.response.status === 401) {
                // 处理401未授权错误
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')
                window.location.href = '/login'
                ElMessage.error('登录已过期，请重新登录')
            } else if (error.response.status === 404) {
                ElMessage.error('请求资源不存在')
            } else if (error.response.status === 500) {
                // 显示更详细的服务器错误信息
                const errorMsg = error.response.data && error.response.data.message 
                    ? error.response.data.message 
                    : '服务器错误，请联系管理员'
                ElMessage.error(errorMsg)
            } else {
                // 显示响应中的错误信息
                const errorMsg = error.response.data && error.response.data.message
                    ? error.response.data.message
                    : `请求失败: ${error.response.status}`
                ElMessage.error(errorMsg)
            }
        } else if (error.request) {
            // 请求已发出但没有收到响应
            console.error('未收到响应:', error.request)
            ElMessage.error('服务器无响应，请检查网络连接')
        } else {
            // 请求配置出错
            console.error('请求配置错误:', error.message)
            ElMessage.error(`请求错误: ${error.message}`)
        }
        
        return Promise.reject(error)
    }
)

export default request
