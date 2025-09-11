import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 可以在这里添加token等认证信息
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.error('API请求错误:', error);
    return Promise.reject(error);
  }
);

// 用户相关API
export const userApi = {
  // 用户登录
  login: (data) => api.post('/api/users/login', data),
  
  // 用户注册
  createUser: (data) => api.post('/api/users/register', data),
  
  // 获取用户信息
  getUserInfo: () => api.get('/api/users/current'),
  
  // 更新用户信息
  updateUser: (id, data) => api.put(`/api/users/${id}`, data)
}

// 服务相关API
export const serviceApi = {
  // 获取服务列表
  getServiceList: (params) => api.get('/api/services', { params }),
  
  // 获取服务详情
  getServiceById: (id) => api.get(`/api/services/${id}`),
  
  // 预订服务
  bookService: (data) => api.post('/api/orders', data)
}

// 活动相关API
export const activityApi = {
  // 获取活动列表
  getActivityList: (params) => api.get('/api/activities', { params }),
  
  // 获取活动详情
  getActivityById: (id) => api.get(`/api/activities/${id}`),
  
  // 报名活动
  joinActivity: (id, data) => api.post(`/api/activities/${id}/join`, data)
}

export default api;