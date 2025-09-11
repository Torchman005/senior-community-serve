<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">社区管理系统</h2>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="80px" class="login-form">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            :prefix-icon="User"
            clearable
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-button" @click="handleLogin" :loading="loading">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { authApi } from '@/api/index'

const router = useRouter()
const loginFormRef = ref()
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少为 6 个字符', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  try {
    await loginFormRef.value.validate()
    loading.value = true
    
    // 调用管理员登录API，确保只从manager表中验证用户
    const response = await authApi.managerLogin({
      username: loginForm.username,
      password: loginForm.password
    })
    
    // 登录成功后的处理
    if (response.code == 200) { // 使用宽松比较确保类型匹配
      // 保存token到localStorage
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo))
      
      ElMessage.success('登录成功')
      // 跳转到首页
      router.push('/manager/homepage')
    } else {
      ElMessage.error(response.msg || '登录失败')
    }
  } catch (error) {
    // 处理表单验证失败
    if (error.name === 'Error') {
      ElMessage.error(error.message)
    }
    // 处理网络请求错误
    if (error.response) {
      ElMessage.error(error.response.data.message || '登录失败，请稍后重试')
    } else {
      ElMessage.error('网络连接失败，请检查网络')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #303133;
  font-size: 24px;
  font-weight: 600;
}

.login-form {
  margin-top: 20px;
}

.login-button {
  width: 100%;
  height: 40px;
  font-size: 16px;
}
</style>