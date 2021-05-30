<template>
  <div class="my-component">
    <label :for="id" :class="required ? 'bold' : ''">{{ title }}</label>
    <input :class="!isEmpty && statusClass"
           :id="id"
           type="text"
           v-model="text">
    <div v-if="!isEmpty" :class="statusClass">
            {{ isValid ? "Данные корректны" : "Данные не корректны" }}
    </div>
  </div>
</template>

<script>
import {maxLength, minLength} from "vuelidate/lib/validators";
import {isNumber} from "../validators";

export default {
  name: "inputNumber",

  data(){
    return {
      text: "",
    }
  },

  mounted() {
    document.querySelector('#' + this.id).addEventListener(
        'input', function() {
          this.value = this.value.replace(/[^\d]/g, '')
        }
    )
  },

  validations: {
    text: {
      valid: isNumber,
      minLength: minLength(1),
      maxLength: maxLength(10)
    },
  },

  computed: {
    isValid: function (){
      let isValid = !this.$v.text.$invalid

      if (this.required)
        return this.text.length !== 0 && isValid

      return isValid
    },
    statusClass: function (){
      return this.isValid ? 'success' : 'error'
    },
    isEmpty: function (){
      return this.text.length === 0
    },
  },

  props: {
    id: String,
    title: String,
    required: Boolean,
  },
}
</script>

<style scoped>

</style>
