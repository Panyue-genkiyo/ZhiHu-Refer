<template>
    <div class="signup-page mx-auto p-3 w-330">
       <validate-form @form-submit="onFormSubmit">
           <div class="mb-3">
               <label class="form-label">邮箱地址</label>
               <validate-input
                 :rules="emailRules"
                 v-model="formData.email"
                 placeholder="请输入邮箱地址"
                 type="text"
               />
           </div>
          <div class="mb-3">
           <label class="form-label">昵称</label>
           <validate-input
             :rules="nameRules"
             v-model="formData.nickName"
             placeholder="请输入昵称"
             type="text"
           />
         </div>
         <div class="mb-3">
           <label class="form-label">密码</label>
           <validate-input
             :rules="passwordRules"
             v-model="formData.password"
             placeholder="请输入密码"
             type="password"
           />
         </div>
         <div class="mb-3">
           <label class="form-label">重复密码</label>
           <validate-input
             :rules="repeatPasswordRules"
             v-model="formData.repeatPassword"
             placeholder="请重复输入上述密码"
             type="password"
           />
         </div>
         <div class="mb-3">
           <router-link to="/login">已经有账户了？去登录</router-link>
         </div>
         <template #submit>
           <button class="btn btn-primary w-100">注册新用户</button>
         </template>
       </validate-form>
    </div>
</template>

<script lang="ts">
    import { reactive, defineComponent } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
    import ValidateForm from '@/components/ValidateForm.vue'
    import createMessage from '@/utils/createMessage'
    export default defineComponent({
      components: { ValidateInput, ValidateForm },
      setup(){
        const formData = reactive({
          email: '',
          nickName: '',
          password: '',
          repeatPassword: ''
        });
        const router = useRouter();
        const emailRules: RulesProp = [
          { type: 'required', message: '电子邮箱不能为空' },
          { type: 'email', message: '请输入正确的电子邮箱格式' },
        ]
        const nameRules: RulesProp = [
          { type: 'required', message: '昵称不能为空'},
        ]
        const passwordRules: RulesProp = [
          { type: 'required', message: '密码不能为空'},
          { type: 'minLength', message: '密码至少6位' },
          { type: 'maxLength', message: '密码最多12位' }
        ]
        const repeatPasswordRules: RulesProp = [
          { type: 'required', message: '重复密码不能为空'},
          {
            type: 'custom',
            message: '密码不相同',
            validator: () => {
              return formData.password === formData.repeatPassword;
            }
          }
        ]

        const onFormSubmit = async (res: boolean) => {
          if(res){
            const payload = {
              email: formData.email,
              nickName: formData.nickName,
              password: formData.password,
            }
            axios.post('/api/users/', payload)
                 .then(data => {
                   createMessage('注册成功,正在跳转登录页','success');
                   setTimeout(() => {
                     router.push('/login');
                   }, 2000);
                 })
                 .catch(e => {
                   console.log(e);
                 })
            }
        }

        return {
          formData,
          emailRules,
          nameRules,
          passwordRules,
          repeatPasswordRules,
          onFormSubmit,
        }
      }
    })
</script>

<style>


</style>
