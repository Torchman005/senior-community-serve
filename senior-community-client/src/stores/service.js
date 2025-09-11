import { defineStore } from 'pinia'

export const useServiceStore = defineStore('service', {
  state: () => ({
    services: [],
    categories: [
      { id: 1, name: '医疗健康', icon: 'Medicine' },
      { id: 2, name: '生活照料', icon: 'House' },
      { id: 3, name: '紧急维修', icon: 'Tools' },
      { id: 4, name: '其他服务', icon: 'More' }
    ],
    currentCategory: null,
    userOrders: [],
    loading: false
  }),
  
  actions: {
    // 模拟获取服务列表
    async fetchServices(categoryId = null) {
      this.loading = true
      
      try {
        // 模拟API请求延迟
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 模拟服务数据
        const allServices = [
          // 医疗健康服务
          { 
            id: 101, 
            categoryId: 1, 
            title: '在线医疗咨询', 
            description: '专业医生在线解答健康问题，提供用药建议', 
            price: 50, 
            unit: '次',
            rating: 4.8,
            image: '/images/services/online-consultation.jpg',
            provider: '健康在线医疗集团'
          },
          { 
            id: 102, 
            categoryId: 1, 
            title: '上门体检服务', 
            description: '专业医护人员上门提供体检服务，包含常规体检项目', 
            price: 299, 
            unit: '次',
            rating: 4.7,
            image: '/images/services/home-medical.jpg',
            provider: '康泰医疗服务'
          },
          { 
            id: 103, 
            categoryId: 1, 
            title: '陪诊就医服务', 
            description: '专业陪诊人员全程陪同就医，包括挂号、候诊、取药等', 
            price: 200, 
            unit: '次',
            rating: 4.9,
            image: '/images/services/medical-escort.jpg',
            provider: '暖心陪诊'
          },
          { 
            id: 104, 
            categoryId: 1, 
            title: '康复理疗预约', 
            description: '专业康复师提供理疗服务，帮助恢复身体机能', 
            price: 150, 
            unit: '小时',
            rating: 4.6,
            image: '/images/services/rehabilitation.jpg',
            provider: '乐康复理疗中心'
          },
          
          // 生活照料服务
          { 
            id: 201, 
            categoryId: 2, 
            title: '小时工家政服务', 
            description: '提供按小时计费的家政服务，包括清洁、整理等', 
            price: 50, 
            unit: '小时',
            rating: 4.5,
            image: '/images/services/hourly-cleaning.jpg',
            provider: '洁净家政服务'
          },
          { 
            id: 202, 
            categoryId: 2, 
            title: '专业保姆服务', 
            description: '经验丰富的保姆提供全方位的家庭照料服务', 
            price: 5000, 
            unit: '月',
            rating: 4.7,
            image: '/images/services/nanny.jpg',
            provider: '家和家政'
          },
          { 
            id: 203, 
            categoryId: 2, 
            title: '上门护工服务', 
            description: '专业护工提供助浴、助餐、清洁等服务', 
            price: 100, 
            unit: '小时',
            rating: 4.8,
            image: '/images/services/home-care.jpg',
            provider: '爱心护理'
          },
          
          // 紧急维修服务
          { 
            id: 301, 
            categoryId: 3, 
            title: '水管紧急维修', 
            description: '专业水管维修，快速解决漏水、堵塞等问题', 
            price: 150, 
            unit: '次',
            rating: 4.6,
            image: '/images/services/plumbing.jpg',
            provider: '急修管道服务'
          },
          { 
            id: 302, 
            categoryId: 3, 
            title: '电路紧急维修', 
            description: '专业电工快速解决电路故障，保障用电安全', 
            price: 180, 
            unit: '次',
            rating: 4.7,
            image: '/images/services/electrical.jpg',
            provider: '安全电工'
          },
          { 
            id: 303, 
            categoryId: 3, 
            title: '家电维修服务', 
            description: '专业维修各类家用电器，包括冰箱、洗衣机、空调等', 
            price: 120, 
            unit: '次',
            rating: 4.5,
            image: '/images/services/appliance-repair.jpg',
            provider: '全能家电维修'
          },
          { 
            id: 304, 
            categoryId: 3, 
            title: '门窗维修服务', 
            description: '专业维修各类门窗问题，包括锁具更换、门窗调整等', 
            price: 100, 
            unit: '次',
            rating: 4.4,
            image: '/images/services/door-window.jpg',
            provider: '安家门窗维修'
          },
          
          // 其他服务
          { 
            id: 401, 
            categoryId: 4, 
            title: '上门理发服务', 
            description: '专业理发师上门提供理发服务，适合行动不便的老人', 
            price: 80, 
            unit: '次',
            rating: 4.6,
            image: '/images/services/haircut.jpg',
            provider: '爱心理发'
          },
          { 
            id: 402, 
            categoryId: 4, 
            title: '法律援助服务', 
            description: '专业律师提供法律咨询和援助，解决老年人法律问题', 
            price: 200, 
            unit: '小时',
            rating: 4.8,
            image: '/images/services/legal-aid.jpg',
            provider: '长者法律援助中心'
          },
          { 
            id: 403, 
            categoryId: 4, 
            title: '心理疏导服务', 
            description: '专业心理咨询师提供心理疏导和情绪支持', 
            price: 180, 
            unit: '小时',
            rating: 4.9,
            image: '/images/services/psychological.jpg',
            provider: '心灵港湾'
          }
        ]
        
        // 根据分类筛选服务
        if (categoryId) {
          this.services = allServices.filter(service => service.categoryId === categoryId)
          this.currentCategory = this.categories.find(c => c.id === categoryId)
        } else {
          this.services = allServices
          this.currentCategory = null
        }
      } catch (error) {
        console.error('获取服务列表失败:', error)
      } finally {
        this.loading = false
      }
    },
    
    // 创建订单
    createOrder(serviceId, serviceInfo, orderDetails) {
      const newOrder = {
        id: Date.now(), // 模拟订单ID
        serviceId,
        serviceName: serviceInfo.title,
        price: serviceInfo.price,
        status: '待服务',
        createTime: new Date().toLocaleString(),
        details: orderDetails
      }
      
      this.userOrders.unshift(newOrder)
      return newOrder
    },
    
    // 获取用户订单
    async fetchUserOrders() {
      this.loading = true
      
      try {
        // 模拟API请求延迟
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 这里应该是从API获取数据，现在使用本地存储的订单
        // 实际项目中应该从后端获取
      } catch (error) {
        console.error('获取订单列表失败:', error)
      } finally {
        this.loading = false
      }
    }
  },
  
  getters: {
    // 获取服务分类列表
    getCategories: (state) => state.categories,
    
    // 获取当前分类下的服务
    getServicesByCategory: (state) => (categoryId) => {
      return state.services.filter(service => service.categoryId === categoryId)
    },
    
    // 获取服务详情
    getServiceById: (state) => (serviceId) => {
      return state.services.find(service => service.id === serviceId)
    },
    
    // 获取用户订单
    getUserOrders: (state) => state.userOrders
  }
})