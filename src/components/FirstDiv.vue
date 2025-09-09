<template>
  <div class="first-div" 
       :style="{transform: `translate(-50%, -50%) scale(${scale})`,opacity: opacity}">
    <div class="FirstShow">
      <!-- 左侧内容区域 -->
      <div class="hero-content">
        <div class="hero-title">
          <h1>I‘M STAR</h1>
          <p class="hero-subtitle">你好，我是星👋</p>
        </div>
        <div class="hero-icons">
          <CustomButton :width="'30px'" :height="'30px'" title="首页">
            <i class="bi bi-house"></i>
          </CustomButton>
          <CustomButton :width="'30px'" :height="'30px'" :title="'2968266602@qq.com'" href="https://baidu.com">
            <i class="bi bi-envelope-at"></i>
          </CustomButton>
          <CustomButton :width="'30px'" :height="'30px'" title="图片">
            <i class="bi bi-images"></i>
          </CustomButton>
          <CustomButton :width="'30px'" :height="'30px'" title="编辑">
            <i class="bi bi-pencil"></i>
          </CustomButton>
          <CustomButton :width="'30px'" :height="'30px'" :title="'GitHub'" href="https://baidu.com">
            <i class="bi bi-github"></i>
          </CustomButton>
        </div>
      </div>
      <!-- 右侧图片区域 -->
      <div class="hero-image"><img src="../assets/img/people.png"/></div>
      <!-- 居中浮动 -->
      <div class="floating">
        <i class="bi bi-chevron-down"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import CustomButton from './CustomButton.vue'

//  初始缩放比例
const scale = ref(1)
// 初始透明度
const opacity = ref(1)

// 处理滚动事件
const handleScroll = () => {
  const scrollPosition = window.scrollY
  
  // 根据滚动位置调整大小和透明度
  const maxScrollDistance = window.innerHeight * 0.75
  
  if (scrollPosition <= maxScrollDistance) {
    // 计算缩放比例 (从1到0.7)
    scale.value = 1 - (scrollPosition / maxScrollDistance) * 0.3
    // 计算透明度 (从1到0，更快消失)
    opacity.value = 1 - (scrollPosition / maxScrollDistance) * 1.2
  } else if (scrollPosition < 20) {
    // 滚动非常小时，保持完全可见状态
    scale.value = 1
    opacity.value = 1
  } else {
    // 滚动超过最大距离时，保持最小状态
    scale.value = 0
  }
}
// 组件挂载时添加滚动事件监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
// 组件卸载时移除滚动事件监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.first-div {
  width: 80%;
  height: calc(100vh - 300px);
  /* 使用flex布局 */
  display: flex;
  /* 设置主轴方向为垂直方向 */
  flex-direction: column;
  /* 沿主轴方向（垂直方向）居中对齐 */
  justify-content: center;
  /* 沿交叉轴方向（水平方向）居中对齐 */
  align-items: center;
  transition: color 0.3s ease;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

/* 首页展示区域样式 */
.FirstShow {
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
}
/* 左侧内容区域 */
.hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
/* 标题样式 */
.hero-title h1 {
  font-size: 64px;
  font-weight: 900;
  margin: 0;
  color: var(--text-color);
  letter-spacing: -2px;
  line-height: 1;
}
/* 副标题样式 */
.hero-subtitle {
  font-size: 20px;
  color: var(--text-color);
  margin: 10px 0 0 0;
}
/* 图标按钮区域 */
.hero-icons {
  display: flex;
  gap: 10px;
  margin-top: 20px;

  .bi {
    font-size: 18px;
  }
}
/* 右侧图片区域 */
.hero-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: blanchedalmond;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
/* 图片居中显示 */
.hero-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
/* 上下浮动元素样式 */
.floating {
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 15px 25px;
  border-radius: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: floatUpDown 3s ease-in-out infinite;
  color: #333;
  font-weight: 500;
  z-index: 10;
}
/* 上下浮动动画 */
@keyframes floatUpDown {
  0% {
    transform: translate(-50%, -50%) translateY(0px);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-15px);
  }
  100% {
    transform: translate(-50%, -50%) translateY(0px);
  }
}
/* 响应式设计 */
@media (max-width: 900px) {
  .FirstShow {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 0 20px;
  }
  .hero-content {
    align-items: center;
  }
  .hero-title h1 {
    font-size: 48px;
  }
  .hero-subtitle {
    font-size: 18px;
  }
  .hero-image {
    display: none;
  }
}

@media (max-width: 768px) {
  .first-div {
    width: 90%;
    height: 300px;
  }
  
  h2 {
    font-size: 24px;
  }
  
  p {
    font-size: 16px;
  }
}
</style>