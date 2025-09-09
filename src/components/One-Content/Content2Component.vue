<template>
    <div class="content2-wrapper">
        <div class="content2-container content2-1">
            <img src="@/assets/img/cat.jpg" alt="">
        </div>
        <div class="content2-container content2-2"></div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.content2-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.content2-container {
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--bg-color);
  border: 0.2px solid var(--border-color);
  box-shadow: 0 0 10px var(--border-color);
  transition: all 0.3s ease;
}

.content2-1 {
  top: 30%;
  left: 40%;
  width: 175px;
  height: 175px;
}

.content2-2 {
  top: 65%;
  left: 75%;
  width: 125px;
  height: 125px;
  background-color: var(--navbar-background);
}

/* 鼠标移入时两个容器分开 */
.content2-wrapper:hover .content2-1 {
  left: 38%;
}

.content2-wrapper:hover .content2-2 {
  left: 78%;
}
</style>