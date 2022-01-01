<template>
  <div class="register-container w-350 mx-auto">
    <h4 class="my-4 text-center">登录</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入邮箱"
          type="text"
          ref="emailInputRef"
        />
      </div>
      <div class="form-group mb-3">
        <label class="form-label">密码</label>
        <validate-input
          placeholder="请输入密码"
          type="password"
          :rules="passwordRules"
          ref="passwordInputRef"
          v-model="passwordVal"
        />
      </div>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import createMessage from '@/utils/createMessage'
export default defineComponent({
  name: 'GlobalHeader',
  components:{
    ValidateForm,
    ValidateInput
  },
  setup(){
    const router = useRouter();
    const store = useStore();
    const emailInputRef = ref<any>();
    const passwordInputRef = ref<any>();
    const emailVal = ref('');
    const passwordVal = ref('');
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱地址' }
    ];
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
    ]
    const onFormSubmit = (res: boolean) => {
      console.log('res',res);
      if(res){
        const payload = {
          email: emailVal.value,
          password:passwordVal.value
        }
        store.dispatch('loginAndFetch', payload)
             .then(() => {
               //成功之后弹出框
               createMessage('登录成功,两秒之后跳转首页', 'success');
               setTimeout(() => {
                 router.push('/');
               }, 2000);
             }).catch(e => {
                console.log(e);
             })
       }
    }
    return {
      emailRules,
      passwordRules,
      emailVal,
      passwordVal,
      onFormSubmit,
      emailInputRef,
      passwordInputRef,
    }
  }
})
</script>
