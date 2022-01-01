import { createStore, Commit } from 'vuex'
import axios from 'axios'
import { getToken, setToken, removeToken } from '@/utils/auth'

interface ImageProps{
  _id?: string,
  url?: string,
  createdAt?:string
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface PostProps {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt: string;
  column: string;
}

export interface UserProps{
  isLogin: boolean,
  nickName?: string,
  _id?: string,
  column?: string,
  email?:string,
}

export interface GlobalErrorProps{
  status: boolean,
  message?: string
}

export interface GlobalState {
  error: GlobalErrorProps,
  token:string,
  loading:boolean,
  user: UserProps,
  posts: PostProps[],
  columns: ColumnProps[]
}


const getAndCommit = async (url: string, mutationName: string, commit:Commit) => {
  const { data } = await axios.get(url);
  commit(mutationName, data);
}

const postAndCommit = async (url: string, mutationName: string, commit:Commit, payload:any) => {
  const { data } = await axios.post(url, payload);
  console.log(data);
  commit(mutationName, data);
  return data;
}


const store = createStore<GlobalState>({
  state:{
     error:{
       status:false
     },
     token: getToken(),
     loading:false,
     columns: [],
     posts: [],
     user: {
       isLogin: false,
     }
  },
  mutations:{
    //mutation只能是同步操作
    // login(state){
    //   state.user = {...state.user, isLogin: true, name: 'viking', columnId:1}
    // },
    createPost(state, newPost){
      state.posts.push(newPost);
    },
    fetchColumns(state, columns){
      state.columns = columns.data.list;
    },
    fetchColumn(state, column){
      state.columns = [column.data];
    },
    fetchPosts(state, posts){
      state.posts = posts.data.list;
    },
    setLoading(state, loading){
      state.loading = loading;
    },
    login(state, user){
       const { token } = user.data;
       state.token = token;
      //持久化信息(localstorage)
       setToken(token);
       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    logout(state){
       state.token = '';
       state.user = {isLogin: false};
       removeToken();
    },
    fetchCurrentUser(state, currentUser){
       state.user = { isLogin: true, ...currentUser.data };
    },
    setError(state, e: GlobalErrorProps){
      state.error = e;
    },
  },
  actions:{
    //action可以是异步操作 同时发出一个mutation
    fetchColumns({ commit }) {
      //发送异步请求获取列表数据
      getAndCommit('/api/columns', 'fetchColumns', commit);
    },
    //获取单个专栏
    fetchColumn({ commit }, cid){
      getAndCommit(`/api/columns/${cid}`, 'fetchColumn', commit);
    },
    //获取单个专栏下的post
    fetchPosts({ commit }, cid){
      getAndCommit(`/api/columns/${cid}/posts`, 'fetchPosts', commit);
    },
    //获取当前用户
    fetchCurrentUser({ commit }){
      getAndCommit('/api/user/current', 'fetchCurrentUser', commit);
    },
    login({ commit }, payload){
      return postAndCommit('/api/user/login', 'login', commit, payload);
    },
    //组合action(login and fetch)
    loginAndFetch({ dispatch }, loginData){
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  },
  getters:{
    getColumnById(state){
      //高阶函数
      return (id: string) => {
        return state.columns.find(column => column._id === id)
      }
    },
    getPostsByCid(state){
      return (cid: string) => {
        return state.posts.filter(post => post.column === cid )
      }
    }
  }
});

export default store
