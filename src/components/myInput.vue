<!-- Компонент без валидации -->
<template>
  <div class="my-component">
    <label :for="id">{{ title }}</label>
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

export default {
  name: "myInput",

  data(){
    return {
      text: "",
    }
  },

  computed: {
    isValid: function (){
      // при необходимости прописать валтдацию
      return true
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

/*
.clear-text{
  position: absolute;
}
  .my-input{
    display: grid;
    grid-template-columns: repeat(7, 2fr);
    grid-column: 2/4;
  }

  .my-input label{
    grid-column: 1/3;
  }

  .my-input input{
    grid-column: 3/5;
  }
  input.success{
    border: 2px solid green;
    border-radius: 2px;
  }
  input.error{
    border: 2px solid red;
    border-radius: 2px;
  }

  div.success, div.error{
    grid-column: 5/8;
    text-align: end;
  }
  div.success{
    color: green;
  }
  div.error{
    color: red;
  }
 */
</style>
