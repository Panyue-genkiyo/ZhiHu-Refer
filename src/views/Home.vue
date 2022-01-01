<template>
  <column-list :list="list"></column-list>
</template>

<script lang="ts">
  import { defineComponent, computed, onMounted } from 'vue'
  import ColumnList from '@/components/ColumnList.vue'
  import { useStore } from 'vuex'
  import { GlobalState } from '@/store'
  export default defineComponent({
    name: 'Home',
    components: {
      ColumnList,
    },
    setup() {
      const store = useStore<GlobalState>();
      const list = computed(() => store.state.columns);
      //组件一挂载拉数据
      onMounted(() => {
        store.dispatch('fetchColumns');
      })
      return {
        list
      }
    },
  })
</script>
