<template>
   <teleport to="#message">
     <div class="fixed-top w-100"  v-if="isVisible">
       <div
         class="alert alert-dismissible message-info w-50 show fade mx-auto mt-3"
         :class="classObject"
       >
         <span>{{ message }}</span>
         <div class="btn-close" @click.prevent="hide" >
         </div>
       </div>
     </div>
   </teleport>
</template>


<script lang="ts">
   import { defineComponent, PropType, ref } from 'vue'
   import useDOMCreate from '@/hooks/useDOMCreate'
   export type MessageType = 'success' | 'error' | 'default';
   export default defineComponent({
     props:{
       message: String,
       type:{
         type: String as PropType<MessageType>,
         default:'default'
       }
     },
     emits:['close-message'],
     setup(props, context){
       useDOMCreate('message');
       const isVisible = ref(true);
       const classObject = {
         'alert-success': props.type === 'success',
         'alert-danger': props.type === 'error',
         'alert-primary': props.type === 'default'
       }
       const hide = () => {
         isVisible.value = false;
         context.emit('close-message', true);
       }
       return {
         classObject,
         hide,
         isVisible
       }
     }
   })
</script>


<style scoped>

</style>
