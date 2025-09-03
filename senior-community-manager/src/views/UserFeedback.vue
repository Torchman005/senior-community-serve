<template>
  <div class="user-feedback-container">
    <h2>用户反馈分析</h2>
    
    <!-- 筛选条件 -->
    <el-card class="filter-card">
      <div class="filter-row">
        <el-select v-model="selectedTimeRange" placeholder="选择时间范围" class="filter-item">
          <el-option label="近7天" value="7days"></el-option>
          <el-option label="近30天" value="30days"></el-option>
          <el-option label="近90天" value="90days"></el-option>
          <el-option label="全年" value="year"></el-option>
        </el-select>
        
        <el-select v-model="selectedFeedbackType" placeholder="选择反馈类型" class="filter-item">
          <el-option label="全部" value="all"></el-option>
          <el-option label="建议" value="suggestion"></el-option>
          <el-option label="投诉" value="complaint"></el-option>
          <el-option label="表扬" value="praise"></el-option>
          <el-option label="咨询" value="inquiry"></el-option>
        </el-select>
        
        <el-button type="warning" class="filter-btn" @click="refreshData">
          <el-icon style="margin-right: 5px;"><User /></el-icon>
          刷新数据
        </el-button>
      </div>
    </el-card>
    
    <!-- 数据概览 -->
    <div class="overview-cards">
      <el-card class="overview-card">
        <div class="overview-content">
          <div class="overview-number">{{ totalFeedbacks }}</div>
          <div class="overview-label">总反馈数</div>
        </div>
        <el-icon class="overview-icon"><Message /></el-icon>
      </el-card>
      
      <el-card class="overview-card">
        <div class="overview-content">
          <div class="overview-number">{{ avgResponseTime }}h</div>
          <div class="overview-label">平均响应时间</div>
        </div>
        <el-icon class="overview-icon"><Star /></el-icon>
      </el-card>
      
      <el-card class="overview-card">
        <div class="overview-content">
          <div class="overview-number">{{ satisfactionRate }}%</div>
          <div class="overview-label">整体满意度</div>
                  </div>
        <el-icon class="overview-icon"><Warning /></el-icon>
      </el-card>
      
      <el-card class="overview-card">
        <div class="overview-content">
          <div class="overview-number">{{ pendingFeedbacks }}</div>
          <div class="overview-label">待处理反馈</div>
        </div>
        <el-icon class="overview-icon"><User /></el-icon>
      </el-card>
    </div>
    
    <!-- 反馈类型分布 -->
    <el-card class="chart-card">
      <template #header>
        <div class="card-header">
          <span>反馈类型分布</span>
        </div>
      </template>
      <div class="chart-container">
        <canvas id="feedbackTypeChart" ref="feedbackTypeChartRef"></canvas>
      </div>
    </el-card>
    
    <!-- 满意度趋势和关键词云 -->
    <div class="bottom-container">
      <el-card class="chart-card">
        <template #header>
          <div class="card-header">
            <span>满意度趋势</span>
          </div>
        </template>
        <div class="chart-container">
          <canvas id="satisfactionTrendChart" ref="satisfactionTrendChartRef"></canvas>
        </div>
      </el-card>
      
      <el-card class="chart-card">
        <template #header>
          <div class="card-header">
            <span>热门关键词</span>
          </div>
        </template>
        <div class="keyword-cloud">
          <div v-for="(keyword, index) in keywords" :key="index" :class="['keyword-tag', `keyword-${keyword.weight}`]">
            {{ keyword.text }}
          </div>
        </div>
      </el-card>
    </div>
    
    <!-- 最新反馈列表 -->
    <el-card class="feedback-list-card">
      <template #header>
        <div class="card-header">
          <span>最新反馈列表</span>
        </div>
      </template>
      <div class="feedback-list">
        <el-table :data="latestFeedbacks" style="width: 100%">
          <el-table-column prop="id" label="编号" width="80" />
          <el-table-column prop="content" label="反馈内容" width="400" />
          <el-table-column prop="type" label="类型" width="100">
            <template #default="scope">
              <el-tag :type="getTagType(scope.row.type)">{{ scope.row.type }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="submitTime" label="提交时间" width="180" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="getTagType(scope.row.status)">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <template #default="scope">
              <el-button link type="primary" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="js" name="UserFeedback">
import { ref, onMounted, reactive } from 'vue'
import { Refresh, Message, Clock, Star, Warning } from '@element-plus/icons-vue'

// 引入Chart.js用于数据可视化
import Chart from 'chart.js/auto'

// 响应式数据
const selectedTimeRange = ref('30days')
const selectedFeedbackType = ref('all')

// 图表引用
const feedbackTypeChartRef = ref(null)
const satisfactionTrendChartRef = ref(null)

// 图表实例
let feedbackTypeChart = null
let satisfactionTrendChart = null

// 模拟数据
const totalFeedbacks = ref(256)
const avgResponseTime = ref(12)
const satisfactionRate = ref(85)
const pendingFeedbacks = ref(12)

// 反馈类型数据
const feedbackTypeData = {
  labels: ['建议', '投诉', '表扬', '咨询'],
  datasets: [
    {
      data: [45, 15, 20, 20],
      backgroundColor: ['#1890ff', '#ff4d4f', '#52c41a', '#faad14'],
      borderWidth: 2,
      borderColor: '#fff'
    }
  ]
}

// 满意度趋势数据
const satisfactionTrendData = {
  labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
  datasets: [
    {
      label: '满意度',
      data: [78, 80, 82, 85, 87, 85],
      borderColor: '#52c41a',
      backgroundColor: 'rgba(82, 196, 26, 0.1)',
      tension: 0.3,
      fill: true
    }
  ]
}

// 关键词数据
const keywords = reactive([
  { text: '医疗服务', weight: 5 },
  { text: '活动丰富', weight: 4 },
  { text: '工作人员热情', weight: 5 },
  { text: '设施完善', weight: 4 },
  { text: '交通不便', weight: 3 },
  { text: '活动时间', weight: 3 },
  { text: '健康讲座', weight: 4 },
  { text: '文化活动', weight: 4 },
  { text: '环境整洁', weight: 5 },
  { text: '服务周到', weight: 5 },
  { text: '信息更新', weight: 3 },
  { text: '志愿者', weight: 4 },
  { text: '餐饮质量', weight: 3 },
  { text: '健身器材', weight: 4 },
  { text: '学习机会', weight: 3 },
])

// 最新反馈数据
const latestFeedbacks = reactive([
  { id: 1, content: '建议增加更多的健康讲座，特别是关于常见慢性病的预防和治疗', type: '建议', submitTime: '2024-05-18 14:30', status: '已处理' },
  { id: 2, content: '社区活动中心的健身器材需要定期维护，有几台已经出现故障', type: '投诉', submitTime: '2024-05-17 10:15', status: '处理中' },
  { id: 3, content: '上周的文艺演出非常精彩，感谢组织者的精心安排', type: '表扬', submitTime: '2024-05-16 16:45', status: '已处理' },
  { id: 4, content: '请问下一次健康体检活动是什么时候举行？', type: '咨询', submitTime: '2024-05-15 09:20', status: '已处理' },
  { id: 5, content: '建议在社区设置更多的休息座椅，方便老年人休息', type: '建议', submitTime: '2024-05-14 13:50', status: '已处理' },
  { id: 6, content: '社区图书馆的书籍种类不够丰富，希望能增加更多适合老年人的读物', type: '建议', submitTime: '2024-05-13 11:30', status: '已处理' },
  { id: 7, content: '工作人员的服务态度非常好，总是耐心解答问题', type: '表扬', submitTime: '2024-05-12 15:20', status: '已处理' },
  { id: 8, content: '社区卫生状况有待改善，部分区域存在垃圾堆积现象', type: '投诉', submitTime: '2024-05-11 08:40', status: '处理中' },
])

// 获取标签类型
const getTagType = (value) => {
  switch (value) {
    case '建议':
      return 'primary'
    case '投诉':
      return 'danger'
    case '表扬':
      return 'success'
    case '咨询':
      return 'warning'
    case '已处理':
      return 'success'
    case '处理中':
      return 'primary'
    case '待处理':
      return 'warning'
    default:
      return 'info'
  }
}

// 初始化反馈类型图
const initFeedbackTypeChart = () => {
  const ctx = feedbackTypeChartRef.value.getContext('2d')
  feedbackTypeChart = new Chart(ctx, {
    type: 'pie',
    data: feedbackTypeData,
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

// 初始化满意度趋势图
const initSatisfactionTrendChart = () => {
  const ctx = satisfactionTrendChartRef.value.getContext('2d')
  satisfactionTrendChart = new Chart(ctx, {
    type: 'line',
    data: satisfactionTrendData,
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
          max: 100,
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
  totalFeedbacks.value = Math.floor(Math.random() * 200) + 150
  avgResponseTime.value = Math.floor(Math.random() * 24) + 6
  satisfactionRate.value = Math.floor(Math.random() * 20) + 75
  pendingFeedbacks.value = Math.floor(Math.random() * 20) + 5
  
  // 重新绘制图表
  if (feedbackTypeChart) feedbackTypeChart.update()
  if (satisfactionTrendChart) satisfactionTrendChart.update()
}

// 组件挂载时初始化图表
onMounted(() => {
  initFeedbackTypeChart()
  initSatisfactionTrendChart()
})
</script>

<style scoped>
.user-feedback-container {
  padding: 20px;
}

.user-feedback-container h2 {
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

.keyword-cloud {
  height: 400px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
}

.keyword-tag {
  margin: 8px;
  padding: 5px 10px;
  border-radius: 15px;
  background-color: #ffd07e;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

.keyword-tag:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.keyword-1 {
  font-size: 14px;
}

.keyword-2 {
  font-size: 16px;
}

.keyword-3 {
  font-size: 18px;
}

.keyword-4 {
  font-size: 20px;
}

.keyword-5 {
  font-size: 24px;
}

.feedback-list-card {
  margin-bottom: 20px;
}

.feedback-list {
  max-height: 400px;
  overflow-y: auto;
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