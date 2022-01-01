import { createApp } from 'vue'
import axios from 'axios';
import router from '@/router'
import store from '@/store'
import App from './App.vue'

axios.interceptors.request.use(function (config){
   //在每次请求前都加上loading
   store.commit('setLoading',true);
   //开始的时候重置error为false
   store.commit('setError', {
    status: false,
   });
   return config
})

axios.interceptors.response.use(function (response){
   //在每次请求后都去掉loading
   store.commit('setLoading',false);
   return response
}, function (e){
  // console.log(e.response);
  const { error } = e.response.data;
  store.commit('setError', {
    status: true,
    message: error
  });
  //出现错误也停止loading
  store.commit('setLoading',false);
  return Promise.reject(error);
})

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app')
