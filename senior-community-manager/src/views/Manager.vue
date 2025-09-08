<template>
    <div>
        <!--  头部开始 -->
        <div class="header-div">
            <div class="header-div-font">
              <img src="@/assets/logo.png" alt="" style="width: 40px">
              <span style="margin-left: 10px; font-size: 24px;">社区管理系统</span>
            </div>
            <div style="flex: 1"></div>
            <div class="header-div-avatar">
              <el-avatar src="@/assets/avatar.jpg" style="width: 40px; height: 40px" />
              <span style="margin-left: 5px; color: white; margin-right: 10px; margin-left: 10px">管理员</span>
            </div>
        </div>
        <!-- 头部结束 -->

        <!-- 下面部分开始 -->
         <div style="display: flex;">
            <!-- 左侧导航栏开始 -->
            <div style="width: 200px; border-right: 1px solid #ddd; min-height: calc(100vh - 60px)">
              <el-menu router :default-active="router.currentRoute.value.path">
                <el-menu-item index="/manager/homepage" style="color: #d48804">
                  <el-icon style="margin-right: 5px;"><House style="color: #d48804"/></el-icon>
                  系统首页</el-menu-item>
                  <el-sub-menu>
                    <template #title>
                      <el-icon style="margin-right: 5px;"><User style="color: #d48804"/></el-icon>
                      <span style="color: #d48804">人员管理</span>
                    </template>
                    <el-menu-item index="/manager/employee" style="color: #d48804">
                      <el-icon style="margin-right: 5px;"><User style="color: #d48804"/></el-icon>
                      员工管理</el-menu-item>
                    <el-menu-item index="/manager/user" style="color: #d48804">
                      <el-icon style="margin-right: 5px;"><User style="color: #d48804"/></el-icon>
                      用户管理</el-menu-item>
                  </el-sub-menu>
                <el-menu-item index="/manager/service-trend" style="color: #d48804">
                  <el-icon style="margin-right: 5px;"><PieChart style="color: #d48804"/></el-icon>
                  服务需求趋势</el-menu-item>
                <el-menu-item index="/manager/activity-participation" style="color: #d48804">
                  <el-icon style="margin-right: 5px;"><Grid style="color: #d48804"/></el-icon>
                  活动参与度</el-menu-item>
                <el-menu-item index="/manager/user-feedback" style="color: #d48804">
                  <el-icon style="margin-right: 5px;"><Finished style="color: #d48804"/></el-icon>
                  用户反馈分析</el-menu-item>
                <el-menu-item style="color: #d48804" @click="handleLogout">
                  <el-icon style="margin-right: 5px;"><SwitchButton style="color: #d48804"/></el-icon>
                  退出登录</el-menu-item>
              </el-menu>
            </div>
            <!-- 左侧导航栏结束 -->

            <!-- 右侧主体区域开始 -->
             <div style="flex: 1; width: 0; background-color: #fff7e9; padding: 10px">
                <router-view/>
             </div>
             <!-- 右侧主体区域结束 -->
         </div>
         <!-- 下面部分结束 -->
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { 
  House, 
  DataAnalysis, 
  PieChart, 
  Grid, 
  Finished, 
  SwitchButton 
} from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'

  const router = useRouter()

  // 处理退出登录
  const handleLogout = () => {
    // 显示确认对话框
    ElMessageBox.confirm(
      '确定要退出登录吗？',
      '退出登录',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    .then(() => {
      // 清除登录状态
      // 实际项目中可能需要清除token等
      router.push('/')
    })
    .catch(() => {
      // 用户取消退出
      console.log('用户取消退出')
    })
  }

</script>

<style scoped>
  .header-div {
    height: 60px;
    background-color: #ffd07e;
    display: flex;
    align-items: center;
  }
  .header-div-font {
    width: 200px;
    display: flex;
    font-size: 20px;
    align-items: center;
    font-weight: bold;
    color: #fff;
    line-height: 60px;
    padding-left: 15px;
  }
  .header-div-avatar {
    width: fit-content;
    display: flex;
    align-items: center;
    padding-right: 10px;
  }
</style>
