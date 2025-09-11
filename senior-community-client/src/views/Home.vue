<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};

const features = ref([
  {
    title: '一站式服务商城',
    description: '提供医疗健康、生活照料、紧急维修等多种服务，满足老年人日常生活需求',
    icon: 'ShoppingBag',
    path: '/service-mall'
  },
  {
    title: '动态活动中心',
    description: '丰富多彩的线上线下活动，让老年人展示才艺，结交朋友，实现社会价值',
    icon: 'Calendar',
    path: '/activity-center'
  },
  {
    title: '个人中心',
    description: '管理个人信息、订单记录、活动参与情况，一站式管理个人账户',
    icon: 'User',
    path: '/user'
  }
]);

const testimonials = ref([
  {
    content: '通过平台预约的上门医疗服务非常方便，医生很专业，解决了我长期困扰的健康问题。',
    author: '王阿姨，68岁'
  },
  {
    content: '参加了平台组织的书法活动，认识了很多志同道合的朋友，生活变得更加充实。',
    author: '李大爷，72岁'
  },
  {
    content: '家里水管突然漏水，通过平台急速单通道很快就有师傅上门维修，解决了燃眉之急。',
    author: '张奶奶，65岁'
  }
]);
</script>

<template>
  <div class="home-container">
    <!-- 轮播图 -->
    <div class="banner-section">
      <el-carousel height="400px">
        <el-carousel-item>
          <div class="carousel-content carousel-1">
            <div class="carousel-text">
              <h2>一站式服务商城</h2>
              <p>解决日常照护与维修痛点，打造可信赖的本地生活服务网络</p>
              <el-button type="primary" size="large" @click="navigateTo('/service-mall')">立即体验</el-button>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="carousel-content carousel-2">
            <div class="carousel-text">
              <h2>动态活动中心</h2>
              <p>丰富多彩的线上线下活动，展示才艺，结交朋友</p>
              <el-button type="primary" size="large" @click="navigateTo('/activity-center')">查看活动</el-button>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="carousel-content carousel-3">
            <div class="carousel-text">
              <h2>乐享晚年，品质生活</h2>
              <p>为老年人提供全方位的生活服务和社交平台</p>
              <el-button type="primary" size="large" @click="navigateTo('/user')">加入我们</el-button>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 功能特点 -->
    <div class="features-section">
      <h2 class="section-title">我们的服务</h2>
      <div class="features-container">
        <el-card v-for="(feature, index) in features" :key="index" class="feature-card" shadow="hover" @click="navigateTo(feature.path)">
          <div class="feature-icon">
            <el-icon :size="50" color="#409EFF">
              <component :is="feature.icon" />
            </el-icon>
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </el-card>
      </div>
    </div>

    <!-- 用户评价 -->
    <div class="testimonials-section">
      <h2 class="section-title">用户评价</h2>
      <div class="testimonials-container">
        <el-card v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-card" shadow="hover">
          <div class="testimonial-content">
            <i class="el-icon-quote-left"></i>
            <p>{{ testimonial.content }}</p>
            <div class="testimonial-author">— {{ testimonial.author }}</div>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 关于我们 -->
    <div class="about-section">
      <h2 class="section-title">关于我们</h2>
      <div class="about-content">
        <p>乐享晚年平台致力于为老年人提供全方位的生活服务和社交平台，解决老年人日常生活中的各种痛点问题。我们通过数字化手段，将"社区医生"模式升级，打造一个可信赖的本地生活服务网络，同时创建一个线上的"社区活动中心"，让老年人不再是内容的消费者，而是创造者和参与者。</p>
        <p>我们的使命是让每一位老年人都能乐享晚年，拥有健康、便捷、充实的品质生活。</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.banner-section {
  margin-bottom: 40px;
}

.carousel-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 50px;
  color: white;
  background-size: cover;
  background-position: center;
}

.carousel-1 {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), #3498db;
}

.carousel-2 {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), #2ecc71;
}

.carousel-3 {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), #9b59b6;
}

.carousel-text h2 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.carousel-text p {
  font-size: 1.2rem;
  margin-bottom: 20px;
  max-width: 600px;
}

.section-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  color: #303133;
}

.features-section {
  margin-bottom: 40px;
}

.features-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.feature-card {
  text-align: center;
  padding: 20px;
  transition: transform 0.3s;
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-icon {
  margin-bottom: 15px;
}

.feature-card h3 {
  margin-bottom: 10px;
  color: #303133;
}

.testimonials-section {
  margin-bottom: 40px;
  background-color: #f9f9f9;
  padding: 40px 20px;
  border-radius: 8px;
}

.testimonials-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.testimonial-card {
  padding: 20px;
}

.testimonial-content {
  position: relative;
  padding: 10px;
}

.testimonial-content p {
  font-style: italic;
  margin-bottom: 15px;
  color: #606266;
}

.testimonial-author {
  text-align: right;
  font-weight: bold;
  color: #303133;
}

.about-section {
  margin-bottom: 40px;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  color: #606266;
}

.about-content p {
  margin-bottom: 15px;
}
</style>