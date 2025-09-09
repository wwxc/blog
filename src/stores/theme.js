import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // 主题模式状态，默认为'light'
  const themeMode = ref('light')

  // 切换主题
  function toggleTheme() {
    themeMode.value = themeMode.value === 'light' ? 'dark' : 'light'
    updateThemeClasses()
  }

  // 初始化主题
  function initTheme() {
    // 检查用户系统偏好
    const prefersDark = typeof window !== 'undefined' && window.matchMedia 
      ? window.matchMedia('(prefers-color-scheme: dark)').matches 
      : false
    themeMode.value = prefersDark ? 'dark' : 'light'
    updateThemeClasses()
  }

  // 更新HTML元素的主题类
  function updateThemeClasses() {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark-theme', themeMode.value === 'dark')
      document.documentElement.classList.toggle('light-theme', themeMode.value === 'light')
    }
  }

  return {
    themeMode,
    toggleTheme,
    initTheme
  }
})