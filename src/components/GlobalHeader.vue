<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link class="navbar-brand" to="/">py专栏</router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><router-link to="/login" class="btn btn-outline-light my-2">登录</router-link></li>
      <li class="list-inline-item"><router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好,${user.nickName}`">
          <dropdown-item><a href="#" class="dropdown-item">新建文章</a></dropdown-item>
          <dropdown-item disabled><a href="#" class="dropdown-item">编辑资料</a></dropdown-item>
          <dropdown-item><a href="#" @click.prevent="handlerLogout" class="dropdown-item">退出登录 </a></dropdown-item>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
   import { defineComponent, PropType } from 'vue'
   import Dropdown from '@/components/Dropdown.vue'
   import DropdownItem from '@/components/DropdownItem.vue'
   import { useStore } from 'vuex'
   import { GlobalState } from '@/store'
   import { UserProps} from '@/store'
   import { useRouter } from 'vue-router'
   import createMessage from '@/utils/createMessage'
   export default defineComponent({
     name: 'GlobalHeader',
     components:{
       Dropdown,
       DropdownItem
     },
     props:{
       user: {
         type: Object as PropType<UserProps>,
         required: true
       },
     },
     setup(){
       const router = useRouter();
       const store = useStore<GlobalState>();
       const handlerLogout = () => {
         store.commit('logout');
         createMessage('退出登录成功,两秒后跳转到首页', 'success');
         setTimeout(() => {
           router.push('/');
         },2000);
       }
       return {
         handlerLogout
       }
     }
   })
</script>
