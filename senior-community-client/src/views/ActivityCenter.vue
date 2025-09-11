<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getActivityTypes, getActivitiesByType, joinActivity, leaveActivity } from '@/api/activity';

// 活动类型
const activityTypes = ref([]);
const loading = ref(false);

// 当前选中的活动类型
const activeType = ref(null);

// 选择活动类型
const selectActivityType = async (type) => {
  activeType.value = type;
  await loadActivitiesByType(type.id);
};

// 活动数据
const activities = ref([]);

// 加载活动类型
const loadActivityTypes = async () => {
  try {
    loading.value = true;
    const response = await getActivityTypes();
    activityTypes.value = response.data || [];
    if (activityTypes.value.length > 0) {
      activeType.value = activityTypes.value[0];
      await loadActivitiesByType(activeType.value.id);
    }
  } catch (error) {
    console.error('加载活动类型失败:', error);
    ElMessage.error('加载活动类型失败');
  } finally {
    loading.value = false;
  }
};

// 根据类型加载活动
const loadActivitiesByType = async (typeId) => {
  try {
    const response = await getActivitiesByType(typeId);
    activities.value = response.data || [];
  } catch (error) {
    console.error('加载活动列表失败:', error);
    ElMessage.error('加载活动列表失败');
  }
};

// 参与活动
const handleJoinActivity = async (activity) => {
  try {
    const userId = 1; // 这里应该从用户状态中获取
    await joinActivity(activity.id, userId);
    ElMessage.success('参与活动成功！');
    // 更新活动参与人数
    activity.participants = (activity.participants || 0) + 1;
  } catch (error) {
    console.error('参与活动失败:', error);
    ElMessage.error('参与活动失败，请稍后重试');
  }
};

// 取消参与活动
const handleLeaveActivity = async (activity) => {
  try {
    const userId = 1; // 这里应该从用户状态中获取
    await leaveActivity(activity.id, userId);
    ElMessage.success('已取消参与活动');
    // 更新活动参与人数
    activity.participants = Math.max((activity.participants || 0) - 1, 0);
  } catch (error) {
    console.error('取消参与活动失败:', error);
    ElMessage.error('取消参与活动失败，请稍后重试');
  }
};

// 获取活动描述
const getActivityDescription = () => {
  if (!activeType.value) return '';
  
  const descriptions = {
    1: '足不出户，参与丰富多彩的线上活动，学习新技能，结交新朋友',
    2: '走出家门，参与社区线下活动，感受面对面交流的乐趣',
    3: '展示老年人的才艺作品，接受预订或义卖，实现社会价值'
  };
  
  return descriptions[activeType.value.id] || '丰富多彩的活动等您参与';
};

// 组件挂载时加载数据
onMounted(() => {
  loadActivityTypes();
});

// 创意工坊数据
const creativeWorks = ref([
  {
    id: 301,
    title: '山水画作品集',
    author: '张大爷',
    age: 75,
    image: '#34495e',
    description: '退休教师张大爷创作的山水画作品，融合传统与现代风格，笔墨淋漓，意境深远。',
    price: '500元起',
    likes: 128
  },
  {
    id: 302,
    title: '手工编织包',
    author: '王奶奶',
    age: 68,
    image: '#16a085',
    description: '王奶奶用可回收材料手工编织的环保购物袋，美观实用，每个都是独一无二的作品。',
    price: '80元起',
    likes: 95
  },
  {
    id: 303,
    title: '老北京记忆摄影集',
    author: '李爷爷',
    age: 82,
    image: '#c0392b',
    description: '退休摄影师李爷爷数十年来拍摄的老北京风貌，记录了城市的变迁和历史的痕迹。',
    price: '300元起',
    likes: 156
  },
  {
    id: 304,
    title: '古诗词书法作品',
    author: '赵老师',
    age: 70,
    image: '#7f8c8d',
    description: '退休语文教师赵老师书写的古诗词作品，字体遒劲有力，意境优美，适合装饰和收藏。',
    price: '200元起',
    likes: 112
  }
]);

// 活动详情对话框
const activityDetailVisible = ref(false);
const currentActivity = ref(null);

// 打开活动详情
const openActivityDetail = (activity) => {
  currentActivity.value = activity;
  activityDetailVisible.value = true;
};

// 关闭活动详情
const closeActivityDetail = () => {
  activityDetailVisible.value = false;
};

// 作品详情对话框
const workDetailVisible = ref(false);
const currentWork = ref(null);

// 打开作品详情
const openWorkDetail = (work) => {
  currentWork.value = work;
  workDetailVisible.value = true;
};

// 关闭作品详情
const closeWorkDetail = () => {
  workDetailVisible.value = false;
};

// 报名表单
const registrationForm = reactive({
  name: '',
  phone: '',
  age: '',
  interests: [],
  remarks: ''
});

// 报名对话框
const registrationDialogVisible = ref(false);

// 打开报名对话框
const openRegistrationDialog = () => {
  registrationDialogVisible.value = true;
};

// 关闭报名对话框
const closeRegistrationDialog = () => {
  registrationDialogVisible.value = false;
};

// 提交报名
const submitRegistration = () => {
  // 这里应该有表单验证和提交逻辑
  // 模拟提交成功
  ElMessage.success('报名成功！请留意活动开始提醒');
  registrationDialogVisible.value = false;
  activityDetailVisible.value = false;
};

// 点赞作品
const likeWork = (work) => {
  work.likes++;
  ElMessage.success('点赞成功！');
};

// 预订作品
const orderWork = () => {
  ElMessage.success('预订成功！创作者将尽快与您联系');
  workDetailVisible.value = false;
};

// 发布活动对话框
const publishDialogVisible = ref(false);

// 打开发布活动对话框
const openPublishDialog = () => {
  publishDialogVisible.value = true;
};

// 关闭发布活动对话框
const closePublishDialog = () => {
  publishDialogVisible.value = false;
};

// 活动发布表单
const publishForm = reactive({
  title: '',
  type: '',
  date: '',
  time: '',
  location: '',
  address: '',
  description: '',
  image: null
});

// 提交活动发布
const submitPublish = () => {
  // 这里应该有表单验证和提交逻辑
  // 模拟提交成功
  ElMessage.success('活动发布成功！等待审核');
  publishDialogVisible.value = false;
};
</script>

<template>
  <div class="activity-center-container">
    <div class="activity-center-header">
      <h1>动态活动中心</h1>
      <p>丰富多彩的线上线下活动，展示才艺，结交朋友，实现社会价值</p>
      <el-button type="primary" @click="openPublishDialog">发布活动</el-button>
    </div>

    <!-- 活动类型选择 -->
    <div class="activity-types">
      <el-radio-group v-model="activeType" @change="selectActivityType">
        <el-radio-button v-for="type in activityTypes" :key="type.id" :label="type">
          <el-icon>
            <component :is="type.icon" />
          </el-icon>
          {{ type.name }}
        </el-radio-button>
      </el-radio-group>
    </div>

    <!-- 活动列表 -->
    <div class="activity-list" v-loading="loading">
      <h2>{{ activeType?.name || '活动列表' }}</h2>
      <p class="activity-description">{{ getActivityDescription() }}</p>
      
      <div class="activities-grid">
        <el-card
          v-for="activity in activities"
          :key="activity.id"
          class="activity-card"
          shadow="hover"
          @click="openActivityDetail(activity)"
        >
          <div class="activity-image">
            <img :src="activity.image" :alt="activity.title">
            <div class="activity-status" :class="activity.status">
              {{ activity.status === 'upcoming' ? '即将开始' : activity.status === 'ongoing' ? '进行中' : '已结束' }}
            </div>
          </div>
          <div class="activity-info">
            <h3>{{ activity.title }}</h3>
            <p class="activity-time">
              <el-icon><Calendar /></el-icon>
              {{ activity.date }} {{ activity.time }}
            </p>
            <p class="activity-host">
              <el-icon><User /></el-icon>
              主持人：{{ activity.host }}
            </p>
            <div class="activity-participants">
              <el-progress
                :percentage="Math.round(((activity.participants || 0) / (activity.maxParticipants || 1)) * 100)"
                :format="() => `${activity.participants || 0}/${activity.maxParticipants || 0}`"
                :stroke-width="10"
              ></el-progress>
            </div>
            <div class="activity-actions">
              <el-button type="primary" size="small">查看详情</el-button>
              <el-button 
                v-if="activity.status === 'upcoming'" 
                type="success" 
                size="small" 
                @click.stop="handleJoinActivity(activity)"
              >
                参与活动
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 创意工坊 -->
    <div v-if="activeType?.id === 3" class="activity-list">
      <h2>创意工坊</h2>
      <p class="activity-description">展示老年人的才艺作品，接受预订或义卖，实现社会价值</p>
      
      <div class="works-grid">
        <el-card
          v-for="work in creativeWorks"
          :key="work.id"
          class="work-card"
          shadow="hover"
          @click="openWorkDetail(work)"
        >
          <div class="work-image">
            <img :src="work.image" :alt="work.title">
          </div>
          <div class="work-info">
            <h3>{{ work.title }}</h3>
            <p class="work-author">
              <el-icon><User /></el-icon>
              {{ work.author }}，{{ work.age }}岁
            </p>
            <p class="work-price">{{ work.price }}</p>
            <div class="work-actions">
              <el-button type="text" @click.stop="likeWork(work)">
                <el-icon><Star /></el-icon>
                {{ work.likes }}
              </el-button>
              <el-button type="primary" size="small">查看详情</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 参与流程 -->
    <div class="participation-process">
      <h2>参与流程</h2>
      <el-steps :active="1" finish-status="success" simple>
        <el-step title="发布" description="社区、养老院或活跃老人发布活动"></el-step>
        <el-step title="发现" description="基于兴趣标签智能推荐活动"></el-step>
        <el-step title="报名" description="一键报名，自动生成门票或提醒"></el-step>
        <el-step title="互动" description="活动后发布照片评论，形成社区互动"></el-step>
      </el-steps>
    </div>

    <!-- 活动详情对话框 -->
    <el-dialog
      v-model="activityDetailVisible"
      :title="currentActivity?.title"
      width="60%"
      @close="closeActivityDetail"
    >
      <div v-if="currentActivity" class="activity-detail">
        <div class="activity-detail-image">
          <img :src="currentActivity.image" :alt="currentActivity.title">
        </div>
        <div class="activity-detail-info">
          <div class="activity-meta">
            <div class="meta-item">
              <el-icon><Calendar /></el-icon>
              <span>{{ currentActivity.date }} {{ currentActivity.time }}</span>
            </div>
            <div v-if="currentActivity.location" class="meta-item">
              <el-icon><Location /></el-icon>
              <span>{{ currentActivity.location }}</span>
            </div>
            <div v-if="currentActivity.address" class="meta-item">
              <el-icon><MapLocation /></el-icon>
              <span>{{ currentActivity.address }}</span>
            </div>
            <div v-if="currentActivity.host" class="meta-item">
              <el-icon><User /></el-icon>
              <span>主持人：{{ currentActivity.host }}</span>
            </div>
            <div class="meta-item">
              <el-icon><UserFilled /></el-icon>
              <span>参与人数：{{ currentActivity.participants }}/{{ currentActivity.maxParticipants }}</span>
            </div>
          </div>
          
          <div class="activity-description-detail">
            <h3>活动详情</h3>
            <p>{{ currentActivity.description }}</p>
          </div>
          
          <div class="activity-qrcode" v-if="activeType.id === 2">
            <h3>活动二维码</h3>
            <div class="qrcode-image">
              <!-- 这里应该是动态生成的二维码 -->
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ActivityID:123456" alt="活动二维码">
              <p>扫码签到或出示门票</p>
            </div>
          </div>
          
          <div class="activity-actions">
            <el-button type="primary" @click="openRegistrationDialog">立即报名</el-button>
            <el-button>分享活动</el-button>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 作品详情对话框 -->
    <el-dialog
      v-model="workDetailVisible"
      :title="currentWork?.title"
      width="60%"
      @close="closeWorkDetail"
    >
      <div v-if="currentWork" class="work-detail">
        <div class="work-detail-image">
          <img :src="currentWork.image" :alt="currentWork.title">
        </div>
        <div class="work-detail-info">
          <div class="work-meta">
            <div class="meta-item">
              <el-icon><User /></el-icon>
              <span>创作者：{{ currentWork.author }}，{{ currentWork.age }}岁</span>
            </div>
            <div class="meta-item">
              <el-icon><Goods /></el-icon>
              <span>价格：{{ currentWork.price }}</span>
            </div>
            <div class="meta-item">
              <el-icon><Star /></el-icon>
              <span>获赞：{{ currentWork.likes }}</span>
            </div>
          </div>
          
          <div class="work-description-detail">
            <h3>作品介绍</h3>
            <p>{{ currentWork.description }}</p>
          </div>
          
          <div class="creator-profile">
            <h3>创作者简介</h3>
            <div class="creator-info">
              <img src="https://source.unsplash.com/random/100x100/?elderly,portrait" alt="创作者头像">
              <div>
                <h4>{{ currentWork.author }}</h4>
                <p>{{ currentWork.age }}岁，退休教师，从事创作已有15年，作品曾在多个社区展览中展出。</p>
              </div>
            </div>
          </div>
          
          <div class="work-actions">
            <el-button type="primary" @click="orderWork">预订作品</el-button>
            <el-button @click.stop="likeWork(currentWork)">
              <el-icon><Star /></el-icon>
              点赞
            </el-button>
            <el-button>分享作品</el-button>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 报名对话框 -->
    <el-dialog
      v-model="registrationDialogVisible"
      title="活动报名"
      width="50%"
      @close="closeRegistrationDialog"
    >
      <el-form :model="registrationForm" label-width="100px">
        <el-form-item label="姓名" required>
          <el-input v-model="registrationForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" required>
          <el-input v-model="registrationForm.phone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="registrationForm.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="兴趣爱好">
          <el-select v-model="registrationForm.interests" multiple placeholder="请选择兴趣爱好">
            <el-option label="书法" value="calligraphy"></el-option>
            <el-option label="绘画" value="painting"></el-option>
            <el-option label="摄影" value="photography"></el-option>
            <el-option label="手工" value="crafts"></el-option>
            <el-option label="舞蹈" value="dancing"></el-option>
            <el-option label="棋牌" value="chess"></el-option>
            <el-option label="阅读" value="reading"></el-option>
            <el-option label="旅游" value="travel"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="registrationForm.remarks"
            type="textarea"
            rows="3"
            placeholder="请输入备注信息，如特殊需求等"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeRegistrationDialog">取消</el-button>
          <el-button type="primary" @click="submitRegistration">提交报名</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 发布活动对话框 -->
    <el-dialog
      v-model="publishDialogVisible"
      title="发布活动"
      width="60%"
      @close="closePublishDialog"
    >
      <el-form :model="publishForm" label-width="100px">
        <el-form-item label="活动标题" required>
          <el-input v-model="publishForm.title" placeholder="请输入活动标题"></el-input>
        </el-form-item>
        <el-form-item label="活动类型" required>
          <el-select v-model="publishForm.type" placeholder="请选择活动类型">
            <el-option label="线上活动" value="online"></el-option>
            <el-option label="线下活动" value="offline"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动日期" required>
          <el-date-picker
            v-model="publishForm.date"
            type="date"
            placeholder="选择活动日期"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-time-picker
            v-model="publishForm.time"
            placeholder="选择活动时间"
            style="width: 100%"
          ></el-time-picker>
        </el-form-item>
        <el-form-item v-if="publishForm.type === 'offline'" label="活动地点" required>
          <el-input v-model="publishForm.location" placeholder="请输入活动地点名称"></el-input>
        </el-form-item>
        <el-form-item v-if="publishForm.type === 'offline'" label="详细地址" required>
          <el-input v-model="publishForm.address" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="活动描述" required>
          <el-input
            v-model="publishForm.description"
            type="textarea"
            rows="4"
            placeholder="请详细描述活动内容、要求等信息"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动图片">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
          >
            <el-icon><Plus></Plus></el-icon>
          </el-upload>
          <div class="el-upload__tip">请上传活动宣传图片，建议尺寸800x600像素</div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closePublishDialog">取消</el-button>
          <el-button type="primary" @click="submitPublish">提交审核</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.activity-center-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.activity-center-header {
  text-align: center;
  margin-bottom: 30px;
}

.activity-center-header h1 {
  font-size: 2rem;
  color: #303133;
  margin-bottom: 10px;
}

.activity-center-header p {
  color: #606266;
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.activity-types {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.activity-list {
  margin-bottom: 40px;
}

.activity-list h2 {
  text-align: center;
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #303133;
}

.activity-description {
  text-align: center;
  color: #606266;
  margin-bottom: 20px;
}

.activities-grid,
.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.activity-card,
.work-card {
  cursor: pointer;
  transition: transform 0.3s;
}

.activity-card:hover,
.work-card:hover {
  transform: translateY(-5px);
}

.activity-image,
.work-image {
  position: relative;
  height: 180px;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 10px;
}

.activity-image img,
.work-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.activity-status {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
}

.activity-status.upcoming {
  background-color: #409EFF;
}

.activity-status.ongoing {
  background-color: #67C23A;
}

.activity-status.ended {
  background-color: #909399;
}

.activity-info,
.work-info {
  padding: 10px 0;
}

.activity-info h3,
.work-info h3 {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  color: #303133;
}

.activity-time,
.activity-location,
.activity-host,
.work-author {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 8px;
  color: #606266;
  font-size: 0.9rem;
}

.activity-participants {
  margin: 10px 0;
}

.work-price {
  color: #f56c6c;
  font-weight: bold;
  margin-bottom: 10px;
}

.work-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.participation-process {
  margin-bottom: 40px;
}

.participation-process h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #303133;
}

.activity-detail,
.work-detail {
  display: flex;
  gap: 20px;
}

.activity-detail-image,
.work-detail-image {
  flex: 1;
  max-width: 400px;
}

.activity-detail-image img,
.work-detail-image img {
  width: 100%;
  border-radius: 8px;
}

.activity-detail-info,
.work-detail-info {
  flex: 2;
}

.activity-meta,
.work-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #606266;
}

.activity-description-detail,
.work-description-detail,
.creator-profile,
.activity-qrcode {
  margin-bottom: 20px;
}

.activity-description-detail h3,
.work-description-detail h3,
.creator-profile h3,
.activity-qrcode h3 {
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #303133;
}

.qrcode-image {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qrcode-image img {
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
}

.creator-info {
  display: flex;
  gap: 15px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.creator-info img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.creator-info h4 {
  margin: 0 0 10px 0;
  color: #303133;
}

.activity-actions,
.work-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
</style>