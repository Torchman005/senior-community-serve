import api from './index';

// 用户登录
export const login = (credentials) => {
  return api.post('/api/users/login', credentials);
};

// 用户注册
export const register = (userData) => {
  return api.post('/api/users/register', userData);
};

// 获取用户信息
export const getUserInfo = (id) => {
  return api.get(`/api/users/${id}`);
};

// 更新用户信息
export const updateUserInfo = (id, userData) => {
  return api.put(`/api/users/${id}`, userData);
};

// 修改密码
export const changePassword = (id, passwordData) => {
  return api.put(`/api/users/${id}/password`, passwordData);
};

// 获取用户统计信息
export const getUserStats = (id) => {
  return api.get(`/api/users/${id}/stats`);
};

// 获取用户订单列表
export const getUserOrders = (userId, params = {}) => {
  return api.get(`/api/orders/user/${userId}`, { params });
};

// 获取用户活动列表
export const getUserActivities = (userId, params = {}) => {
  return api.get(`/api/activities/user/${userId}`, { params });
};

// 用户退出登录
export const logout = () => {
  return api.post('/api/users/logout');
};