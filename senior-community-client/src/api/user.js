import api from './index';

// 用户登录
export const login = (credentials) => {
  return api.post('/users/login', credentials);
};

// 用户注册
export const register = (userData) => {
  return api.post('/users/register', userData);
};

// 获取用户信息
export const getUserInfo = (id) => {
  return api.get(`/users/${id}`);
};

// 更新用户信息
export const updateUserInfo = (id, userData) => {
  return api.put(`/users/${id}`, userData);
};

// 修改密码
export const changePassword = (id, passwordData) => {
  return api.put(`/users/${id}/password`, passwordData);
};

// 获取用户统计信息
export const getUserStats = (id) => {
  return api.get(`/users/${id}/stats`);
};

// 用户退出登录
export const logout = () => {
  return api.post('/users/logout');
};