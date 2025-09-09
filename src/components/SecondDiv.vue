<template>
  <div class="second-div" :style="{width: width,height: height,marginTop: marginTop}">
    <div class="title-div" >
      <p>？{{ displayText }}<span v-if="showCursor">|</span></p>
      <p>起初建站只是一时兴起，和大多数人一样，我只是想记录下自己学习编程的心路历程和笔记，供自己以后有个参考。随着时间的增长，我对前端开发有了更浓厚的兴趣，我开始和同学、朋友交流，也有了自己独立设计开发的想法。在这之前我曾写过多个前端项目，最终还是觉得想着开发设计一个自己的网站最有成就感，也最能证明自己真正地学到了东西，所以你能在这里看到这些文字，也能看到我在此记录的其他内容。</p>
      <p>我喜欢风景、游戏，有自己的爱好，活动。我觉得一切有趣的事情，都会在此记录。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 定义props接口，提供个性化设置选项
const props = defineProps({
  // 尺寸设置
  width: {type: String,default: '70%'},
  height: {type: String,default: '500px'},
  borderRadius: {type: String,default: '10px'},
  // 布局设置
  marginTop: {type: String,default: '100vh'},
})

// 打字机效果相关变量
const fullText = '为什么要做这个网站'
const displayText = ref('')
const showCursor = ref(true)
let currentIndex = 0
let isTyping = true
let interval = null
let cursorInterval = null

// 打字机效果函数
const typeEffect = () => {
  if (isTyping) {
    // 打字阶段
    if (currentIndex < fullText.length) {
      displayText.value += fullText[currentIndex]
      currentIndex++
    } else {
      // 打字完成，等待一段时间后开始删除
      isTyping = false
      // 清除当前定时器，避免多个定时器同时运行
      clearInterval(interval)
      setTimeout(() => {
        interval = setInterval(typeEffect, 100)
      }, 2000)
    }
  } else {
    // 删除阶段
    if (currentIndex > 0) {
      displayText.value = fullText.substring(0, currentIndex - 1)
      currentIndex--
    } else {
      // 删除完成，切换回打字阶段
      isTyping = true
      // 清除当前定时器，避免多个定时器同时运行
      clearInterval(interval)
      setTimeout(() => {
        interval = setInterval(typeEffect, 200)
      }, 500)
    }
  }
}

// 光标闪烁效果
const startCursorBlink = () => {
  cursorInterval = setInterval(() => {
    showCursor.value = !showCursor.value
  }, 500)
}

// 组件挂载时开始动画
onMounted(() => {
  interval = setInterval(typeEffect, 200)
  startCursorBlink()
})

// 组件卸载时清理定时器
onUnmounted(() => {
  if (interval) clearInterval(interval)
  if (cursorInterval) clearInterval(cursorInterval)
})
</script>

<style scoped>
.second-div {
  display: flex;
  margin: 0 auto;
  align-items: center;
  padding: 0 50px;
}
/* seconddiv样式 */
.title-div {
  width: 70%;
  min-width: 384px;
  p {
    font-size: 16px;
    font-family:"思源宋体";
    color: var(--po-color);
    font-weight: 600;
    line-height: 1.8;
    letter-spacing: 0.3px;
    margin-bottom: 16px;
    text-align: justify;
    text-indent: 2em;
  }
  p:first-child {
    font-size: 24px;
    font-weight: 600;
    color: var(--pf-color);
    text-indent: 0;
    margin-bottom: 24px;
    letter-spacing: -0.5px;
  }
   p:last-child {
     margin-bottom: 0;
   }
}
/* 响应式设计 */
@media (max-width: 768px) {
  .second-div {
    width: 90% !important;
    height: 300px !important;
  }
}
</style>