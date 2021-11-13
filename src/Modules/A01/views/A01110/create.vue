<template>
  <v-container>
    <h1>create.</h1>
    <v-sheet
        class="pa-2 grey lighten-4"
        rounded="rounded"
        elevation="3"
    >
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="mt-5"
      >
        <v-text-field
            label="活動類別代碼"
            v-model="formData.type_code"
            :rules="type_codeRules"
            outlined
        ></v-text-field>

        <v-text-field
            label="活動類別名稱"
            v-model="formData.type_name"
            :rules="type_nameRules"
            outlined
        ></v-text-field>

        <v-checkbox
            v-model="formData.state"
            :label="`活動類別使用狀態(${this.formData.state ? '使用中' : '停用'})`"
        ></v-checkbox>
      </v-form>

      <v-btn @click="save" color="success">
        <v-icon>
          mdi-content-save
        </v-icon>
        <span>存檔</span>
      </v-btn>
      <span class="mx-2"></span>
      <v-btn :to="{ name: 'A01110' }" color="error">
        <v-icon>
          mdi-logout
        </v-icon>
        <span>離開</span>
      </v-btn>
    </v-sheet>

    <Dialog :dialog.sync="dialog" success="新增成功" error="新增失敗" :alert_type="alert_type" :persistent="false"></Dialog>
    <Overlay :overlay.sync="overlay"></Overlay>

  </v-container>
</template>
<script>
import Dialog from '@/components/_CoreComponents/_Dialog.vue'
import Overlay from '@/components/_CoreComponents/_Overlay.vue'

export default {
  mounted() {
    console.log('CREATE: ' + this.$route.params.id)
  },
  data() {
    return {
      valid: false,
      overlay: false,
      formData: {
        type_code: null,
        type_name: null,
        state: false,
      },
      dialog: false,
      alert_type: true,
      rules: {
        required: (v, field) => !!v || field + ' 尚未填寫!',
      },
      type_codeRules: [
        v => this.rules.required(v, '活動類別代碼'),
      ],
      type_nameRules: [
        v => this.rules.required(v, '活動類別名稱'),
      ]

    }
  },
  components: {
    Dialog,
    Overlay
  },
  methods: {
    async save() {
      if (this.$refs.form.validate()) {
        this.overlay = true
        console.log('data', this.formData)
        let result = await this.axios.post('/api/activity/ActivityType', this.formData).catch(() => {
          this.alert_type = false
          this.overlay = false
          console.log('nono')
        })

        if (result) {
          console.log("hihi", result)
          this.alert_type = true
        }
        this.dialog = true
        this.overlay = false
        this.reset()
      }
    },
    reset() {
      this.$refs.form.reset()
      // for(let item in this.formData) {
      //     this.formData[item] = null
      // }
      this.formData.state = false
    }
  }
}
</script>