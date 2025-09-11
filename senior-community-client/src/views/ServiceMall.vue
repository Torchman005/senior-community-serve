<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getServiceCategories, getServicesByCategory, createServiceOrder } from '@/api/service';

// 服务分类数据
const serviceCategories = ref([]);
const loading = ref(false);

// 当前选中的分类
const activeCategory = ref(null);

// 选择分类
const selectCategory = async (category) => {
  activeCategory.value = category;
  await loadServicesByCategory(category.id);
};

// 服务详情对话框
const serviceDetailVisible = ref(false);
const currentService = ref(null);

// 打开服务详情
const openServiceDetail = (service) => {
  currentService.value = service;
  serviceDetailVisible.value = true;
};

// 关闭服务详情
const closeServiceDetail = () => {
  serviceDetailVisible.value = false;
};

// 下单表单
const orderForm = reactive({
  name: '',
  phone: '',
  address: '',
  serviceDate: '',
  serviceTime: '',
  description: '',
  emergencyContact: ''
});

// 下单对话框
const orderDialogVisible = ref(false);

// 打开下单对话框
const openOrderDialog = () => {
  orderDialogVisible.value = true;
};

// 关闭下单对话框
const closeOrderDialog = () => {
  orderDialogVisible.value = false;
};

// 提交订单
const submitOrder = async () => {
  try {
    loading.value = true;
    const orderData = {
      serviceId: currentService.value.id,
      userId: 1, // 这里应该从用户状态中获取
      ...orderForm
    };
    
    await createServiceOrder(orderData);
    ElMessage.success('订单提交成功！服务人员将尽快与您联系');
    orderDialogVisible.value = false;
    serviceDetailVisible.value = false;
    
    // 重置表单
    Object.keys(orderForm).forEach(key => {
      orderForm[key] = '';
    });
  } catch (error) {
    console.error('提交订单失败:', error);
    ElMessage.error('订单提交失败，请稍后重试');
  } finally {
    loading.value = false;
  }
};

// 加载服务分类
const loadServiceCategories = async () => {
  try {
    loading.value = true;
    const response = await getServiceCategories();
    serviceCategories.value = response.data || [];
    if (serviceCategories.value.length > 0) {
      activeCategory.value = serviceCategories.value[0];
      await loadServicesByCategory(activeCategory.value.id);
    }
  } catch (error) {
    console.error('加载服务分类失败:', error);
    ElMessage.error('加载服务分类失败');
  } finally {
    loading.value = false;
  }
};

// 根据分类加载服务
const loadServicesByCategory = async (categoryId) => {
  try {
    const response = await getServicesByCategory(categoryId);
    const services = response.data || [];
    
    // 更新当前分类的服务列表
    const category = serviceCategories.value.find(cat => cat.id === categoryId);
    if (category) {
      category.services = services;
    }
  } catch (error) {
    console.error('加载服务列表失败:', error);
    ElMessage.error('加载服务列表失败');
  }
};

// 组件挂载时加载数据
onMounted(() => {
  loadServiceCategories();
});

// 语音输入功能（模拟）
const isRecording = ref(false);
const recordedText = ref('');

// 开始语音输入
const startVoiceInput = () => {
  isRecording.value = true;
  // 模拟语音识别过程
  setTimeout(() => {
    recordedText.value = '我需要一位护工帮助我洗澡，明天下午2点';
    isRecording.value = false;
    // 自动填充表单
    orderForm.description = recordedText.value;
    orderForm.serviceDate = '2023-12-15';
    orderForm.serviceTime = '14:00';
  }, 2000);
};
</script>

<template>
  <div class="service-mall-container">
    <div class="service-mall-header">
      <h1>一站式服务商城</h1>
      <p>解决日常照护与维修痛点，打造可信赖的本地生活服务网络</p>
    </div>

    <!-- 服务搜索 -->
    <div class="service-search">
      <el-input
        placeholder="请输入您需要的服务，如：上门护理、水管维修等"
        prefix-icon="el-icon-search"
        clearable
      >
        <template #append>
          <el-button @click="startVoiceInput">
            <i class="el-icon-microphone"></i>
            语音输入
          </el-button>
        </template>
      </el-input>
      <div v-if="isRecording" class="recording-indicator">
        <span>正在录音...</span>
      </div>
      <div v-if="recordedText" class="recorded-text">
        <p>您说：{{ recordedText }}</p>
      </div>
    </div>

    <!-- 急速单通道 -->
    <div class="emergency-service">
      <el-alert
        title="紧急维修通道"
        type="warning"
        description="水管爆裂、电路故障等紧急情况，优先派单，30分钟内响应"
        show-icon
        :closable="false"
      >
        <template #default>
          <el-button type="danger" size="small" class="emergency-button">急速求助</el-button>
        </template>
      </el-alert>
    </div>

    <!-- 服务分类 -->
    <div class="service-categories">
      <el-tabs tab-position="left" @tab-click="(tab) => selectCategory(serviceCategories[tab.index])">
        <el-tab-pane v-for="category in serviceCategories" :key="category.id" :label="category.title">
          <div class="service-list">
            <div v-loading="loading" class="service-list-loading">
              <el-card
                v-for="service in category.services"
                :key="service.id"
                class="service-card"
                shadow="hover"
                @click="openServiceDetail(service)"
              >
                <div class="service-image">
                  <img :src="service.image || '#3498db'" :alt="service.title || service.name">
                </div>
                <div class="service-info">
                  <h3>{{ service.title || service.name }}</h3>
                  <p class="service-price">{{ service.price }}元起</p>
                  <p class="service-description">{{ service.description }}</p>
                  <el-button type="primary" size="small">查看详情</el-button>
                </div>
              </el-card>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 服务流程 -->
    <div class="service-process">
      <h2>服务流程</h2>
      <el-steps :active="1" finish-status="success" simple>
        <el-step title="下单" description="描述需求，选择服务"></el-step>
        <el-step title="匹配" description="系统智能匹配服务人员"></el-step>
        <el-step title="确认" description="确认订单详情和价格"></el-step>
        <el-step title="履约" description="服务完成后支付和评价"></el-step>
      </el-steps>
    </div>

    <!-- 安全保障 -->
    <div class="service-guarantee">
      <h2>安全保障</h2>
      <div class="guarantee-items">
        <div class="guarantee-item">
          <el-icon><Lock /></el-icon>
          <h3>服务人员实名认证</h3>
          <p>所有服务人员均经过严格背景调查和专业培训</p>
        </div>
        <div class="guarantee-item">
          <el-icon><Camera /></el-icon>
          <h3>服务过程全记录</h3>
          <p>服务过程要求上传现场照片，保障服务质量</p>
        </div>
        <div class="guarantee-item">
          <el-icon><Bell /></el-icon>
          <h3>关怀提醒</h3>
          <p>为独居老人设置"关怀提醒"，服务结束后自动通知紧急联系人</p>
        </div>
        <div class="guarantee-item">
          <el-icon><Service /></el-icon>
          <h3>7×24小时客服</h3>
          <p>专业客服团队全天候为您解决问题</p>
        </div>
      </div>
    </div>

    <!-- 服务详情对话框 -->
    <el-dialog
      v-model="serviceDetailVisible"
      :title="currentService?.name"
      width="50%"
      @close="closeServiceDetail"
    >
      <div v-if="currentService" class="service-detail">
        <div class="service-detail-image">
          <img :src="currentService.image" :alt="currentService.name">
        </div>
        <div class="service-detail-info">
          <h3>{{ currentService.name }}</h3>
          <p class="service-price">价格：{{ currentService.price }}</p>
          <div class="service-description">
            <h4>服务说明</h4>
            <p>本服务由专业人员提供，确保服务质量和安全。服务时长根据实际情况可能有所调整，最终以实际服务时间计费。</p>
          </div>
          <div class="service-provider">
            <h4>服务提供者</h4>
            <div class="provider-list">
              <div class="provider-item">
                <img src="https://source.unsplash.com/random/100x100/?portrait" alt="服务人员">
                <div class="provider-info">
                  <h5>张师傅</h5>
                  <el-rate :model-value="4.5" disabled text-color="#ff9900"></el-rate>
                  <p>5年经验 | 已服务352次</p>
                </div>
              </div>
              <div class="provider-item">
                <img src="https://source.unsplash.com/random/100x100/?portrait,woman" alt="服务人员">
                <div class="provider-info">
                  <h5>李阿姨</h5>
                  <el-rate :model-value="5" disabled text-color="#ff9900"></el-rate>
                  <p>8年经验 | 已服务521次</p>
                </div>
              </div>
            </div>
          </div>
          <div class="service-actions">
            <el-button type="primary" @click="openOrderDialog">立即预约</el-button>
            <el-button>加入收藏</el-button>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 下单对话框 -->
    <el-dialog
      v-model="orderDialogVisible"
      title="服务预约"
      width="50%"
      @close="closeOrderDialog"
    >
      <el-form :model="orderForm" label-width="100px">
        <el-form-item label="联系人姓名" required>
          <el-input v-model="orderForm.name" placeholder="请输入联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" required>
          <el-input v-model="orderForm.phone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="服务地址" required>
          <el-input v-model="orderForm.address" placeholder="请输入详细服务地址"></el-input>
        </el-form-item>
        <el-form-item label="服务日期" required>
          <el-date-picker
            v-model="orderForm.serviceDate"
            type="date"
            placeholder="选择服务日期"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="服务时间" required>
          <el-time-picker
            v-model="orderForm.serviceTime"
            placeholder="选择服务时间"
            style="width: 100%"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="服务需求描述">
          <el-input
            v-model="orderForm.description"
            type="textarea"
            rows="4"
            placeholder="请详细描述您的服务需求，以便我们更好地为您服务"
          ></el-input>
          <div class="voice-input">
            <el-button size="small" @click="startVoiceInput">
              <i class="el-icon-microphone"></i>
              语音输入
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="紧急联系人">
          <el-input v-model="orderForm.emergencyContact" placeholder="请输入紧急联系人姓名和电话"></el-input>
          <div class="tip">独居老人建议填写，服务结束后系统将自动通知</div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeOrderDialog">取消</el-button>
          <el-button type="primary" @click="submitOrder">提交订单</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.service-mall-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.service-mall-header {
  text-align: center;
  margin-bottom: 30px;
}

.service-mall-header h1 {
  font-size: 2rem;
  color: #303133;
  margin-bottom: 10px;
}

.service-mall-header p {
  color: #606266;
  font-size: 1.1rem;
}

.service-search {
  margin-bottom: 20px;
}

.recording-indicator {
  margin-top: 10px;
  color: #f56c6c;
  animation: blink 1s infinite;
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.recorded-text {
  margin-top: 10px;
  padding: 10px;
  background-color: #f2f6fc;
  border-radius: 4px;
}

.emergency-service {
  margin-bottom: 20px;
}

.emergency-button {
  margin-left: 20px;
}

.service-categories {
  margin-bottom: 40px;
}

.service-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.service-card {
  cursor: pointer;
  transition: transform 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-image {
  height: 150px;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 10px;
}

.service-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.service-info {
  text-align: center;
}

.service-info h3 {
  margin: 10px 0;
  font-size: 1.1rem;
}

.service-price {
  color: #f56c6c;
  font-weight: bold;
  margin-bottom: 10px;
}

.service-process {
  margin-bottom: 40px;
}

.service-process h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #303133;
}

.service-guarantee {
  margin-bottom: 40px;
}

.service-guarantee h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #303133;
}

.guarantee-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.guarantee-item {
  text-align: center;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.guarantee-item i {
  font-size: 2rem;
  color: #409EFF;
  margin-bottom: 15px;
}

.guarantee-item h3 {
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #303133;
}

.guarantee-item p {
  color: #606266;
}

.service-detail {
  display: flex;
  gap: 20px;
}

.service-detail-image {
  flex: 1;
  max-width: 300px;
}

.service-detail-image img {
  width: 100%;
  border-radius: 8px;
}

.service-detail-info {
  flex: 2;
}

.service-description,
.service-provider {
  margin-top: 20px;
}

.provider-list {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.provider-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.provider-item img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.service-actions {
  margin-top: 20px;
}

.voice-input {
  margin-top: 10px;
}

.tip {
  font-size: 0.8rem;
  color: #909399;
  margin-top: 5px;
}
</style>