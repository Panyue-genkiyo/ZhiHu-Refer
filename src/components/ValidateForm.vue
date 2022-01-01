<template>
  <form class="validate-form-container">
     <slot name="default"></slot>
     <div class="submit-area" @click.prevent="submitForm">
       <slot name="submit">
         <button type="submit" class="btn btn-primary" >提交</button>
       </slot>
     </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
type ValidateFunc = () => boolean
export const emitter = mitt(); //监听器
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup(props, context){
     let funcArr: ValidateFunc[] = [];
     const submitForm = (e: Event) => {
       const res = funcArr.map(func => func()).every(res => res);
       context.emit('form-submit',res);
     }
     const callback = (func: ValidateFunc | any) => {
        funcArr.push(func);
     }
     emitter.on('form-item-created', callback);
     onUnmounted(() => {
       emitter.off('form-item-created', callback);
       funcArr = [];
     });
     return {
       submitForm
     }
  }
})
</script>
