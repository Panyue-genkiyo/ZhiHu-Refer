import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
   const isClickOutside = ref(false);
   const handler = (event: MouseEvent) => {
     if (elementRef.value) {
       isClickOutside.value = !elementRef.value.contains(event.target as HTMLElement);
     }
   };
   onMounted(() => {
      document.addEventListener('click', handler);
   })
   onUnmounted(() => {
     document.removeEventListener('click', handler);
   })
   return isClickOutside;
}

export default useClickOutside
