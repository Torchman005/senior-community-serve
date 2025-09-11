import { defineStore } from 'pinia'
import { login as apiLogin, logout as apiLogout, getUserInfo } from '@/api/user'

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
        const response = await apiLogin(credentials)
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
        await apiLogout()
      } catch (error) {
        console.error('退出登录失败:', error)
      } finally {
        // 清除状态
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
        
        // 清除本地存储
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
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
        this.token = token
        this.userInfo = JSON.parse(userInfo)
        this.isLoggedIn = true
      }
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