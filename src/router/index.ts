import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'
import Singup from '@/views/Singup.vue'
import store from '@/store'

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes:[
    {
      path:'/',
      name:'home',
      component:Home
    },
    {
      path:'/login',
      name:'login',
      component:Login,
      meta:{
        redirectAlreadyLogin: true
      }
    },
    {
      path:'/column/:id',
      name:'column',
      component:ColumnDetail,
    },
    {
      path: '/create',
      name: 'createPost',
      component: () => import('@/views/CreatePost.vue'),
      meta: {
        requiredLogin: true
      }
    },
    {
      path:'/signup',
      name:'signup',
      component: Singup,
    }
  ]
});


router.beforeEach((to, from, next) => {
    if(to.meta.requiredLogin && !store.state.user.isLogin){
      next('/login');
    }else if(to.meta.redirectAlreadyLogin && store.state.user.isLogin){
      next('/'); //已经login的再次访问login应该跳转到首页
    }else{
      next()
    }
})

export default router;
