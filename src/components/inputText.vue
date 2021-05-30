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
import {isRus} from "../validators";

export default {
  name: "inputText",

  data(){
    return {
      text: "",
    }
  },

  validations: {
    text: {
      valid: isRus
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
