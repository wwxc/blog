<template>
    <template v-if="href">
      <a :href="href" target="_blank" rel="noopener noreferrer" class="custom-button" :style="buttonStyles" :title="title">
        <slot></slot>
      </a>
    </template>
    <template v-else>
      <button class="custom-button" :style="buttonStyles" @click="handleClick" :title="title">
        <slot></slot>
      </button>
    </template>
</template>

<script setup>
import { computed } from 'vue'

// 定义组件的属性
const props = defineProps({
  height: {type: String,default: '40px'},
  width: {type: String,default: '40px'},
  borderRadius: {type: String,default: '20px'},
  onClick: {type: Function,default: () => {}},
  title: {type: String,default: ''},
  href: {type: String,default: ''}
})

// 计算按钮的样式
const buttonStyles = computed(() => ({
  height: props.height,
  width: props.width,
  borderRadius: props.borderRadius
}))

// 处理点击事件
const handleClick = () => {
  props.onClick()
}
</script>

<style scoped>
/* 自定义按钮基础样式 */
.custom-button {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: var(--text-color);
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  outline: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
}

/* 按钮点击时的轻微缩放效果 */
.custom-button:active {
  transform: scale(0.8);
}

/* 鼠标悬停时的样式 */
.custom-button:hover {
  background-color: var(--button-color);
  color: var(--button-text-color);
}
</style>