# 智慧养老社区服务平台 (Senior Community Service Platform)

一个专为老年人社区服务设计的全栈Web应用平台，提供便民服务预约、社区活动管理、健康咨询等功能，致力于提升老年人的生活质量和社区服务效率。

## 📋 项目概述

本项目是一个完整的养老社区服务解决方案，包含用户端、管理端和后端服务三个核心模块：

- **用户端 (senior-community-client)**: 面向社区居民的服务预约和活动参与平台
- **管理端 (senior-community-manager)**: 面向社区管理员的数据分析和服务管理平台
- **后端服务 (senior-community-server)**: 提供RESTful API的Spring Boot应用

## 🏗️ 项目架构

```
senior-community-serve/
├── senior-community-client/     # Vue3 用户端应用
├── senior-community-manager/    # Vue3 管理端应用
├── senior-community-server/     # Spring Boot 后端服务
└── README.md                   # 项目说明文档
```

## 🛠️ 技术栈

### 前端技术
- **框架**: Vue 3.5.18 + Vite 7.0.6
- **UI组件库**: Element Plus 2.11+
- **状态管理**: Pinia 3.0.3
- **路由管理**: Vue Router 4.5.1
- **HTTP客户端**: Axios 1.11.0
- **图表库**: Chart.js 4.5.0 (管理端)
- **图标**: Element Plus Icons Vue 2.3.2

### 后端技术
- **框架**: Spring Boot 3.5.5
- **Java版本**: JDK 17
- **数据库**: MySQL + MyBatis 3.0.5
- **缓存**: Redis (Spring Boot Starter Data Redis)
- **分页**: PageHelper 2.1.1
- **工具库**: Lombok
- **打包方式**: WAR包部署

## 🚀 快速开始

### 环境要求

- **Node.js**: ^20.19.0 || >=22.12.0
- **Java**: JDK 17+
- **Maven**: 3.6+
- **MySQL**: 5.7+
- **Redis**: 6.0+

### 1. 克隆项目

```bash
git clone <repository-url>
cd senior-community-serve
```

### 2. 后端服务启动

```bash
cd senior-community-server

# 配置数据库连接 (application.yml)
# 启动Redis服务

# 开发环境启动
mvn spring-boot:run

# 或者打包部署
mvn clean package -DskipTests
java -jar target/senior-community-server-0.0.1-SNAPSHOT.war
```

### 3. 用户端启动

```bash
cd senior-community-client

# 安装依赖
npm install

# 开发环境启动
npm run dev

# 生产环境打包
npm run build
```

### 4. 管理端启动

```bash
cd senior-community-manager

# 安装依赖
npm install

# 开发环境启动
npm run dev

# 生产环境打包
npm run build
```

## 📱 功能特性

### 用户端功能
- 🏥 **医疗健康服务**: 在线医疗咨询、上门体检、康复理疗预约
- 🏠 **生活照料服务**: 家政服务、保姆服务、护工服务
- 🔧 **紧急维修服务**: 水电维修、家电维修等
- 🎯 **其他便民服务**: 多样化的社区服务
- 📅 **社区活动**: 活动浏览、报名参与
- 📋 **订单管理**: 服务预约、订单跟踪
- 👤 **用户中心**: 个人信息管理

### 管理端功能
- 📊 **数据分析**: 服务需求趋势分析、活动参与度统计
- 👥 **用户管理**: 用户信息管理、权限控制
- 🛎️ **服务管理**: 服务类别管理、服务提供商管理
- 📝 **订单管理**: 订单状态跟踪、订单处理
- 🎪 **活动管理**: 社区活动发布、参与情况统计
- 💬 **反馈管理**: 用户反馈收集、问题处理
- 👨‍💼 **员工管理**: 员工信息管理

### 后端API功能
- 🔐 **用户认证**: 用户登录、管理员登录
- 📋 **服务接口**: 服务分类、服务列表、服务详情
- 🛒 **订单接口**: 订单创建、查询、状态更新
- 🎭 **活动接口**: 活动管理、参与管理
- 👤 **用户接口**: 用户CRUD操作、分页查询
- 👨‍💼 **员工接口**: 员工管理功能
- 🔄 **跨域支持**: 前后端分离架构支持

## 🗄️ 数据库设计

主要数据表包括：
- `users` - 用户信息表
- `managers` - 管理员信息表
- `employees` - 员工信息表
- `service_categories` - 服务分类表
- `services` - 服务信息表
- `service_orders` - 服务订单表
- `activities` - 活动信息表
- `activity_participations` - 活动参与表

## 🌐 API接口

后端服务默认运行在 `http://localhost:8081`，主要API端点：

- `GET /api/services/categories` - 获取服务分类
- `GET /api/services` - 获取服务列表
- `GET /api/orders` - 获取订单列表
- `POST /api/orders` - 创建订单
- `GET /api/activities` - 获取活动列表
- `POST /api/users/login` - 用户登录
- `POST /api/managers/login` - 管理员登录

## 📦 部署说明

### 前端部署
1. 执行 `npm run build` 生成 `dist` 目录
2. 将 `dist` 目录部署到Web服务器 (Nginx/Apache)
3. 配置反向代理指向后端API服务

### 后端部署
1. 执行 `mvn clean package -DskipTests` 生成WAR包
2. 部署到Tomcat服务器或使用 `java -jar` 直接运行
3. 配置数据库连接和Redis连接
4. 确保防火墙开放相应端口

---

**注**: 本项目旨在为养老社区提供数字化服务解决方案，提升老年人的生活便利性和社区服务效率。
