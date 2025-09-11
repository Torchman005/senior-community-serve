import { defineStore } from 'pinia'

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activities: [],
    types: [
      { id: 1, name: '线上活动', icon: 'VideoPlay' },
      { id: 2, name: '线下活动', icon: 'Location' },
      { id: 3, name: '创意工坊', icon: 'Brush' }
    ],
    currentType: null,
    userActivities: [],
    loading: false
  }),
  
  actions: {
    // 模拟获取活动列表
    async fetchActivities(typeId = null) {
      this.loading = true
      
      try {
        // 模拟API请求延迟
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 模拟活动数据
        const allActivities = [
          // 线上活动
          { 
            id: 101, 
            typeId: 1, 
            title: '书画直播课：山水画技法', 
            description: '著名山水画家王老师在线教授山水画基本技法，适合初学者', 
            startTime: '2023-10-15 14:00', 
            endTime: '2023-10-15 16:00',
            location: '线上直播',
            image: '/images/activities/painting-class.jpg',
            organizer: '乐龄文化协会',
            participants: 45,
            maxParticipants: 100,
            isOnline: true
          },
          { 
            id: 102, 
            typeId: 1, 
            title: '线上读书会：《平凡的世界》', 
            description: '共同阅读讨论路遥的名著《平凡的世界》，分享阅读感受', 
            startTime: '2023-10-18 19:00', 
            endTime: '2023-10-18 21:00',
            location: '线上会议室',
            image: '/images/activities/book-club.jpg',
            organizer: '书香社',
            participants: 32,
            maxParticipants: 50,
            isOnline: true
          },
          { 
            id: 103, 
            typeId: 1, 
            title: '在线棋牌比赛：象棋大师赛', 
            description: '线上象棋比赛，高手云集，赢取丰厚奖品', 
            startTime: '2023-10-20 10:00', 
            endTime: '2023-10-20 17:00',
            location: '象棋在线平台',
            image: '/images/activities/chess-competition.jpg',
            organizer: '棋艺协会',
            participants: 64,
            maxParticipants: 128,
            isOnline: true
          },
          { 
            id: 104, 
            typeId: 1, 
            title: '智能手机使用教学直播', 
            description: '手把手教您使用智能手机的基本功能，包括微信、支付宝等常用APP', 
            startTime: '2023-10-22 09:30', 
            endTime: '2023-10-22 11:30',
            location: '线上直播室',
            image: '/images/activities/smartphone-tutorial.jpg',
            organizer: '银发数字学堂',
            participants: 89,
            maxParticipants: 200,
            isOnline: true
          },
          
          // 线下活动
          { 
            id: 201, 
            typeId: 2, 
            title: '社区象棋友谊赛', 
            description: '社区内象棋爱好者的友谊比赛，增进邻里感情', 
            startTime: '2023-10-16 14:00', 
            endTime: '2023-10-16 17:00',
            location: '和平社区活动中心',
            image: '/images/activities/chess-friendly.jpg',
            organizer: '和平社区居委会',
            participants: 28,
            maxParticipants: 32,
            isOnline: false
          },
          { 
            id: 202, 
            typeId: 2, 
            title: '周末手工市集', 
            description: '展示和售卖社区老人制作的手工艺品，所得收入归制作者所有', 
            startTime: '2023-10-21 09:00', 
            endTime: '2023-10-22 17:00',
            location: '阳光广场',
            image: '/images/activities/weekend-market.jpg',
            organizer: '阳光社区',
            participants: 45,
            maxParticipants: 60,
            isOnline: false
          },
          { 
            id: 203, 
            typeId: 2, 
            title: '广场舞联谊活动', 
            description: '多个社区广场舞队伍联合表演，交流舞蹈技巧', 
            startTime: '2023-10-17 19:00', 
            endTime: '2023-10-17 21:00',
            location: '中央公园广场',
            image: '/images/activities/square-dance.jpg',
            organizer: '健康舞蹈协会',
            participants: 120,
            maxParticipants: 200,
            isOnline: false
          },
          { 
            id: 204, 
            typeId: 2, 
            title: '郊外一日游：古镇之旅', 
            description: '组织前往周边古镇一日游，欣赏古镇风貌，品尝当地美食', 
            startTime: '2023-10-25 08:00', 
            endTime: '2023-10-25 18:00',
            location: '集合地点：中央公园门口',
            image: '/images/activities/day-trip.jpg',
            organizer: '乐游旅行社',
            participants: 35,
            maxParticipants: 40,
            isOnline: false
          },
          
          // 创意工坊
          { 
            id: 301, 
            typeId: 3, 
            title: '摄影作品展：《岁月留影》', 
            description: '展示社区老人的摄影作品，记录美好生活瞬间', 
            startTime: '2023-10-15 09:00', 
            endTime: '2023-10-30 17:00',
            location: '社区文化中心展厅',
            image: '/images/activities/photo-exhibition.jpg',
            organizer: '银发摄影协会',
            participants: 15,
            maxParticipants: 20,
            isOnline: false,
            works: [
              { id: 1, name: '夕阳红', author: '张大爷', price: 300, image: '/images/works/photo1.jpg' },
              { id: 2, name: '春日花开', author: '李奶奶', price: 280, image: '/images/works/photo2.jpg' },
              { id: 3, name: '童年记忆', author: '王老先生', price: 350, image: '/images/works/photo3.jpg' }
            ]
          },
          { 
            id: 302, 
            typeId: 3, 
            title: '诗词创作分享会', 
            description: '社区老人分享原创诗词作品，交流创作心得', 
            startTime: '2023-10-19 14:00', 
            endTime: '2023-10-19 16:30',
            location: '社区图书馆',
            image: '/images/activities/poetry-sharing.jpg',
            organizer: '夕阳红文学社',
            participants: 25,
            maxParticipants: 30,
            isOnline: false,
            works: [
              { id: 4, name: '《归园田居》', author: '陈老先生', price: 0, image: '/images/works/poem1.jpg' },
              { id: 5, name: '《秋思》', author: '赵奶奶', price: 0, image: '/images/works/poem2.jpg' }
            ]
          },
          { 
            id: 303, 
            typeId: 3, 
            title: '手工艺品展示与义卖', 
            description: '展示和义卖社区老人制作的手工艺品，收入用于社区公益', 
            startTime: '2023-10-28 10:00', 
            endTime: '2023-10-29 16:00',
            location: '社区活动中心大厅',
            image: '/images/activities/handicraft-sale.jpg',
            organizer: '巧手工艺坊',
            participants: 18,
            maxParticipants: 25,
            isOnline: false,
            works: [
              { id: 6, name: '竹编花篮', author: '刘大爷', price: 120, image: '/images/works/craft1.jpg' },
              { id: 7, name: '布艺挂饰', author: '张奶奶', price: 80, image: '/images/works/craft2.jpg' },
              { id: 8, name: '手工皂', author: '李阿姨', price: 50, image: '/images/works/craft3.jpg' },
              { id: 9, name: '剪纸作品', author: '王大爷', price: 100, image: '/images/works/craft4.jpg' }
            ]
          }
        ]
        
        // 根据类型筛选活动
        if (typeId) {
          this.activities = allActivities.filter(activity => activity.typeId === typeId)
          this.currentType = this.types.find(t => t.id === typeId)
        } else {
          this.activities = allActivities
          this.currentType = null
        }
      } catch (error) {
        console.error('获取活动列表失败:', error)
      } finally {
        this.loading = false
      }
    },
    
    // 报名活动
    joinActivity(activityId, activityInfo, userInfo) {
      const newJoin = {
        id: Date.now(), // 模拟ID
        activityId,
        activityName: activityInfo.title,
        joinTime: new Date().toLocaleString(),
        status: '已报名',
        userInfo
      }
      
      this.userActivities.unshift(newJoin)
      return newJoin
    },
    
    // 获取用户参与的活动
    async fetchUserActivities() {
      this.loading = true
      
      try {
        // 模拟API请求延迟
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 这里应该是从API获取数据，现在使用本地存储的活动记录
        // 实际项目中应该从后端获取
      } catch (error) {
        console.error('获取活动记录失败:', error)
      } finally {
        this.loading = false
      }
    },
    
    // 购买创意工坊作品
    purchaseWork(workId, workInfo) {
      // 模拟购买逻辑，实际项目中应该调用API
      console.log('购买作品:', workInfo)
      return {
        success: true,
        orderId: Date.now(),
        message: '购买成功'
      }
    }
  },
  
  getters: {
    // 获取活动类型列表
    getTypes: (state) => state.types,
    
    // 获取当前类型下的活动
    getActivitiesByType: (state) => (typeId) => {
      return state.activities.filter(activity => activity.typeId === typeId)
    },
    
    // 获取活动详情
    getActivityById: (state) => (activityId) => {
      return state.activities.find(activity => activity.id === activityId)
    },
    
    // 获取用户参与的活动
    getUserActivities: (state) => state.userActivities,
    
    // 获取创意工坊作品
    getCreativeWorks: (state) => {
      const creativeActivities = state.activities.filter(activity => activity.typeId === 3)
      return creativeActivities.reduce((works, activity) => {
        if (activity.works && activity.works.length > 0) {
          return [...works, ...activity.works.map(work => ({
            ...work,
            activityId: activity.id,
            activityTitle: activity.title
          }))]
        }
        return works
      }, [])
    }
  }
})