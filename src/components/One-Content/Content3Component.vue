<template>
    <div class="content3">
        <div class="music-container">
            <div class="album-cover" :class="{ rotating: isPlaying }">
                <img src="/src/assets/img/署前街少年.jpg">
            </div>
            <div class="music-info">
                <h3 class="song-title">成都</h3>
                <p class="artist-name">赵雷</p>
            </div>
        </div>
        <div class="custom-audio-player">
            <audio ref="audioRef" :src="audioSrc" @timeupdate="updateProgress"></audio>
            
            <!-- 进度条 -->
            <div class="progress-bar">
                <div class="progress" :style="{ width: progress + '%' }"></div>
            </div>
            
            <!-- 控制按钮 -->
            <button @click="togglePlayPause" class="play-btn">
                <i class="bi bi-play-circle-fill" v-if="!isPlaying"></i>
                <i class="bi bi-pause-circle-fill" v-else></i>
            </button>

            <!-- 垂直音量控制 -->
            <div class="vertical-volume-control">
                <input ref="volumeSliderRef" type="range" v-model="volume" min="0" max="1" step="0.01" @input="setVolume" class="vertical-slider">
                <i class="volume-icon bi bi-volume-up"></i>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

// 音频路径 
const audioSrc = ref('/src/assets/audios/成都.mp3');

// 使用Vue的ref引用DOM元素
const audioRef = ref(null);
const volume = ref(1);
const progress = ref(0);
const isPlaying = ref(false);
const volumeSliderRef = ref(null);

// 监听音量变化，更新CSS变量
watch(volume, (newValue) => {
  if (volumeSliderRef.value) {
    volumeSliderRef.value.style.setProperty('--volume-percent', `${newValue * 100}%`);
  }
}, { immediate: true });


// 播放/暂停切换方法
const togglePlayPause = () => {
    if (audioRef.value) {
        if (isPlaying.value) {
            audioRef.value.pause();
        } else {
            audioRef.value.play().catch(error => {
                console.error('播放失败:', error);
            });
        }
        isPlaying.value = !isPlaying.value;
    }
};

// 设置音量方法
const setVolume = () => {
    if (audioRef.value) {
        audioRef.value.volume = volume.value;
    }
};

// 更新播放进度
const updateProgress = () => {
    if (audioRef.value) {
        const { currentTime: ct, duration: d } = audioRef.value;
        if (d) {
            progress.value = (ct / d) * 100;
            currentTime.value = formatTime(ct);
            duration.value = formatTime(d);
        }
    }
};

// 格式化时间
const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

// 在组件挂载后初始化
onMounted(() => {
    console.log('音频播放器组件已挂载');
    if (audioRef.value) {
        audioRef.value.volume = volume.value;
        // 监听播放和暂停事件
        audioRef.value.addEventListener('play', () => {
            isPlaying.value = true;
        });
        audioRef.value.addEventListener('pause', () => {
            isPlaying.value = false;
        });
    }
});
</script>

<style scoped>
.content3 {
    width: 100%;
    height: 100%;
    margin-top: 10px;
    box-sizing: border-box;
    position: absolute;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.content3::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/src/assets/img/署前街少年.jpg');
    background-size: cover;
    filter: blur(10px);
    opacity: 0.3;
    z-index: -1;
}
/* 上部分 */
.music-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45%;
    width: 70%;
    border-radius: 0 0 15px 15px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: border 0.2s linear;
    border: 1px solid var(--border-color);
}
.album-cover {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
    transition: transform 0.3s ease;
}
/* 旋转动画 */
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
/* 当播放时添加旋转动画 */
.album-cover.rotating {
    animation: rotate 20s linear infinite;
}
.album-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.music-info {
    color: var(--text-color);
    text-align: left;
}
.song-title {
    font-size: 24px;
    margin: 0 0 10px 0;
    font-weight: bold;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
.artist-name {
    font-size: 16px;
    margin: 0 0 15px 0;
    opacity: 0.9;
}
/* 下部分 */
.custom-audio-player {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    width: 90%;
    max-width: 500px;
    height: 45%;
    padding: 30px;
    border-radius:15px 15px 0 0;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: border 0.2s linear;
    border: 1px solid var(--border-color);
}
/* 进度条 */
.progress-bar {
    width: 70%;
    height: 6px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
    overflow: hidden;
    cursor: pointer;
    transition: height 0.2s ease;
}
.progress {
    height: 100%;
    background: linear-gradient(90deg, #262829, #000000);
    border-radius: 3px;
    transition: width 0.1s linear;
}
/* 按钮 */
.play-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #666;
    font-size: 24px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
}
.play-btn:hover {
    transform: scale(1.1);
}
/* 垂直音量控制 */
.vertical-volume-control {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    width: 40px;
    position: relative;
}
.vertical-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 80px;
    height: 6px;
    margin-bottom: 20px;
    background: linear-gradient(to right, #313131 0%, #4e4b4b var(--volume-percent, 100%), rgba(255, 255, 255, 0.3) var(--volume-percent, 100%), rgba(255, 255, 255, 0.3) 100%);
    border-radius: 3px;
    outline: none;
    cursor: pointer;
    position: absolute;
    transform-origin: center center;
    transform: rotate(-90deg);
    transition: background 0.1s linear;
}
.vertical-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(209, 18, 18, 0.2);
    transition: transform 0.2s ease;
}
.vertical-slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
}
/* 声音图标样式 */
.volume-icon {
    position: absolute;
    bottom: -5px;
    font-size: 16px;
    pointer-events: none;
}
</style>