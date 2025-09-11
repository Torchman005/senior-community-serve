import request from '@/utils/request'

// 用户管理API
export const userApi = {
  // 获取用户列表
  getUserList: (params) => request.get('/api/users', { params }),
  
  // 获取用户详情
  getUserById: (id) => request.get(`/api/users/${id}`),
  
  // 创建用户
  createUser: (data) => request.post('/api/users', data),
  
  // 更新用户信息
  updateUser: (id, data) => request.put(`/api/users/${id}`, data),
  
  // 删除用户
  deleteUser: (id) => request.delete(`/api/users/${id}`),
  
  // 获取用户统计信息
  getUserStats: () => request.get('/api/users/stats')
}

// 服务管理API
export const serviceApi = {
  // 获取服务列表
  getServiceList: (params) => request.get('/api/services', { params }),
  
  // 获取服务详情
  getServiceById: (id) => request.get(`/api/services/${id}`),
  
  // 创建服务
  createService: (data) => request.post('/api/services', data),
  
  // 更新服务信息
  updateService: (id, data) => request.put(`/api/services/${id}`, data),
  
  // 删除服务
  deleteService: (id) => request.delete(`/api/services/${id}`),
  
  // 获取服务分类
  getServiceCategories: () => request.get('/api/services/categories'),
  
  // 获取服务统计信息
  getServiceStats: () => request.get('/api/services/stats')
}

// 活动管理API
export const activityApi = {
  // 获取活动列表
  getActivityList: (params) => request.get('/api/activities', { params }),
  
  // 获取活动详情
  getActivityById: (id) => request.get(`/api/activities/${id}`),
  
  // 创建活动
  createActivity: (data) => request.post('/api/activities', data),
  
  // 更新活动信息
  updateActivity: (id, data) => request.put(`/api/activities/${id}`, data),
  
  // 删除活动
  deleteActivity: (id) => request.delete(`/api/activities/${id}`),
  
  // 获取活动类型
  getActivityTypes: () => request.get('/api/activities/types'),
  
  // 获取活动参与者
  getActivityParticipants: (id) => request.get(`/api/activities/${id}/participants`),
  
  // 获取活动统计信息
  getActivityStats: () => request.get('/api/activities/stats')
}

// 订单管理API
export const orderApi = {
  // 获取订单列表
  getOrderList: (params) => request.get('/api/orders', { params }),
  
  // 获取订单详情
  getOrderById: (id) => request.get(`/api/orders/${id}`),
  
  // 更新订单状态
  updateOrderStatus: (id, status) => request.put(`/api/orders/${id}/status`, { status }),
  
  // 获取订单统计信息
  getOrderStats: () => request.get('/api/orders/stats')
}

// 员工管理API
export const employeeApi = {
  // 获取员工列表
  getEmployeeList: (params) => request.get('/api/employees', { params }),
  
  // 获取员工详情
  getEmployeeById: (id) => request.get(`/api/employees/${id}`),
  
  // 创建员工
  createEmployee: (data) => request.post('/api/employees', data),
  
  // 更新员工信息
  updateEmployee: (id, data) => request.put(`/api/employees/${id}`, data),
  
  // 删除员工
  deleteEmployee: (id) => request.delete(`/api/employees/${id}`),
  
  // 获取员工统计信息
  getEmployeeStats: () => request.get('/api/employees/stats')
}

// 反馈管理API
export const feedbackApi = {
  // 获取反馈列表
  getFeedbackList: (params) => request.get('/api/feedback', { params }),
  
  // 获取反馈详情
  getFeedbackById: (id) => request.get(`/api/feedback/${id}`),
  
  // 回复反馈
  replyFeedback: (id, data) => request.post(`/api/feedback/${id}/reply`, data),
  
  // 更新反馈状态
  updateFeedbackStatus: (id, status) => request.put(`/api/feedback/${id}/status`, { status }),
  
  // 获取反馈统计信息
  getFeedbackStats: () => request.get('/api/feedback/stats')
}

// 认证API
export const authApi = {
  // 管理员登录
  login: (data) => request.post('/api/auth/admin/login', data),
  
  // 管理员登录（兼容方法）
  managerLogin: (data) => request.post('/api/manager/login', data),
  
  // 退出登录
  logout: () => request.post('/api/auth/logout'),
  
  // 获取当前管理员信息
  getCurrentAdmin: () => request.get('/api/auth/admin/current')
}

// 统计分析API
export const analyticsApi = {
  // 获取总体统计数据
  getOverallStats: () => request.get('/api/analytics/overview'),
  
  // 获取用户增长趋势
  getUserGrowthTrend: (params) => request.get('/api/analytics/user-growth', { params }),
  
  // 获取服务使用趋势
  getServiceUsageTrend: (params) => request.get('/api/analytics/service-usage', { params }),
  
  // 获取活动参与趋势
  getActivityParticipationTrend: (params) => request.get('/api/analytics/activity-participation', { params }),
  
  // 获取收入趋势
  getRevenueTrend: (params) => request.get('/api/analytics/revenue', { params })
}