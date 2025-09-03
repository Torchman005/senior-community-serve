<template>
  <div class="service-trend-container">
    <h2>服务需求趋势分析</h2>
    
    <!-- 筛选条件 -->
    <el-card class="filter-card">
      <div class="filter-row">
        <el-select v-model="selectedTimeRange" placeholder="选择时间范围" class="filter-item">
          <el-option label="近7天" value="7days"></el-option>
          <el-option label="近30天" value="30days"></el-option>
          <el-option label="近90天" value="90days"></el-option>
          <el-option label="全年" value="year"></el-option>
        </el-select>
        
        <el-select v-model="selectedServiceType" placeholder="选择服务类型" class="filter-item">
          <el-option label="全部" value="all"></el-option>
          <el-option label="健康医疗" value="health"></el-option>
          <el-option label="生活照料" value="care"></el-option>
          <el-option label="文化娱乐" value="culture"></el-option>
          <el-option label="法律咨询" value="legal"></el-option>
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
          <div class="overview-number">{{ totalRequests }}</div>
          <div class="overview-label">总需求数</div>
        </div>
        <el-icon class="overview-icon"><PieChart /></el-icon>
      </el-card>
      
      <el-card class="overview-card">
        <div class="overview-content">
          <div class="overview-number">{{ dailyAvg }}</div>
          <div class="overview-label">日均需求</div>
        </div>
        <el-icon class="overview-icon"><Calendar /></el-icon>
      </el-card>
      
      <el-card class="overview-card">
        <div class="overview-content">
          <div class="overview-number">{{ growingRate }}%</div>
          <div class="overview-label">增长率</div>
        </div>
        <el-icon class="overview-icon"><Top /></el-icon>
      </el-card>
      
      <el-card class="overview-card">
        <div class="overview-content">
          <div class="overview-number">{{ popularService }}</div>
          <div class="overview-label">热门服务</div>
        </div>
        <el-icon class="overview-icon"><Star /></el-icon>
      </el-card>
    </div>
    
    <!-- 趋势图表 -->
    <el-card class="chart-card">
      <template #header>
        <div class="card-header">
          <span>服务需求趋势图</span>
        </div>
      </template>
      <div class="chart-container">
        <canvas id="trendChart" ref="trendChartRef"></canvas>
      </div>
    </el-card>
    
    <!-- 服务类型分布 -->
    <div class="distribution-container">
      <el-card class="chart-card">
        <template #header>
          <div class="card-header">
            <span>服务类型分布</span>
          </div>
        </template>
        <div class="chart-container">
          <canvas id="distributionChart" ref="distributionChartRef"></canvas>
        </div>
      </el-card>
      
      <el-card class="chart-card">
        <template #header>
          <div class="card-header">
            <span>满意度分析</span>
          </div>
        </template>
        <div class="chart-container">
          <canvas id="satisfactionChart" ref="satisfactionChartRef"></canvas>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="js" name="ServiceTrend">
import { ref, onMounted, reactive } from 'vue'
import { Refresh, PieChart, Calendar, Top, Star } from '@element-plus/icons-vue'

// 引入Chart.js用于数据可视化
import Chart from 'chart.js/auto'

// 响应式数据
const selectedTimeRange = ref('30days')
const selectedServiceType = ref('all')

// 图表引用
const trendChartRef = ref(null)
const distributionChartRef = ref(null)
const satisfactionChartRef = ref(null)

// 图表实例
let trendChart = null
let distributionChart = null
let satisfactionChart = null

// 模拟数据
const totalRequests = ref(1256)
const dailyAvg = ref(42)
const growingRate = ref(15.8)
const popularService = ref('健康医疗')

// 趋势图数据
const trendData = {
  labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  datasets: [
    {
      label: '健康医疗',
      data: [65, 78, 90, 81, 95, 102, 115, 120, 135, 140, 155, 160],
      borderColor: '#ff7e00',
      backgroundColor: 'rgba(255, 126, 0, 0.1)',
      tension: 0.3,
      fill: true
    },
    {
      label: '生活照料',
      data: [45, 52, 60, 65, 70, 78, 85, 90, 95, 100, 105, 110],
      borderColor: '#00b42a',
      backgroundColor: 'rgba(0, 180, 42, 0.1)',
      tension: 0.3,
      fill: true
    },
    {
      label: '文化娱乐',
      data: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
      borderColor: '#1890ff',
      backgroundColor: 'rgba(24, 144, 255, 0.1)',
      tension: 0.3,
      fill: true
    },
    {
      label: '法律咨询',
      data: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
      borderColor: '#722ed1',
      backgroundColor: 'rgba(114, 46, 209, 0.1)',
      tension: 0.3,
      fill: true
    }
  ]
}

// 分布数据
const distributionData = {
  labels: ['健康医疗', '生活照料', '文化娱乐', '法律咨询'],
  datasets: [
    {
      data: [42, 28, 20, 10],
      backgroundColor: ['#ff7e00', '#00b42a', '#1890ff', '#722ed1'],
      borderWidth: 2,
      borderColor: '#fff'
    }
  ]
}

// 满意度数据
const satisfactionData = {
  labels: ['非常满意', '满意', '一般', '不满意', '非常不满意'],
  datasets: [
    {
      data: [55, 30, 10, 3, 2],
      backgroundColor: ['#00b42a', '#1890ff', '#ff7e00', '#ff4d4f', '#8c8c8c'],
      borderWidth: 2,
      borderColor: '#fff'
    }
  ]
}

// 初始化趋势图
const initTrendChart = () => {
  const ctx = trendChartRef.value.getContext('2d')
  trendChart = new Chart(ctx, {
    type: 'line',
    data: trendData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: false
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

// 初始化分布图
const initDistributionChart = () => {
  const ctx = distributionChartRef.value.getContext('2d')
  distributionChart = new Chart(ctx, {
    type: 'pie',
    data: distributionData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        }
      }
    }
  })
}

// 初始化满意度图
const initSatisfactionChart = () => {
  const ctx = satisfactionChartRef.value.getContext('2d')
  satisfactionChart = new Chart(ctx, {
    type: 'doughnut',
    data: satisfactionData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        }
      }
    }
  })
}

// 刷新数据
const refreshData = () => {
  // 这里可以添加实际的数据刷新逻辑
  // 模拟数据变化
  totalRequests.value = Math.floor(Math.random() * 2000) + 1000
  dailyAvg.value = Math.floor(Math.random() * 60) + 20
  growingRate.value = (Math.random() * 30 + 5).toFixed(1)
  
  // 重新绘制图表（如果需要）
  if (trendChart) trendChart.update()
  if (distributionChart) distributionChart.update()
  if (satisfactionChart) satisfactionChart.update()
}

// 组件挂载时初始化图表
onMounted(() => {
  initTrendChart()
  initDistributionChart()
  initSatisfactionChart()
})
</script>

<style scoped>
.service-trend-container {
  padding: 20px;
}

.service-trend-container h2 {
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

.distribution-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 1200px) {
  .distribution-container {
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