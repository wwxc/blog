<template>
  <!-- 导航栏组件 -->
  <nav class="navbar" :style="{ paddingTop: `${navbarHeightPadding}px`, paddingBottom: `${navbarHeightPadding}px`, paddingLeft: `${navbarWidthPadding}px`, paddingRight: `${navbarWidthPadding}px` }">
    <div class="navbar-content">
      <div class="navbar-brand">ImStar</div>
      <div class="navbar-buttons">
          <!-- 菜单 -->
            <CustomButton title="菜单">
              <i class="bi bi-list"></i>
            </CustomButton>
            <!-- 搜索 -->
            <CustomButton title="搜索">
              <i class="bi bi-search"></i>
            </CustomButton>
            <!-- 主题切换 -->
            <CustomButton title="切换主题" @click="toggleTheme">
              <i v-if="themeStore.themeMode == 'light'" class="bi bi-moon-stars"></i>
              <i v-else class="bi bi-sun"></i>
            </CustomButton>
          <!-- 根据滚动高度显示/隐藏滚动百分比按钮 -->
          <CustomButton 
            @click="scrollToTop"
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false"
            title="返回顶部"
            class="scroll-button"
            :class="{'back-to-top': isMoreThanHalfScrolled,'show-button': showScrollButton}">
            <template v-if="isHovered">
              <i class="bi bi-arrow-up arrow-animation"></i>
            </template>
            <template v-else>
              {{ isMoreThanHalfScrolled ? '返回顶部' : scrollPercentage}}
            </template>
          </CustomButton>
      </div>
    </div>
  </nav>
</template>
 
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import CustomButton from './CustomButton.vue'
import { useThemeStore } from '../stores/theme.js'

const themeStore = useThemeStore()
const { toggleTheme } = themeStore

// 滚动状态变量
const isScrolled = ref(false)
// 初始导航栏内容区域的左右padding值
const navbarWidthPadding = ref(80)
// 初始导航栏的上下padding值
const navbarHeightPadding = ref(20)
// 滚动百分比
const scrollPercentage = ref(0)
// 是否显示滚动按钮
const showScrollButton = ref(false)
// 是否已滚动超过一半
const isMoreThanHalfScrolled = ref(false)
// 按钮是否被悬停
const isHovered = ref(false)

// 计算文档总高度
const getDocumentHeight = () => {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  )
}

// 滚动到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 处理滚动事件
const handleScroll = () => {
  const scrollPosition = window.scrollY
  // 当滚动超过100px时，设置为滚动状态
  isScrolled.value = scrollPosition > 100
  
  // 计算滚动百分比
  const windowHeight = window.innerHeight
  const docHeight = getDocumentHeight()
  const scrollTop = window.scrollY
  const totalScrollable = docHeight - windowHeight
  // 避免除零错误
  const percentage = totalScrollable > 0 ? Math.floor((scrollTop / totalScrollable) * 100) : 0
  scrollPercentage.value = Math.min(100, percentage)
  // 判断是否显示滚动按钮（当滚动高度大于0时显示）
  showScrollButton.value = scrollPercentage.value > 0
  // 判断是否滚动超过一半
  isMoreThanHalfScrolled.value = scrollPercentage.value > 60
  
  // 根据滚动位置动态调整导航栏的padding
  const maxScrollDistance = window.innerHeight * 0.75
  if (scrollPosition <= maxScrollDistance) {
    const WidthPadding = 80 - (scrollPosition / maxScrollDistance) * 60
    const HeightPadding = 30 - (scrollPosition / maxScrollDistance) * 20
    if (WidthPadding > 20){
      navbarWidthPadding.value = WidthPadding
    }
    if (HeightPadding > 20){
      navbarHeightPadding.value = HeightPadding
    }
  }
}

// 组件挂载时的初始化
onMounted(() => {
  // 添加滚动事件监听
  window.addEventListener('scroll', handleScroll)
  // 初始计算一次
  handleScroll()
})
// 组件卸载时移除滚动事件监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 导航栏样式 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--navbar-background);
  backdrop-filter: blur(12px);
  z-index: 1000;
  transition: background-color 0.3s ease;
}

/* 导航栏内容区域样式 */
.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
  
.navbar-brand {
  font-size: 24px;
  font-weight: bold;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.navbar-buttons {
  display: flex;
  gap: 15px;
}

/* 滚动按钮样式 */
.scroll-button {  
  width: 0px !important;
  background-color: var(--po-color);
  color: var(--scroll-text-color);
  opacity: 0;
  transform: scale(0.1);
  transition: opacity 0.5s ease, transform 0.5s ease, width 0.5s ease;
  transform-origin: center;
  pointer-events: none;
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 溢出时显示省略号（可选） */
  position: relative;
}

/* 箭头动画样式 */
.arrow-animation {
  animation: arrowRise 0.3s ease-out forwards;
  display: inline-block;
}

@keyframes arrowRise {
  from {
    transform: translateY(5px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.scroll-button.show-button {
  width: 40px !important;
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}

.scroll-button.back-to-top {
  width: 80px !important;
}

/* 调整按钮组的间距 */
.navbar-buttons {
  display: flex;
  gap: 15px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navbar-buttons {
    gap: 10px;
  }
  
  .navbar-btn {
    padding: 6px 12px;
    font-size: 12px;
  }
}
</style>