<template>
  <div class="show-div" :style="{ width: width, height: height, marginTop: marginTop }">
    <div style="width: 50%;margin: 0 auto;">
      <p>{{ title }}</p>
      <p>{{ subtitle }}</p>
      <p>{{ description }}</p>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
// 定义props接口，提供个性化设置选项
const props = defineProps({
  // 尺寸设置
  width: { type: String, default: '100%' },
  borderRadius: { type: String, default: '10px' },
  // 布局设置
  marginTop: { type: String, default: '150px' },
  // 内容自定义
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '' }
})
</script>

<style scoped>
.show-div {
  min-width: 756px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  box-sizing: border-box;
  width: 100%;
}

/* 第一个p标签：蓝色文字 */
.show-div p:nth-child(1) {
  font-family: "楷体";
  color: #4c83fd;
  font-weight: 600;
  font-size: 18px;
}

/* 第二个p标签：黑色粗体大字体 */
.show-div p:nth-child(2) {
  font-family: "宋体";
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 4px;
}

/* 第三个p标签：正常样式 */
.show-div p:nth-child(3) {
  font-family: "幼园";
  color: #96a2b4;
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 800px) {
  .show-div {
    min-width: 300px;
    padding: 0 20px;
    align-items: center;
    text-align: center;
  }

  .show-div p:nth-child(1),
  .show-div p:nth-child(2),
  .show-div p:nth-child(3) {
    width: 100%;
  }
}
</style>