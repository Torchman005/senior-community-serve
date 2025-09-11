import api from './index';

// 获取服务分类
export const getServiceCategories = () => {
  return api.get('/api/services/categories');
};

// 获取服务列表
export const getServices = (params = {}) => {
  return api.get('/api/services', { params });
};

// 根据分类获取服务
export const getServicesByCategory = (categoryId) => {
  return api.get('/api/services', { params: { categoryId } });
};

// 获取服务详情
export const getServiceById = (id) => {
  return api.get(`/api/services/${id}`);
};

// 创建服务订单
export const createServiceOrder = (orderData) => {
  return api.post('/api/orders', orderData);
};

// 获取用户订单列表
export const getUserOrders = (userId, params = {}) => {
  return api.get(`/api/orders/user/${userId}`, { params });
};

// 获取订单详情
export const getOrderById = (id) => {
  return api.get(`/api/orders/${id}`);
};

// 更新订单状态
export const updateOrderStatus = (id, status) => {
  return api.put(`/api/orders/${id}/status`, { status });
};

// 取消订单
export const cancelOrder = (id) => {
  return api.put(`/api/orders/${id}/cancel`);
};