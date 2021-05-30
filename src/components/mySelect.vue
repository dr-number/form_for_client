<template>
  <div class="my-component">
    <label :for="id" :class="required ? 'bold' : ''">{{ title }}</label>
    <select :class="!isEmpty && statusClass"
            :id="id"
            v-model="selected" :multiple="!!multiselect">
      <option v-for="item in options" :value="item.title" :key="item.id">
        {{item.title}}
      </option>
    </select>
    <div v-if="!isEmpty" v-bind:class="statusClass">
          {{ isValid ? "Данные корректны" : "Данные не корректны" }}
      </div>
  </div>
</template>

<script>
import {minLength} from "vuelidate/lib/validators";

export default {
  name: "mySelect",

  data(){
    return {
      selected: "",
    }
  },

  props: {
    id: String,
    title: String,
    required: Boolean,
    multiselect: Boolean,
    options: []
  },

  validations: {
    selected: {
      minLength: minLength(1),
    },
  },

  computed: {
    isValid: function (){
      let isValid = !this.$v.selected.$invalid

      if (this.required)
        return this.selected.length !== 0 && isValid

      return isValid
    },
    statusClass: function (){
      return this.isValid ? 'success' : 'error'
    },
    isEmpty: function (){
      return this.selected.length === 0
    },
  },
}
</script>
