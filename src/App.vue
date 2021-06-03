<template>

  <div id="app">
    <form @submit.prevent="onSubmit">

      <input-text id="first-name" ref="first-name" title="Фамилия*" required />
      <input-text id="name" ref="name" title="Имя*" required />
      <input-text id="father-name" ref="father-name" title="Очество" />

      <input-phone id="phone" ref="phone" title="Номер телефона*" required />

      <input-date id="date-born" ref="date-born" title="Дата рождения*"
                  min="1900-01-01" max="2150-01-01" required />

      <my-select id="group-clients" ref="group-clients" title="Группа клиентов*"
                 :options="groupClients" multiselect required />

      <my-select id="doctor" ref="doctor" title="Лечащий врач" :options="doctors" />

      <div class="checkbox_no_sms">
        <input type="checkbox" name="no_sms" v-model="isNoSendSMS">
        <span>Не отправлять SMS</span>
      </div>

      <b class="address">Адрес:</b>
      <input-index id="index" ref="index" title="Индекс" />

      <input-text id="country" ref="country" title="Страна" />
      <input-text id="region" ref="region" title="Область" />
      <input-text id="city" ref="city" title="Город*" required />
      <input-text id="street" ref="street" title="Улица" />

      <input-number id="home" ref="home" title="Дом" />

      <my-select id="type-document" ref="type-document"
                 title="Тип документа*" :options="typeDocuments" required />

      <my-input id="doc-serial" ref="doc-serial" title="Серия" />
      <input-number id="doc-number" ref="doc-number" title="Номер" />

      <input-text id="doc-issued" ref="doc-issued" title="Кем выдан" />

      <input-date id="doc-date-issued" ref="doc-date-issued"
                title="Дата выдачи*" required="true"/>

      <div class="clear"></div>
      <b class="warning-info">*Поле обязательное для заполнения</b>

      <div class="clear"></div>
      <p :class="'warning-info ' + statusInfo">
        {{this.textLogged}}</p>

      <div class="clear"></div>
      <button type="submit">Создать клиента</button>

    </form>
  </div>

</template>



<script>

import MySelect from "./components/mySelect";
import InputText from "./components/inputText";
import InputPhone from "./components/inputPhone";
import InputDate from "./components/inputDate";
import InputIndex from "./components/inputIndex";
import InputNumber from "./components/inputNumber";
import MyInput from "./components/myInput";

export default {
  name: 'App',
  components: {
    MyInput,
    InputNumber,
    InputDate,
    InputPhone,
    InputText,
    InputIndex,
    MySelect,
  },

  data() {
    return {
      groupClients: [
        {"id": 1, "title" : "VIP"},
        {"id": 2, "title" : "Проблемные"},
        {"id": 3, "title" : "ОМС"},
      ],
      doctors: [
        {"id": "", "title": ""},
        {"id": 1, "title": "Иванов"},
        {"id": 2, "title": "Захаров"},
        {"id": 3, "title": "Чернышева"},
      ],
      typeDocuments: [
        {"id": 1, "title": "Паспорт"},
        {"id": 2, "title": "Свидетельство о рождении"},
        {"id": 3, "title": "Вод. удостоверение"},
      ],

      isNoSendSMS: false,
      textLogged: "",
      isErrorLogged: false
    }
  },

  computed:{
    statusInfo: function (){
      return this.isErrorLogged ? 'error-info' : 'success-info'
    }
  },

  methods:{

    isInvalid: function (component) {
      return !component.isValid
    },

    isError: function (){
      if(this.isInvalid(this.$refs["first-name"])) return true
      if(this.isInvalid(this.$refs.name)) return true
      if(this.isInvalid(this.$refs["father-name"])) return true
      if(this.isInvalid(this.$refs["date-born"])) return true
      if(this.isInvalid(this.$refs.phone)) return true
      if(this.isInvalid(this.$refs["group-clients"])) return true
      if(this.isInvalid(this.$refs.doctor)) return true

      if(this.isInvalid(this.$refs.index)) return true
      if(this.isInvalid(this.$refs.country)) return true
      if(this.isInvalid(this.$refs.region)) return true
      if(this.isInvalid(this.$refs.city)) return true
      if(this.isInvalid(this.$refs.street)) return true
      if(this.isInvalid(this.$refs.home)) return true

      if(this.isInvalid(this.$refs["type-document"])) return true
      if(this.isInvalid(this.$refs["doc-serial"])) return true
      if(this.isInvalid(this.$refs["doc-number"])) return true
      if(this.isInvalid(this.$refs["doc-issued"])) return true
      if(this.isInvalid(this.$refs["doc-date-issued"])) return true

      return false
    },

    createMessage: function (){
      const fio = this.$refs["first-name"].text + " "
          + this.$refs.name.text + " "
          + this.getNotRequiredData(this.$refs["father-name"].text)

      const dateBorn = "дата рождения: " + this.$refs["date-born"].text
      const phone = "контактный телефон: " + this.$refs.phone.text.substr(0, 17)

      const groupClients = this.getMultiSelectData(this.$refs["group-clients"], "группа клиентов:")
      const doctor = "лечащий врач: " + this.getNotRequiredData(this.$refs.doctor.selected)

      const infoSMS = this.isNoSendSMS ? "Не отправлять SMS" : "Отправлять SMS"

      const index = this.getNotRequiredData(this.$refs.index.text, "индекс:")
      const country = this.getNotRequiredData(this.$refs.country.text, "страна:")
      const region = this.getNotRequiredData(this.$refs.region.text, "область:")
      const city = "город: " + this.$refs.city.text

      const street = this.getNotRequiredData(this.$refs.street.text, "улица:")
      const home = this.getNotRequiredData(this.$refs.home.text, "дом:")

      const docType = this.getNotRequiredData(this.$refs["type-document"].selected, "тип документов:")
      const docSerial = this.getNotRequiredData(this.$refs["doc-serial"].text, "серия:")
      const docNumber = this.getNotRequiredData(this.$refs["doc-number"].text, "номер:")
      const docIssued = this.getNotRequiredData(this.$refs["doc-issued"].text, "кем выдан:")
      const docDateIssued = "дата выдачи: " + this.$refs["doc-date-issued"].text

      return "Клиент добавлен! Данные клиента: \n"
          + fio + "\n"
          + dateBorn + "\n"
          + phone + "\n"
          + groupClients
          + doctor + "\n"
          + infoSMS + "\n"
          + index  + country + region + city + "\n"
          + street + home
          + docType + docSerial + docNumber + docIssued + docDateIssued
    },

    getNotRequiredData: function (text, prefix=""){
      if(text.length !== 0)
        return prefix + " " + text + "\n"

      return ""
    },

    getMultiSelectData: function (data, prefix){
      let result = ""
      data.selected.forEach(function(title) {
        result += title + "; "
      })

      if (result.length !== 0)
        result = "\n "+ prefix +" \n" + result + "\n"

      return result
    },

    onSubmit() {

      this.isErrorLogged = this.isError()

      if(!this.isErrorLogged){
        this.textLogged = "Клиент успешно добавлен!"
        alert(this.createMessage())
      }
      else{
        this.textLogged = "Форма заполнена некорректно!"
      }

    }
  }
}
</script>

<style lang="sass">
$colorError: red
$colorSuccess: green
$colorBody: #ddf3d5

$borderSuccess: 2px solid $colorSuccess
$borderError: 2px solid $colorError

input[type="text"]
  text-transform: capitalize

body
  margin: 0
  padding: 0
  background-color: $colorBody

form
  padding: 10px
  display: grid
  grid-gap: 1rem
  margin: 1rem 0
  grid-template-columns: minmax(10px, 1fr) minmax(230px, 320px) minmax(70px, 320px) minmax(10px, 1fr)
  border-radius: 10px

button, .warning-info
  grid-column: 2/4
  text-align: center

.error-info
  color: $colorError

.success-info
  color: $colorSuccess

input, select
  outline: none

.checkbox_no_sms, .address
  display: grid
  grid-template-columns: 1fr 10fr
  grid-column: 2

/*======================================================================

.my-component
  display: grid
  grid-template-columns: repeat(7, 2fr)
  grid-column: 2/4

  label
    grid-column: 1/3

div.success, div.error, button, label, input, option, select
  padding: 10px

select, option
  background-color: white

.my-component
  input, select
    grid-column: 3/6

div
  &.success, &.error
    grid-column: 6/8
    text-align: end

input, select, button
  border: 2px solid #cdccea
  border-radius: 2px

  &.success
    border: $borderSuccess

select.success, input.success
  border: $borderSuccess

button.error, select.error, input.error
  border: $borderError

div
  &.success
    color: $colorSuccess

  &.error
    color: $colorError

.bold
  font-weight: bold

.clear
  clear: both

/*
 * @media screen and (min-width: 1908px)
 * @media screen and (min-width: 1500px)
 * @media screen and (max-width: 1366px)
 * @media screen and (max-width: 1200px)
 * @media screen and (max-width: 992px)

@media screen and (max-width: 768px)
  .my-component
    input, select
      grid-column: 3/8

  div
    &.error, &.success
      display: none
/*
 * @media screen and (max-width: 576px)
 * @media screen and (max-width: 500px)
 * @media screen and (max-width: 320px)


</style>
