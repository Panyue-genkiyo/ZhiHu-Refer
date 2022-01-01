<template>
  <teleport to="#back">
    <div
      class="d-flex justify-content-center align-items-center h-100 loading-container"
      :style="{backgroundColor: background || ''}"
    >
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only"></span>
        </div>
        <p v-if="text" class="text-primary samll">{{ text }}</p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent  } from 'vue'
import useDOMCreate from '@/hooks/useDOMCreate'
export default defineComponent({
  props:{
    text: String,
    background: {
      type: String
    }
  },
  setup(){
    useDOMCreate('back')
  }
})
</script>

<style scoped>
   .loading-container{
     background: rgba(255,255,255,.5);
     z-index: 100;
     position: fixed;
     width: 100%;
     height: 100%;
     top:0;
     left:0;
   }
   .loading-content{
     text-align: center;
   }
</style>
