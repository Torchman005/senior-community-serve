<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useUserStore } from '@/stores/user';
import {
  HomeFilled,
  ShoppingBag,
  Calendar,
  User,
  Setting,
  SwitchButton
} from '@element-plus/icons-vue';

const router = useRouter();
const userStore = useUserStore();
const activeIndex = ref('1');

const handleSelect = (key) => {
  switch (key) {
    case '1':
      router.push('/home');
      break;
    case '2':
      router.push('/home/service-mall');
      break;
    case '3':
      router.push('/home/activity-center');
      break;
    case '4':
      router.push('/home/user');
      break;
  }
};

// 处理下拉菜单命令
const handleCommand = (command) => {
  switch (command) {
    case 'login':
      router.push('/login');
      break;
    case 'profile':
      router.push('/home/user');
      break;
    case 'logout':
      handleLogout();
      break;
  }
};

// 处理登录按钮点击
const handleLogin = () => {
  router.push('/login');
};

// 退出登录
const handleLogout = async () => {
  try {
    await ElMessageBox.confirm(
      '确定要退出登录吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    
    await userStore.logout();
    ElMessage.success('已退出登录');
    router.push('/login');
  } catch (error) {
    if (error !== 'cancel') {
      console.error('退出登录失败:', error);
      ElMessage.error('退出登录失败');
    }
  }
};
</script>

<template>
  <div class="layout-container">
    <el-container>
      <el-header>
        <div class="header-content">
          <div class="logo">
            <h1>乐享晚年</h1>
          </div>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#409EFF"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">
              <el-icon><HomeFilled /></el-icon>
              首页
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon><ShoppingBag /></el-icon>
              一站式服务商城
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon><Calendar /></el-icon>
              动态活动中心
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon><User /></el-icon>
              个人中心
            </el-menu-item>
          </el-menu>
          <div class="user-actions">
            <!-- 已登录状态 -->
            <template v-if="userStore.isLoggedIn">
              <div class="user-info">
                <el-avatar :src="userStore.userInfo.avatar" :size="32">
                  {{ userStore.userInfo.name?.charAt(0) || 'U' }}
                </el-avatar>
                <span class="username">{{ userStore.userInfo.name || '用户' }}</span>
              </div>
              <el-dropdown @command="handleCommand">
                <el-button type="primary" plain circle>
                  <el-icon><Setting /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="profile">
                      <el-icon><User /></el-icon>
                      个人资料
                    </el-dropdown-item>
                    <el-dropdown-item command="logout" divided>
                      <el-icon><SwitchButton /></el-icon>
                      退出登录
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
            
            <!-- 未登录状态 -->
            <template v-else>
              <el-dropdown @command="handleCommand">
                <el-button type="primary" plain>
                  <el-icon><User /></el-icon>
                  用户操作
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="login">
                      <el-icon><User /></el-icon>
                      登录
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <div class="footer-content">
          <p>© 2023 乐享晚年 - 老年社区服务平台</p>
          <p>联系电话: 400-123-4567 | 邮箱: contact@senior-community.com</p>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped>
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-header {
  background-color: #409EFF;
  color: white;
  padding: 0;
  height: auto !important;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo h1 {
  margin: 0;
  font-size: 24px;
}

.el-menu-demo {
  border-bottom: none;
}

.el-main {
  flex: 1;
  padding: 20px;
  background-color: #f5f7fa;
}

.el-footer {
  background-color: #545c64;
  color: #fff;
  text-align: center;
  padding: 20px;
}

.footer-content p {
  margin: 5px 0;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
}

.username {
  font-size: 14px;
  font-weight: 500;
}
</style>