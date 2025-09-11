import api from './index';

// 获取活动类型
export const getActivityTypes = () => {
  return api.get('/api/activities/types');
};

// 获取活动列表
export const getActivities = (params = {}) => {
  return api.get('/api/activities', { params });
};

// 根据类型获取活动
export const getActivitiesByType = (typeId) => {
  return api.get('/api/activities', { params: { typeId } });
};

// 获取活动详情
export const getActivityById = (id) => {
  return api.get(`/api/activities/${id}`);
};

// 参与活动
export const joinActivity = (activityId, userId) => {
  return api.post(`/api/activities/${activityId}/participate`, null, { params: { userId } });
};

// 取消参与活动
export const leaveActivity = (activityId, userId) => {
  return api.delete(`/api/activities/${activityId}/participate`, { params: { userId } });
};

// 获取用户参与的活动
export const getUserActivities = (userId, params = {}) => {
  return api.get(`/api/activities/user/${userId}`, { params });
};

// 获取活动参与者列表
export const getActivityParticipants = (activityId) => {
  return api.get(`/api/activities/${activityId}/participants`);
};