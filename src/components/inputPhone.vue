<template>
  <div class="my-component">
    <label :for="id" :class="required ? 'bold' : ''">{{ title }}</label>
    <input :class="!isEmpty && statusClass"
           :id="id"
           type="tel"
           v-model="text">
    <div v-if="!isEmpty" :class="statusClass">
            {{ isValid ? "Данные корректны" : "Данные не корректны" }}
    </div>
  </div>
</template>

<script>
import {isPhone} from "../validators";

export default {
  name: "inputPhone",

  data(){
    return {
      text: "",
    }
  },

  mounted() {
    document.querySelector('#' + this.id).addEventListener(
        'input', function() {

          let txt = this.value.replace(/[^\d]/g, '');

          if (txt.charAt(0) === '7')
            txt = txt.substr(1);

          txt = txt.substr(0, 10)
          let length = txt.length

          if (length >= 1 && length <= 3)
            txt = txt.replace(/^(\d{1,3}).*/, '7 ($1');
          else if (length >= 4 && length <= 6)
            txt = txt.replace(/^(\d{3})(\d{1,3}).*/, '7 ($1) $2');
          else if (length >= 7 && length <= 8)
            txt = txt.replace(/^(\d{3})(\d{3})(\d{1,2}).*/, '7 ($1) $2 $3');
          else if (length >= 9 && length <= 10)
            txt = txt.replace(/^(\d{3})(\d{3})(\d{2})(\d{1,2}).*/, '7 ($1) $2 $3-$4');

          this.value = txt

          //console.log(this.value[this.value.length - 1])
          //console.log(this.value)
        }
    )
  },

  validations: {
    text: {
      valid: isPhone
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
