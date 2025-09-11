<script setup>
// App.vue作为根组件，只负责渲染路由视图
</script>

<template>
  <router-view />
</template>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  line-height: 1.5;
  background-color: #f5f7fa;
}

a {
  text-decoration: none;
  color: #409EFF;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  margin-bottom: 40px;
  padding: 30px 0;
}

.section-title {
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.section-subtitle {
  font-size: 16px;
  margin-bottom: 30px;
  text-align: center;
  color: #666;
}
</style>
