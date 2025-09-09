<template>
  <div class="one-container">
    <div class="left">
      <div class="item1" ref="item1Ref">
        <p class="left-title">字体选择</p>
        <p class="left-content">主要字体<a style="color: #4c83fd;font-family: '思源宋体';">思源宋体<i class="bi bi-brush"/></a></p>
        <p class="left-content">代码字体<a style="border: 1px solid var(--pf-color);padding: 2px 5px;border-radius: 4px;font-family: 'JetBrains';font-weight: 300;">JetBrains Mono</a></p>
        <p class="left-content">图标库<a style="margin-right: 4px;margin-left: 30px;">BootStrap</a><i style="font-size: 13px;" class="bi bi-bootstrap"/></p>
      </div>
      <div class="item2" ref="item2Ref">
        <p class="left-title">调整布局</p>
        <p class="left-content">适当采用圆角、阴影、遮罩、背景，添加动画、交互，让页面尽量简洁的同时不牺牲用户体验。</p>
      </div>
      <div class="item3" ref="item3Ref">
        <p class="left-title">用小组件丰富文章内容</p>
        <p class="left-content">音乐播放器 &nbsp;&nbsp; 视频播放器</p>
        <p class="left-content">轮播图 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 代码块</p>
        <p class="left-content">卡片 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ...</p>
      </div>
    </div>
    <div class="right">
      <div class="right-content" :style="{ opacity: contentOpacity }">
        <slot v-if="currentState === 'state3'" name="content3"></slot>
        <slot v-else-if="currentState === 'state2'" name="content2"></slot>
        <slot v-else name="content1"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

// 定义props接口，提供个性化设置选项
const props = defineProps({
  title: {type: String,default: ''},
})

// DOM引用
const item1Ref = ref(null);
const item2Ref = ref(null);
const item3Ref = ref(null);

// 当前状态，用于控制显示哪个插槽
const currentState = ref('state1');
// 控制透明度的变量，用于动画效果
const contentOpacity = ref(1);

// 检查元素是否在视口中间
const isElementInMiddle = (element) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const elementMiddle = rect.top + rect.height / 2;
  
  // 当元素中间点进入视口中间区域（±100px范围内）时返回true
  return Math.abs(elementMiddle - viewportHeight / 2) < 100;
};

// 处理滚动事件
  const handleScroll = async () => {
    await nextTick();

    // 使用正确的if-else if链确保只有一个条件生效
    // 检查item3是否在视口中间（优先级最高，因为在最下方）
    if (isElementInMiddle(item3Ref.value)) {
      if (currentState.value !== 'state3') {
        contentOpacity.value = 0;
        setTimeout(() => {
          currentState.value = 'state3';
          contentOpacity.value = 1;
        }, 400);
      }
    }
    // 检查item2是否在视口中间
    else if (isElementInMiddle(item2Ref.value)) {
      if (currentState.value !== 'state2') {
        contentOpacity.value = 0;
        setTimeout(() => {
          currentState.value = 'state2';
          contentOpacity.value = 1;
        }, 400);
      }
    }
    // 检查item1是否在视口中间
    else if (isElementInMiddle(item1Ref.value)) {
      if (currentState.value !== 'state1') {
        contentOpacity.value = 0;
        setTimeout(() => {
          currentState.value = 'state1';
          contentOpacity.value = 1;
        }, 400);
      }
    }
  };

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // 初始检查
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.one-container {
  width:50%;
  padding: 70px 0 70px 0;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.left {
  width: 45%;
  display: flex;
  flex-direction: column;
}

.left .item1,
.left .item2,
.left .item3 {
  height: 300px;
  border-radius: 10px;
  padding-top: 130px;
  a {
    margin-left: 12px;
    font-size: 14px;
  }
  .left-title {
    font-family: "楷体";
    color: #96a2b4;
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .left-content {
    font-family: "思源宋体";
    font-size: 16px;
  }
}
.right {
  width: 45%;
}
.right-content {
    height: 300px;
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 30%;
    flex-wrap: wrap;
    transition: opacity 0.4s ease;
  }
/* 响应式设计 */
@media (max-width: 800px) {
  .two-container {
    min-width: 300px;
    align-items: center;
  }
  .left {
    width: 100%;
  }
  .right {
    display: none;
  }
}
</style>