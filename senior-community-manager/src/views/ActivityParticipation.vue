<template>
  <div class="activity-participation-container">
    <h2>活动参与度分析</h2>
    
    <!-- 筛选条件 -->
    <el-card class="filter-card">
      <div class="filter-row">
        <el-select v-model="selectedYear" placeholder="选择年份" class="filter-item">
          <el-option label="2023年" value="2023"></el-option>
          <el-option label="2024年" value="2024"></el-option>
          <el-option label="2025年" value="2025"></el-option>
        </el-select>
        
        <el-select v-model="selectedActivityType" placeholder="选择活动类型" class="filter-item">
          <el-option label="全部" value="all"></el-option>
          <el-option label="文化活动" value="culture"></el-option>
          <el-option label="健身活动" value="fitness"></el-option>
          <el-option label="教育讲座" value="education"></el-option>
          <el-option label="志愿服务" value="volunteer"></el-option>
        </el-select>
        
        <el-button type="warning" class="filter-btn" @click="refreshData">
          <el-icon style="margin-right: 5px;"><Refresh /></el-icon>
          刷新数据
        </el-button>
      </div>
    </el-card>
    
    <!-- 数据概览 -->
    <div class="overview-cards">
      <el-card class="overview-card">
        <div class="overview-content">
          <div class="overview-number">{{ totalActivities }}</div>
          <div class="overview-label">总活动数</div>
        </div>
        <el-icon class="overview-icon"><Calendar /></el-icon>
      </el-card>
      
      <el-card class="overview-card">
        <div class="overview-content">
          <div class="overview-number">{{ totalParticipants }}</div>
          <div class="overview-label">总参与人次</div>
        </div>
        <el-icon class="overview-icon"><UserFilled /></el-icon>
      </el-card>
      
      <el-card class="overview-card">
        <div class="overview-content">
          <div class="overview-number">{{ avgParticipants }}</div>
          <div class="overview-label">平均参与人数</div>
        </div>
        <el-icon class="overview-icon"><DataAnalysis /></el-icon>
      </el-card>
      
      <el-card class="overview-card">
        <div class="overview-content">
          <div class="overview-number">{{ avgParticipationRate }}%</div>
          <div class="overview-label">平均参与率</div>
        </div>
        <el-icon class="overview-icon"><PieChart /></el-icon>
      </el-card>
    </div>
    
    <!-- 活动参与趋势 -->
    <el-card class="chart-card">
      <template #header>
        <div class="card-header">
          <span>活动参与趋势</span>
        </div>
      </template>
      <div class="chart-container">
        <canvas id="participationTrendChart" ref="participationTrendChartRef"></canvas>
      </div>
    </el-card>
    
    <!-- 活动类型参与度和热门活动 -->
    <div class="bottom-container">
      <el-card class="chart-card">
        <template #header>
          <div class="card-header">
            <span>活动类型参与度</span>
          </div>
        </template>
        <div class="chart-container">
          <canvas id="activityTypeChart" ref="activityTypeChartRef"></canvas>
        </div>
      </el-card>
      
      <el-card class="chart-card">
        <template #header>
          <div class="card-header">
            <span>热门活动 TOP 10</span>
          </div>
        </template>
        <div class="hot-activities-table">
          <el-table :data="hotActivities" style="width: 100%">
            <el-table-column prop="rank" label="排名" width="80" />
            <el-table-column prop="name" label="活动名称" />
            <el-table-column prop="participants" label="参与人数" width="120" />
            <el-table-column prop="rating" label="满意度" width="120">
              <template #default="scope">
                <div class="rating-stars">
                  <el-rate v-model="scope.row.rating" disabled :max="5" show-score />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="js" name="ActivityParticipation">
import { ref, onMounted, reactive } from 'vue'
import { Refresh, Calendar, UserFilled, DataAnalysis, PieChart } from '@element-plus/icons-vue'

// 引入Chart.js用于数据可视化
import Chart from 'chart.js/auto'

// 响应式数据
const selectedYear = ref('2024')
const selectedActivityType = ref('all')

// 图表引用
const participationTrendChartRef = ref(null)
const activityTypeChartRef = ref(null)

// 图表实例
let participationTrendChart = null
let activityTypeChart = null

// 模拟数据
const totalActivities = ref(128)
const totalParticipants = ref(5680)
const avgParticipants = ref(44)
const avgParticipationRate = ref(78)

// 参与趋势数据
const participationTrendData = {
  labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  datasets: [
    {
      label: '活动数量',
      data: [8, 10, 12, 15, 14, 16, 18, 17, 15, 13, 11, 9],
      borderColor: '#ff7e00',
      backgroundColor: 'rgba(255, 126, 0, 0.1)',
      tension: 0.3,
      yAxisID: 'y'
    },
    {
      label: '参与人次',
      data: [320, 420, 480, 650, 620, 700, 780, 750, 680, 580, 520, 430],
      borderColor: '#1890ff',
      backgroundColor: 'rgba(24, 144, 255, 0.1)',
      tension: 0.3,
      yAxisID: 'y1'
    }
  ]
}

// 活动类型数据
const activityTypeData = {
  labels: ['文化活动', '健身活动', '教育讲座', '志愿服务'],
  datasets: [
    {
      label: '活动数量',
      data: [42, 35, 28, 23],
      backgroundColor: '#ff7e00',
    },
    {
      label: '参与人次',
      data: [2100, 1800, 1050, 730],
      backgroundColor: '#1890ff',
    }
  ]
}

// 热门活动数据
const hotActivities = reactive([
  { rank: 1, name: '春季健康讲座', participants: 320, rating: 4.8 },
  { rank: 2, name: '社区文艺演出', participants: 280, rating: 4.9 },
  { rank: 3, name: '老年人太极拳班', participants: 250, rating: 4.7 },
  { rank: 4, name: '智能手机使用培训', participants: 220, rating: 4.6 },
  { rank: 5, name: '社区志愿服务日', participants: 200, rating: 4.5 },
  { rank: 6, name: '夏季防暑知识讲座', participants: 180, rating: 4.4 },
  { rank: 7, name: '书法绘画班', participants: 160, rating: 4.8 },
  { rank: 8, name: '健康体检活动', participants: 150, rating: 4.7 },
  { rank: 9, name: '棋类比赛', participants: 140, rating: 4.6 },
  { rank: 10, name: '手工制作课程', participants: 130, rating: 4.5 },
])

// 初始化参与趋势图
const initParticipationTrendChart = () => {
  const ctx = participationTrendChartRef.value.getContext('2d')
  participationTrendChart = new Chart(ctx, {
    type: 'line',
    data: participationTrendData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: '活动数量'
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: '参与人次'
          },
          grid: {
            drawOnChartArea: false,
          },
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  })
}

// 初始化活动类型图
const initActivityTypeChart = () => {
  const ctx = activityTypeChartRef.value.getContext('2d')
  activityTypeChart = new Chart(ctx, {
    type: 'bar',
    data: activityTypeData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  })
}

// 刷新数据
const refreshData = () => {
  // 这里可以添加实际的数据刷新逻辑
  // 模拟数据变化
  totalActivities.value = Math.floor(Math.random() * 100) + 80
  totalParticipants.value = Math.floor(Math.random() * 5000) + 3000
  avgParticipants.value = Math.floor(Math.random() * 60) + 30
  avgParticipationRate.value = Math.floor(Math.random() * 30) + 60
  
  // 重新绘制图表
  if (participationTrendChart) participationTrendChart.update()
  if (activityTypeChart) activityTypeChart.update()
}

// 组件挂载时初始化图表
onMounted(() => {
  initParticipationTrendChart()
  initActivityTypeChart()
})
</script>

<style scoped>
.activity-participation-container {
  padding: 20px;
}

.activity-participation-container h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 24px;
}

.filter-card {
  margin-bottom: 20px;
}

.filter-row {
  display: flex;
  align-items: center;
}

.filter-item {
  width: 200px;
  margin-right: 20px;
}

.filter-btn {
  margin-left: auto;
}

.overview-cards {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.overview-card {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #fff;
}

.overview-content {
  flex: 1;
}

.overview-number {
  font-size: 32px;
  font-weight: bold;
  color: #ff7e00;
  margin-bottom: 5px;
}

.overview-label {
  font-size: 14px;
  color: #666;
}

.overview-icon {
  font-size: 40px;
  color: #ff7e00;
  opacity: 0.7;
}

.chart-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  height: 400px;
  position: relative;
}

.bottom-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.hot-activities-table {
  max-height: 400px;
  overflow-y: auto;
}

.rating-stars {
  display: flex;
  justify-content: center;
}

@media (max-width: 1200px) {
  .bottom-container {
    grid-template-columns: 1fr;
  }
  
  .overview-cards {
    flex-wrap: wrap;
  }
  
  .overview-card {
    min-width: calc(50% - 10px);
  }
}

@media (max-width: 768px) {
  .overview-card {
    min-width: 100%;
  }
  
  .filter-row {
    flex-wrap: wrap;
  }
  
  .filter-item {
    margin-bottom: 10px;
  }
}
</style>