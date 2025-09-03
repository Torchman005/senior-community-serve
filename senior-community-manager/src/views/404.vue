<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-code">404</div>
      <div class="error-message">页面不存在</div>
      <div class="error-description">抱歉，您访问的页面不存在或已被移除</div>
      <el-button type="warning" @click="goHome" class="go-home-btn">
        <el-icon style="margin-right: 5px;"><House /></el-icon>
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script setup lang="js" name="404">
import { useRouter } from 'vue-router'
import { House } from '@element-plus/icons-vue'

const router = useRouter()

const goHome = () => {
  router.push('/manager/homepage')
}
</script>

<style scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}

.error-content {
  text-align: center;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.error-code {
  font-size: 80px;
  font-weight: bold;
  color: #ffd07e;
  margin-bottom: 20px;
}

.error-message {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.error-description {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}

.go-home-btn {
  padding: 10px 24px;
  font-size: 16px;
}
</style>