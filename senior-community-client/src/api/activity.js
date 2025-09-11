import api from './index';

// 获取活动类型
export const getActivityTypes = () => {
  return api.get('/activities/types');
};

// 获取活动列表
export const getActivities = (params = {}) => {
  return api.get('/activities', { params });
};

// 根据类型获取活动
export const getActivitiesByType = (typeId) => {
  return api.get(`/activities/type/${typeId}`);
};

// 获取活动详情
export const getActivityById = (id) => {
  return api.get(`/activities/${id}`);
};

// 参与活动
export const joinActivity = (activityId, userId) => {
  return api.post(`/activities/${activityId}/join`, { userId });
};

// 取消参与活动
export const leaveActivity = (activityId, userId) => {
  return api.post(`/activities/${activityId}/leave`, { userId });
};

// 获取用户参与的活动
export const getUserActivities = (userId, params = {}) => {
  return api.get(`/activities/user/${userId}`, { params });
};

// 获取活动参与者列表
export const getActivityParticipants = (activityId) => {
  return api.get(`/activities/${activityId}/participants`);
};