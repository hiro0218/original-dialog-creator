<template>
  <form v-on:submit.prevent="onSubmit" class="ui form">
    <div class="ui equal width centered padded grid">

      <div class="row">
        <fieldset class="column group-message">
          <legend>メッセージ</legend>
          <div class="field">
            <input v-model="message" class="form-control" value="" placeholder="本文">
          </div>
          <div class="field">
            <input v-model="detail" class="form-control" value="" placeholder="詳細">
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

    <button class="ui primary button" type="submit">ダイアログ作成</button>
  </form>
</template>

<script>
const path = require('path')
const {dialog} = require('electron').remote
const nativeImage = require('electron').remote.nativeImage

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
          { label: '情報', type: 'info', value: 0 },
          { label: '警告', type: 'warning', value: 1 },
          { label: '中止 / エラー', type: 'error', value: 2 },
          { label: 'なし', type: 'none', value: 3 }
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
      var iconType = this.pickDialogType()
      var iconPath = this.switchIcon(iconType)

      dialog.showMessageBox({
        message: this.message,
        detail: this.detail,
        icon: nativeImage.createFromPath(iconPath),
        cancelId: 1,
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
    switchIcon: function (type) {
      var iconPath = './app/icons/CoreServices/'

      switch (type) {
        case 'warning':
        // case 'question':
          iconPath = path.join(iconPath, 'AlertCautionIcon.png')
          break
        case 'error':
          iconPath = path.join(iconPath, 'AlertStopIcon.png')
          break
        case 'none':
          iconPath = path.join(iconPath, 'AlertNoneIcon.png')
          break
        case 'info':
        default:
          iconPath = path.join(iconPath, 'AlertNoteIcon.png')
          break
      }

      return iconPath
    },
    onSubmit: function () {
      this.createDialog()
    }
  }
}
</script>

<style scoped>
legend {
  font-weight: bold;
}
.ui.checkbox label {
  cursor: pointer;
}
</style>
