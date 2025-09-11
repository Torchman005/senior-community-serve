import { defineStore } from 'pinia'
import { userApi } from '@/api/index'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      id: null,
      name: '',
      age: 0,
      phone: '',
      address: '',
      emergencyContact: '',
      avatar: '',
      role: 'user'
    },
    isLoggedIn: false,
    token: null
  }),
  
  actions: {
    // 登录
    async login(credentials) {
      try {
        const response = await userApi.login(credentials)
        const { token, user } = response.data
        
        this.token = token
        this.userInfo = user
        this.isLoggedIn = true
        
        // 保存到本地存储
        localStorage.setItem('token', token)
        localStorage.setItem('userInfo', JSON.stringify(user))
        
        return response
      } catch (error) {
        throw error
      }
    },
    
    // 退出登录
    async logout() {
      try {
        // 暂时不调用后端logout接口，直接清除本地状态
        console.log('用户退出登录')
      } catch (error) {
        console.error('退出登录失败:', error)
      } finally {
        // 清除登录状态
        this.clearLoginState()
      }
    },
    
    // 设置用户信息
    setUserInfo(userInfo) {
      this.userInfo = { ...this.userInfo, ...userInfo }
      this.isLoggedIn = true
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
    },
    
    // 设置token
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    
    // 从本地存储恢复登录状态
    restoreLoginState() {
      const token = localStorage.getItem('token')
      const userInfo = localStorage.getItem('userInfo')
      
      if (token && userInfo) {
        try {
          const parsedUserInfo = JSON.parse(userInfo)
          // 验证用户信息的有效性
          if (parsedUserInfo && parsedUserInfo.id && parsedUserInfo.name) {
            this.token = token
            this.userInfo = parsedUserInfo
            this.isLoggedIn = true
          } else {
            // 用户信息无效，清除本地存储
            this.clearLoginState()
          }
        } catch (error) {
          // JSON解析失败，清除本地存储
          console.error('解析用户信息失败:', error)
          this.clearLoginState()
        }
      } else {
        // 没有完整的登录信息，确保状态为未登录
        this.clearLoginState()
      }
    },
    
    // 清除登录状态
    clearLoginState() {
      this.token = null
      this.userInfo = {
        id: null,
        name: '',
        age: 0,
        phone: '',
        address: '',
        emergencyContact: '',
        avatar: '',
        role: 'user'
      }
      this.isLoggedIn = false
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    },
    
    // 更新用户信息
    updateUserInfo(newUserInfo) {
      this.userInfo = { ...this.userInfo, ...newUserInfo }
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
    }
  },
  
  getters: {
    // 获取用户名
    username: (state) => state.userInfo?.name || '游客',
    
    // 判断是否已登录
    loggedIn: (state) => state.isLoggedIn,
    
    // 获取用户头像
    avatar: (state) => state.userInfo?.avatar || '/default-avatar.png'
  }
})