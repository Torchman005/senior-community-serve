<template>
  <div class="homepage-container">
    <!-- 欢迎信息 -->
    <div class="welcome-section">
      <h1>欢迎使用社区管理系统</h1>
      <p>欢迎回来，{{ userName }}！今天是 {{ currentDate }}</p>
    </div>

    <!-- 快捷入口 -->
    <div class="quick-access">
      <el-card class="quick-card" @click="navigateTo('/manager/data')">
        <div class="quick-content">
          <el-icon class="quick-icon"><DataAnalysis /></el-icon>
          <span>数据统计</span>
        </div>
      </el-card>
      <el-card class="quick-card" @click="navigateTo('/manager/service-trend')">
        <div class="quick-content">
          <el-icon class="quick-icon"><PieChart /></el-icon>
          <span>服务需求趋势</span>
        </div>
      </el-card>
      <el-card class="quick-card" @click="navigateTo('/manager/activity-participation')">
        <div class="quick-content">
          <el-icon class="quick-icon"><Grid /></el-icon>
          <span>活动参与度</span>
        </div>
      </el-card>
      <el-card class="quick-card" @click="navigateTo('/manager/user-feedback')">
        <div class="quick-content">
          <el-icon class="quick-icon"><Finished /></el-icon>
          <span>用户反馈分析</span>
        </div>
      </el-card>
    </div>

    <!-- 数据概览 -->
    <div class="overview-section">
      <h2>数据概览</h2>
      <div class="overview-cards">
        <el-card class="overview-card">
          <div class="overview-content">
            <div class="overview-number">{{ totalUsers }}</div>
            <div class="overview-label">总用户数</div>
          </div>
          <el-icon class="overview-icon"><UserFilled /></el-icon>
        </el-card>
        <el-card class="overview-card">
          <div class="overview-content">
            <div class="overview-number">{{ pendingTasks }}</div>
            <div class="overview-label">待处理任务</div>
          </div>
          <el-icon class="overview-icon"><Clock /></el-icon>
        </el-card>
        <el-card class="overview-card">
          <div class="overview-content">
            <div class="overview-number">{{ totalActivities }}</div>
            <div class="overview-label">活动总数</div>
          </div>
          <el-icon class="overview-icon"><Calendar /></el-icon>
        </el-card>
        <el-card class="overview-card">
          <div class="overview-content">
            <div class="overview-number">{{ totalFeedbacks }}</div>
            <div class="overview-label">用户反馈</div>
          </div>
          <el-icon class="overview-icon"><Message /></el-icon>
        </el-card>
      </div>
    </div>

    <!-- 最近活动 -->
    <el-card class="recent-activities-card">
      <template #header>
        <div class="card-header">
          <span>最近活动</span>
          <el-button type="text" @click="navigateTo('/manager/activity-participation')">查看全部</el-button>
        </div>
      </template>
      <el-table :data="recentActivities" style="width: 100%">
        <el-table-column prop="name" label="活动名称" width="300" />
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="participants" label="参与人数" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="js" name="Homepage">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  UserFilled, 
  Clock, 
  Calendar, 
  Message, 
  DataAnalysis, 
  PieChart, 
  Grid, 
  Finished 
} from '@element-plus/icons-vue'

const router = useRouter()
const userName = '管理员'

// 获取当前日期
const currentDate = computed(() => {
  const now = new Date()
  return now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
})

// 模拟数据
const totalUsers = 1256
const pendingTasks = 8
const totalActivities = 36
const totalFeedbacks = 124

// 最近活动数据
const recentActivities = ref([
  {
    name: '社区健康讲座',
    date: '2024-01-15',
    participants: 45,
    status: '已完成'
  },
  {
    name: '老年书法班',
    date: '2024-01-18',
    participants: 32,
    status: '进行中'
  },
  {
    name: '志愿者招募',
    date: '2024-01-22',
    participants: 0,
    status: '即将开始'
  },
  {
    name: '社区清洁日',
    date: '2024-01-10',
    participants: 68,
    status: '已完成'
  }
])

// 获取状态标签类型
const getStatusType = (status) => {
  switch (status) {
    case '已完成':
      return 'success'
    case '进行中':
      return 'primary'
    case '即将开始':
      return 'warning'
    default:
      return 'info'
  }
}

// 导航到指定页面
const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.homepage-container {
  padding: 20px;
}

.welcome-section {
  margin-bottom: 30px;
}

.welcome-section h1 {
  color: #d48804;
  margin-bottom: 10px;
}

.quick-access {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.quick-card {
  flex: 1;
  cursor: pointer;
  transition: transform 0.3s;
}

.quick-card:hover {
  transform: translateY(-5px);
}

.quick-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.quick-icon {
  font-size: 24px;
  margin-right: 10px;
  color: #d48804;
}

.overview-section h2 {
  margin-bottom: 20px;
  color: #333;
}

.overview-cards {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.overview-card {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

.overview-content {
  flex: 1;
}

.overview-number {
  font-size: 32px;
  font-weight: bold;
  color: #d48804;
}

.overview-label {
  color: #666;
  font-size: 14px;
}

.overview-icon {
  font-size: 40px;
  color: #ffd07e;
}

.recent-activities-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
