<template>
  <div>
    <div class="floating-container icon-div">
      <p><i class="bi bi-browser-edge"></i></p>   <p><i class="bi bi-browser-edge"></i></p>
      <p><i class="bi bi-browser-edge"></i></p>   <p><i class="bi bi-browser-edge"></i></p>
    </div>
    <div class="floating-container font-div">
      <p>宁</p>   <p>静</p>
      <p>致</p>   <p>远</p>
    </div>
    <div class="floating-container hellow-div">
      <p style="color: var(--hellow-color);">print</p> <p>(</p> <p style="color: #067D17;">'Hellow World'</p> <p>)</p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.floating-container {
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: var(--bg-color);
  border: 0.2px solid var(--border-color);
  animation: float 3s ease-in-out infinite;
}
@keyframes float {
  0% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(-50%, calc(-50% - 10px));
  }
  100% {
    transform: translate(-50%, -50%);
  }
}
.icon-div {
  top: 40%;
  left: 30%;
  width: 100px;
  height: 100px;
  display: flex;
  flex-wrap: wrap;
  z-index: 2;
  p {
    width: 50%;
    height: 50%;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
  }
}
.font-div {
  top: 60%;
  left: 60%;
  width: 140px;
  height: 140px;
  display: flex;
  flex-wrap: wrap;
  z-index: 1;
  p {
    width: 50%;
    height: 50%;
    font-family: "宋体";
    font-size: 36px;
    font-weight: 500;
    text-align: center;
    line-height: 70px;
  }
}
.hellow-div {
  top: 86%;
  left: 40%;
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: center;
  z-index: 2;
  p {
    height: 50%;
    font-family: "jetbrains mono";
    font-size: 14px;
    text-align: center;
    line-height: 35px;
    white-space: nowrap;
  }
}
</style>