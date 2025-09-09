<template>
  <!-- 主要内容区域 -->
  <main class="main-content">
    <FirstDiv />
    <SecondDiv />
    <ShowDiv :title="'网站样式'" :subtitle="'保持界面清爽，同时不牺牲功能丰富度'" :description="'选择字体类型，合理规划布局，注意颜色搭配，添加边框圆角。'">
      <OneContainer>
        <template #content1>
          <Content1Component />
        </template>
        <template #content2>
          <Content2Component />
        </template>
        <template #content3>
          <Content3Component />
        </template>
      </OneContainer>
    </ShowDiv>
    <ShowDiv :title="'项目经历'" :subtitle="'展示开发中有趣的事情、技术'" :description="'开发中遇到的'">
      <TwoContainer />
    </ShowDiv>
    <ShowDiv :title="'文章内容'" :subtitle="'分享自己感兴趣的东西'" :description="'生活小事，好看的照片，编程知识，亦或是社会讨论。'">
      <ThreeContainer />
    </ShowDiv>
  </main>
</template>

<script setup>
import FirstDiv from '../components/FirstDiv.vue'
import SecondDiv from '../components/SecondDiv.vue';
import ShowDiv from '../components/ShowDiv.vue';
import OneContainer from '../components/OneContainer.vue';
import Content1Component from '../components/One-Content/Content1Component.vue';
import Content2Component from '../components/One-Content/Content2Component.vue';
import Content3Component from '../components/One-Content/Content3Component.vue';
import TwoContainer from '../components/TwoContainer.vue';
import ThreeContainer from '../components/ThreeContainer.vue';
</script>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 80px;
}
</style>