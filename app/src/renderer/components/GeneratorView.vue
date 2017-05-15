<template>
  <form v-on:submit.prevent="onSubmit" class="ui form">
    <div class="ui equal width padded grid container">
      <div class="row">
        <fieldset class="column group-message">
          <legend>メッセージ</legend>
          <div class="field">
            <label>
              <input v-model="message" class="form-control" value="" placeholder="本文">
            </label>
          </div>
          <div class="field">
            <label>
              <input v-model="detail" class="form-control" value="" placeholder="詳細">
            </label>
          </div>
        </fieldset>
      </div>

      <div class="row">
        <fieldset class="column group-icon">
          <legend>ダイアログのアイコン</legend>
          <div class="grouped fields">
            <div class="field" v-for="r in icon.iconOpt">
              <div class="ui radio checkbox">
                <input type="radio"
                v-model="icon.value"
                :name="icon.name"
                :value="r.value"
                :id="'icon' + r.value"
                :data-hoge="icon.value === r.value"/>
                <label :for="'icon' + r.value">{{r.label}}</label>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset class="column group-button">
          <legend>ダイアログのボタン</legend>
          <div class="grouped fields">
            <div class="field" v-for="r in btn.Opt">
              <div class="ui radio checkbox">
                <input type="radio"
                v-model="btn.value"
                :name="btn.name"
                :value="r.value"
                :id="'btn' + r.value"
                :checked="btn.value === r.value"/>
                <label :for="'btn' + r.value">{{r.label}}</label>
              </div>
            </div>
          </div>
        </fieldset>

      </div>
    </div>

    <button class="ui primary button" type="submit">Submit</button>
  </form>
</template>

<script>
const {dialog} = require('electron').remote

export default {
  components: {},
  name: 'generator-page',
  data: function () {
    return {
      message: '',
      detail: '',
      icon: {
        name: 'dialog-icon',
        value: 0,
        iconOpt: [
          { label: '質問', type: 'question', value: 0 },
          { label: '情報', type: 'info', value: 1 },
          { label: '警告', type: 'warning', value: 2 },
          { label: '中止', type: 'error', value: 3 },
          { label: 'なし', type: 'none', value: 4 }
        ]
      },
      btn: {
        name: 'dialog-button',
        value: 0,
        Opt: [
          { label: 'OK', value: 0 },
          { label: 'OK, キャンセル', value: 1 },
          { label: 'はい, いいえ', value: 2 },
          { label: 'はい, いいえ, キャンセル', value: 3 },
          { label: '再試行, キャンセル', value: 4 },
          { label: '中止, 再試行, 無視', value: 5 }
        ]
      }
    }
  },
  methods: {
    createDialog: function () {
      var type = this.pickDialogType()

      dialog.showMessageBox({
        message: this.message,
        detail: this.detail,
        type: type,
        buttons: this.pickBtnLabel()
      })
    },
    pickBtnLabel: function () {
      var btnLabel = this.btn.Opt[this.btn.value].label
      return (btnLabel) ? btnLabel.split(',') : ['']
    },
    pickDialogType: function () {
      var iconType = this.icon.iconOpt[this.icon.value].type
      return iconType
    },
    onSubmit: function () {
      this.createDialog()
    }
  }
}
</script>

<style scoped>
.ui.checkbox label {
  cursor: pointer;
}
</style>
