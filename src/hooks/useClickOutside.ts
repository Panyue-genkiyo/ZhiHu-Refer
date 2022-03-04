import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      /**
       * node.contains(otherNode)
       * node是否包含otherNode节点
       * otherNode是否是node的后代节点
       * 如果otherNode是node的后代节点或是node节点本身，则返回true，否则返回false
       */
      isClickOutside.value = !elementRef.value.contains(e.target as HTMLElement);
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}

export default useClickOutside
