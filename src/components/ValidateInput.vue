<template>
  <div class="validate-input-container pb-3">
     <input
            v-if="tag !== 'textarea'"
            class="form-control"
            :class="{'is-invalid': inputRef.error}"
            :value="inputRef.val"
            @input="updateValue"
            @blur="validateInput"
            v-bind="$attrs"
     />
    <textarea
      v-else
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      :value="inputRef.val"
      @input="updateValue"
      @blur="validateInput"
      v-bind="$attrs"
    />
     <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted } from 'vue'
import { emitter } from './ValidateForm.vue'
const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
interface RuleProp{
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'custom',
  message: string;
  validator?: () => boolean
}
export type RulesProp = RuleProp[];
export type TagType = 'input' | 'textarea';
export default defineComponent({
  name: 'ValidateInput',
  inheritAttrs: false,
  props:{
    rules: {
      type: Array as PropType<RulesProp>,
    },
    modelValue: String,
    tag:{
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error:false,
      message: ''
    });
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      //自定义组件支持v-model发送事件
      context.emit('update:modelValue', targetValue);
    };
    const validateInput = () => {
      if(props.rules){
        const allPass = props.rules.every(rule => {
           let passed = true;
           inputRef.message = rule.message;
           switch(rule.type){
             case 'required':
               passed = inputRef.val.trim().length > 0;
               break;
             case 'email':
               passed = emailReg.test(inputRef.val);
               break;
             case 'minLength':
               passed = inputRef.val.length >= 6;
               break;
             case 'maxLength':
               passed = inputRef.val.length <= 12;
               break;
             case 'custom':
               passed = rule.validator ? rule.validator() : true;
               break;
             default:
               break;
           }
           return passed;
        });
        inputRef.error = !allPass;
        return allPass;
      }
      return true;
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateInput);
    });
    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>
