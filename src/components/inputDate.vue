<template>
  <div class="my-component">
    <label :for="id" :class="required ? 'bold' : ''">{{ title }}</label>
    <input :class="!isEmpty && statusClass"
           :id="id"
           type="date"
           :min="min" :max="max"
           v-model="text">
    <div v-if="!isEmpty" :class="statusClass">
            {{ isValid ? "Данные корректны" : "Данные не корректны" }}
    </div>
  </div>
</template>

<script>
import {isDate} from "../validators";

export default {
  name: "inputDate",

  data(){
    return {
      text: "",
    }
  },

  mounted() {
    document.querySelector('#' + this.id).addEventListener(
        'keyup', function() {
            this.value = ""
        }
    )
  },

  validations: {
    text: {
      valid: isDate
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
    min: String,
    max: String
  },
}
</script>

<style scoped>

</style>
