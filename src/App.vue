<template>
   <div class="container">
     <global-header :user="currentUser"/>
     <loader v-if="isLoading"/>
     <router-view></router-view>
     <footer class="text-center py-4 text-secondary bg-light mt-6">
         <small>
            <ul class="list-inline mb-0">
              <li class="list-inline-item">© 2022 py专栏</li>
              <li class="list-inline-item">课程</li>
              <li class="list-inline-item">文档</li>
              <li class="list-inline-item">联系</li>
              <li class="list-inline-item">更多</li>
            </ul>
         </small>
     </footer>
   </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from '@/components/GlobalHeader.vue'
import Loader from '@/components/Loader.vue'
import createMessage from '@/utils/createMessage'
import { GlobalState } from '@/store'
export default defineComponent({
  name: 'App',
  components: {
    // ColumnList,
    GlobalHeader,
    Loader,
  },
  setup() {
    const store = useStore<GlobalState>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)
    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createMessage(message, 'error')
      }
    })
    return {
      currentUser,
      isLoading,
      error
    }
  }
})
</script>


