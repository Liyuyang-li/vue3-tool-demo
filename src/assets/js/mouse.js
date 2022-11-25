// mouse.js 组合式函数和mixins用法一样
import { ref, onMounted, onUnmounted,reactive } from 'vue'

// 按照惯例，组合式函数名以“use”开头
export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0)
  const y = ref(0)

  // 组合式函数可以随时更改其状态。
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // 通过返回值暴露所管理的状态
  return { x, y }
}

//用响应式 API 做简单状态管理
export const store = reactive({
  count: 0
})

// 除了我们这里用到的单个响应式对象作为一个 store 之外，
// 你还可以使用其他响应式 API 例如 ref() 或是 computed()，
// 或是甚至通过一个组合式函数来返回一个全局状态
