<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { updateUserInfo, getUserOrders, getUserActivities } from '@/api/user';
import { getUserOrders as getServiceOrders } from '@/api/service';
import { getUserActivities as getActivityList } from '@/api/activity';
import { useUserStore } from '@/stores/user';

// 用户状态管理
const userStore = useUserStore();
const loading = ref(false);

// 标签页激活名称
const activeName = ref('orders');

// 订单数据
const orders = ref([]);

// 活动数据
const activities = ref([]);

// 收藏数据
const favorites = ref([]);

// 通知设置
const notificationSettings = reactive({
  serviceReminder: true,
  activityReminder: true,
  emergencyContactNotification: true
});

// 编辑个人信息对话框
const editProfileVisible = ref(false);

// 个人信息表单
const profileForm = reactive({
  name: '',
  age: 0,
  phone: '',
  address: '',
  emergencyContact: ''
});

// 打开编辑个人信息对话框
const openEditProfile = () => {
  Object.assign(profileForm, userStore.userInfo);
  editProfileVisible.value = true;
};

// 关闭编辑个人信息对话框
const closeEditProfile = () => {
  editProfileVisible.value = false;
};

// 提交个人信息
const submitProfile = async () => {
  try {
    loading.value = true;
    await updateUserInfo(userStore.userInfo.id, profileForm);
    userStore.updateUserInfo(profileForm);
    ElMessage.success('个人信息更新成功！');
    editProfileVisible.value = false;
  } catch (error) {
    console.error('更新个人信息失败:', error);
    ElMessage.error('更新个人信息失败，请稍后重试');
  } finally {
    loading.value = false;
  }
};

// 加载用户信息（从store获取）
const loadUserInfo = () => {
  // 用户信息已经在store中，无需重新加载
  // 如果需要刷新，可以调用API更新store
};

// 加载用户订单
const loadUserOrders = async () => {
  try {
    const response = await getServiceOrders(userStore.userInfo.id);
    orders.value = response.data || [];
  } catch (error) {
    console.error('加载订单列表失败:', error);
    ElMessage.error('加载订单列表失败');
  }
};

// 加载用户活动
const loadUserActivities = async () => {
  try {
    const response = await getActivityList(userStore.userInfo.id);
    activities.value = response.data || [];
  } catch (error) {
    console.error('加载活动列表失败:', error);
    ElMessage.error('加载活动列表失败');
  }
};

// 处理图片加载错误
const handleImageError = (event) => {
  event.target.src = '/favicon.ico';
};

// 检查用户登录状态
const checkUserLogin = () => {
  if (!userStore.isLoggedIn || !userStore.userInfo.id) {
    ElMessage.warning('请先登录');
    // 可以跳转到登录页面
    // router.push('/login');
    return false;
  }
  return true;
};

// 组件挂载时加载数据
onMounted(() => {
  // 检查登录状态
  if (!checkUserLogin()) {
    return;
  }
  
  // 如果用户信息为空，尝试从localStorage恢复
  if (!userStore.userInfo.name) {
    userStore.restoreLoginState();
  }
  
  // 调试信息
  console.log('用户信息状态:', {
    isLoggedIn: userStore.isLoggedIn,
    userInfo: userStore.userInfo,
    token: userStore.token
  });
  
  loadUserInfo();
  loadUserOrders();
  loadUserActivities();
});

// 订单详情对话框
const orderDetailVisible = ref(false);
const currentOrder = ref(null);

// 打开订单详情
const openOrderDetail = (order) => {
  currentOrder.value = order;
  orderDetailVisible.value = true;
};

// 关闭订单详情
const closeOrderDetail = () => {
  orderDetailVisible.value = false;
};

// 提交评价
const submitRating = () => {
  ElMessage.success('评价提交成功！');
  orderDetailVisible.value = false;
};

// 取消订单
const cancelOrder = () => {
  ElMessageBox.confirm('确定要取消该订单吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 这里应该有取消订单的逻辑
    // 模拟取消成功
    currentOrder.value.status = 'cancelled';
    ElMessage.success('订单已取消');
    orderDetailVisible.value = false;
  }).catch(() => {
    // 取消操作
  });
};

// 移除收藏
const removeFavorite = (index) => {
  ElMessageBox.confirm('确定要移除该收藏吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    favorites.value.splice(index, 1);
    ElMessage.success('已从收藏中移除');
  }).catch(() => {
    // 取消操作
  });
};

// 测试函数：清除localStorage
const clearLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
  ElMessage.success('localStorage已清除，请刷新页面查看效果');
};

// 测试函数：重新恢复登录状态
const restoreLoginState = () => {
  userStore.restoreLoginState();
  ElMessage.success('已重新恢复登录状态');
};
</script>

<template>
  <div class="user-container">
    <div class="user-header">
      <h1>个人中心</h1>
    </div>

    <!-- 调试信息卡片 -->
    <el-card class="debug-info-card" style="margin-bottom: 20px; background-color: #f0f9ff; border: 1px solid #0ea5e9;">
      <h3>调试信息</h3>
      <p>登录状态: {{ userStore.isLoggedIn ? '已登录' : '未登录' }}</p>
      <p>用户ID: {{ userStore.userInfo.id || '无' }}</p>
      <p>Token: {{ userStore.token ? '已设置' : '未设置' }}</p>
      <p>用户信息: {{ JSON.stringify(userStore.userInfo, null, 2) }}</p>
      <div style="margin-top: 10px;">
        <el-button size="small" type="warning" @click="clearLocalStorage">清除localStorage(测试)</el-button>
        <el-button size="small" type="info" @click="restoreLoginState">重新恢复登录状态</el-button>
      </div>
    </el-card>

    <!-- 个人信息卡片 -->
    <el-card class="user-profile-card">
      <div class="user-profile">
        <div class="user-avatar">
          <img :src="userStore.userInfo.avatar || '/favicon.ico'" alt="用户头像" @error="handleImageError">
        </div>
        <div class="user-info">
          <h2>{{ userStore.userInfo.name || '未设置姓名' }}</h2>
          <p><el-icon><User /></el-icon> {{ userStore.userInfo.age || '未设置' }}岁</p>
          <p><el-icon><Phone /></el-icon> {{ userStore.userInfo.phone || '未设置手机号' }}</p>
          <p><el-icon><Location /></el-icon> {{ userStore.userInfo.address || '未设置地址' }}</p>
          <p><el-icon><Bell /></el-icon> 紧急联系人：{{ userStore.userInfo.emergencyContact || '未设置' }}</p>
        </div>
        <div class="user-actions">
          <el-button type="primary" @click="openEditProfile">编辑资料</el-button>
        </div>
      </div>
    </el-card>

    <!-- 标签页 -->
    <div class="user-tabs">
      <el-tabs v-model="activeName">
        <!-- 我的订单 -->
        <el-tab-pane label="我的订单" name="orders">
          <div class="orders-list">
            <el-empty v-if="orders.length === 0" description="暂无订单记录"></el-empty>
            <el-card
              v-for="order in orders"
              :key="order.id"
              class="order-card"
              shadow="hover"
              @click="openOrderDetail(order)"
            >
              <div class="order-header">
                <span class="order-title">{{ order.title }}</span>
                <el-tag
                  :type="order.status === 'completed' ? 'success' : order.status === 'upcoming' ? 'primary' : 'info'"
                  size="small"
                >
                  {{ order.status === 'completed' ? '已完成' : order.status === 'upcoming' ? '待服务' : '已取消' }}
                </el-tag>
              </div>
              <div class="order-content">
                <p><el-icon><Calendar /></el-icon> {{ order.date }} {{ order.time }}</p>
                <p><el-icon><User /></el-icon> 服务人员：{{ order.provider }}</p>
                <p><el-icon><Money /></el-icon> 价格：{{ order.price }}</p>
                <div v-if="order.rating" class="order-rating">
                  <span>评分：</span>
                  <el-rate v-model="order.rating" disabled></el-rate>
                </div>
              </div>
              <div class="order-actions">
                <el-button size="small" type="primary">查看详情</el-button>
              </div>
            </el-card>
          </div>
        </el-tab-pane>

        <!-- 我的活动 -->
        <el-tab-pane label="我的活动" name="activities">
          <div class="activities-list">
            <el-empty v-if="activities.length === 0" description="暂无活动记录"></el-empty>
            <el-card
              v-for="activity in activities"
              :key="activity.id"
              class="activity-card"
              shadow="hover"
            >
              <div class="activity-header">
                <span class="activity-title">{{ activity.title }}</span>
                <el-tag
                  :type="activity.status === 'completed' ? 'success' : activity.status === 'upcoming' ? 'primary' : 'info'"
                  size="small"
                >
                  {{ activity.status === 'completed' ? '已结束' : activity.status === 'upcoming' ? '未开始' : '进行中' }}
                </el-tag>
              </div>
              <div class="activity-content">
                <p><el-icon><Calendar /></el-icon> {{ activity.date }} {{ activity.time }}</p>
                <p><el-icon><Monitor /></el-icon> 活动类型：{{ activity.type === 'online' ? '线上活动' : '线下活动' }}</p>
                <p v-if="activity.location"><el-icon><Location /></el-icon> 活动地点：{{ activity.location }}</p>
              </div>
              <div class="activity-actions">
                <el-button size="small" type="primary">查看详情</el-button>
                <el-button v-if="activity.status === 'upcoming'" size="small" type="danger">取消报名</el-button>
              </div>
            </el-card>
          </div>
        </el-tab-pane>

        <!-- 我的收藏 -->
        <el-tab-pane label="我的收藏" name="favorites">
          <div class="favorites-list">
            <el-empty v-if="favorites.length === 0" description="暂无收藏内容"></el-empty>
            <el-card
              v-for="(favorite, index) in favorites"
              :key="favorite.id"
              class="favorite-card"
              shadow="hover"
            >
              <div class="favorite-image">
                <img :src="favorite.image" :alt="favorite.title">
                <div class="favorite-type">
                  {{ favorite.type === 'service' ? '服务' : favorite.type === 'activity' ? '活动' : '作品' }}
                </div>
              </div>
              <div class="favorite-content">
                <h3>{{ favorite.title }}</h3>
                <p v-if="favorite.price" class="favorite-price">{{ favorite.price }}</p>
                <p v-if="favorite.author" class="favorite-author">创作者：{{ favorite.author }}</p>
                <p v-if="favorite.date" class="favorite-date">日期：{{ favorite.date }}</p>
              </div>
              <div class="favorite-actions">
                <el-button size="small" type="primary">查看详情</el-button>
                <el-button size="small" type="danger" @click.stop="removeFavorite(index)">取消收藏</el-button>
              </div>
            </el-card>
          </div>
        </el-tab-pane>

        <!-- 账户设置 -->
        <el-tab-pane label="账户设置" name="settings">
          <div class="settings-container">
            <el-card class="settings-card">
              <template #header>
                <div class="settings-header">
                  <h3>安全设置</h3>
                </div>
              </template>
              <div class="settings-item">
                <div class="settings-item-info">
                  <h4>登录密码</h4>
                  <p>定期修改密码可以保护账号安全</p>
                </div>
                <el-button>修改</el-button>
              </div>
              <div class="settings-item">
                <div class="settings-item-info">
                  <h4>手机绑定</h4>
                  <p>已绑定：{{ userStore.userInfo.phone }}</p>
                </div>
                <el-button>修改</el-button>
              </div>
            </el-card>

            <el-card class="settings-card">
              <template #header>
                <div class="settings-header">
                  <h3>通知设置</h3>
                </div>
              </template>
              <div class="settings-item">
                <div class="settings-item-info">
                  <h4>服务提醒</h4>
                  <p>服务开始前的提醒通知</p>
                </div>
                <el-switch v-model="notificationSettings.serviceReminder"></el-switch>
              </div>
              <div class="settings-item">
                <div class="settings-item-info">
                  <h4>活动提醒</h4>
                  <p>活动开始前的提醒通知</p>
                </div>
                <el-switch v-model="notificationSettings.activityReminder"></el-switch>
              </div>
              <div class="settings-item">
                <div class="settings-item-info">
                  <h4>紧急联系人通知</h4>
                  <p>服务完成后通知紧急联系人</p>
                </div>
                <el-switch v-model="notificationSettings.emergencyContactNotification"></el-switch>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 编辑个人信息对话框 -->
    <el-dialog
      v-model="editProfileVisible"
      title="编辑个人信息"
      width="50%"
      @close="closeEditProfile"
    >
      <el-form :model="profileForm" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="profileForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="profileForm.age" type="number"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="profileForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="居住地址">
          <el-input v-model="profileForm.address"></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人">
          <el-input v-model="profileForm.emergencyContact"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeEditProfile">取消</el-button>
          <el-button type="primary" @click="submitProfile">保存</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 订单详情对话框 -->
    <el-dialog
      v-model="orderDetailVisible"
      title="订单详情"
      width="60%"
      @close="closeOrderDetail"
    >
      <div v-if="currentOrder" class="order-detail">
        <div class="order-detail-header">
          <h2>{{ currentOrder.title }}</h2>
          <el-tag
            :type="currentOrder.status === 'completed' ? 'success' : currentOrder.status === 'upcoming' ? 'primary' : 'info'"
          >
            {{ currentOrder.status === 'completed' ? '已完成' : currentOrder.status === 'upcoming' ? '待服务' : '已取消' }}
          </el-tag>
        </div>

        <div class="order-detail-info">
          <div class="info-item">
            <span class="info-label">订单编号：</span>
            <span>{{ currentOrder.id }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">服务时间：</span>
            <span>{{ currentOrder.date }} {{ currentOrder.time }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">服务人员：</span>
            <span>{{ currentOrder.provider }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">服务价格：</span>
            <span>{{ currentOrder.price }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">服务地址：</span>
            <span>{{ userStore.userInfo.address }}</span>
          </div>
        </div>

        <div v-if="currentOrder.status === 'completed'" class="order-rating-section">
          <h3>服务评价</h3>
          <div v-if="currentOrder.rating" class="rating-display">
            <div class="rating-stars">
              <span>评分：</span>
              <el-rate v-model="currentOrder.rating" disabled></el-rate>
            </div>
            <div class="rating-comment">
              <span>评价内容：</span>
              <p>{{ currentOrder.comment }}</p>
            </div>
          </div>
          <div v-else class="rating-form">
            <div class="rating-stars">
              <span>评分：</span>
              <el-rate v-model="currentOrder.rating"></el-rate>
            </div>
            <div class="rating-comment">
              <span>评价内容：</span>
              <el-input
                v-model="currentOrder.comment"
                type="textarea"
                rows="3"
                placeholder="请输入您对本次服务的评价"
              ></el-input>
            </div>
            <div class="rating-actions">
              <el-button type="primary" @click="submitRating">提交评价</el-button>
            </div>
          </div>
        </div>

        <div class="order-detail-actions">
          <el-button v-if="currentOrder.status === 'upcoming'" type="danger" @click="cancelOrder">取消订单</el-button>
          <el-button v-if="currentOrder.status === 'upcoming'" type="primary">联系服务人员</el-button>
          <el-button v-if="currentOrder.status === 'completed'" type="primary">再次预约</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.user-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.user-header {
  text-align: center;
  margin-bottom: 30px;
}

.user-header h1 {
  font-size: 2rem;
  color: #303133;
}

.user-profile-card {
  margin-bottom: 30px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 30px;
}

.user-avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #409EFF;
}

.user-info {
  flex: 1;
}

.user-info h2 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #303133;
}

.user-info p {
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 5px;
  color: #606266;
}

.user-tabs {
  margin-top: 20px;
}

.orders-list,
.activities-list,
.favorites-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.order-card,
.activity-card,
.favorite-card {
  cursor: pointer;
}

.order-header,
.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.order-title,
.activity-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #303133;
}

.order-content,
.activity-content {
  margin-bottom: 15px;
}

.order-content p,
.activity-content p {
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 5px;
  color: #606266;
}

.order-rating {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
}

.order-actions,
.activity-actions,
.favorite-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.favorite-card {
  display: flex;
  flex-direction: column;
}

.favorite-image {
  position: relative;
  height: 150px;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 10px;
}

.favorite-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-type {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
}

.favorite-content {
  flex: 1;
  padding: 10px 0;
}

.favorite-content h3 {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  color: #303133;
}

.favorite-price {
  color: #f56c6c;
  font-weight: bold;
  margin-bottom: 5px;
}

.favorite-author,
.favorite-date {
  color: #606266;
  margin: 5px 0;
}

.settings-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.settings-card {
  margin-bottom: 20px;
}

.settings-header h3 {
  margin: 0;
  color: #303133;
}

.settings-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #ebeef5;
}

.settings-item:last-child {
  border-bottom: none;
}

.settings-item-info h4 {
  margin: 0 0 5px 0;
  color: #303133;
}

.settings-item-info p {
  margin: 0;
  color: #606266;
  font-size: 0.9rem;
}

.order-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.order-detail-header h2 {
  margin: 0;
  color: #303133;
}

.order-detail-info {
  background-color: #f5f7fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 10px;
  display: flex;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  font-weight: bold;
  width: 100px;
  color: #303133;
}

.order-rating-section {
  margin-bottom: 20px;
}

.order-rating-section h3 {
  margin-bottom: 15px;
  color: #303133;
}

.rating-display,
.rating-form {
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.rating-stars {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.rating-comment {
  margin-bottom: 15px;
}

.rating-comment span {
  display: block;
  margin-bottom: 5px;
  color: #303133;
}

.rating-comment p {
  margin: 0;
  color: #606266;
}

.rating-actions {
  display: flex;
  justify-content: flex-end;
}

.order-detail-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>