<template>
    <div>
        <!--  头部开始 -->
        <div class="header-div">
            <div class="header-div-font">
              <img src="http://localhost:5173/src/assets/logo.png" alt="" style="width: 40px">
              <span style="margin-left: 10px; font-size: 24px;">后台管理系统</span>
            </div>
            <div style="flex: 1"></div>
            <div class="header-div-avatar">
              <el-avatar src="http://localhost:5173/src/assets/avatar.jpg" style="width: 40px; height: 40px" />
              <span style="margin-left: 5px; color: white; margin-right: 10px; margin-left: 10px">JinYu</span>
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
                  <el-sub-menu index="1">
                    <template #title>
                        <el-icon style="margin-right: 5px;"><UserFilled style="color: #d48804"/></el-icon>
                        <span style="color: #d48804">用户管理</span>
                    </template>
                    <el-menu-item index="1" style="color: #d48804;font-size: 12px">
                      <el-icon style="margin-right: 5px;"><User style="color: #d48804"/></el-icon>
                      管理员信息</el-menu-item>
                    <el-menu-item index="2" style="color: #d48804;font-size: 12px">
                      <el-icon style="margin-right: 5px;"><User style="color: #d48804"/></el-icon>
                      普通用户信息</el-menu-item>
                  </el-sub-menu>
                <el-menu-item index="" style="color: #d48804">
                  <el-icon style="margin-right: 5px;"><User style="color: #d48804"/></el-icon>
                  个人信息</el-menu-item>
                <el-menu-item index="/manager/data" style="color: #d48804">
                  <el-icon style="margin-right: 5px;"><DataAnalysis style="color: #d48804"/></el-icon>
                  数据统计</el-menu-item>
                <el-menu-item index="4" style="color: #d48804">
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

  const router = useRouter()

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
