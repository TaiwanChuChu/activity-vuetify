<template>
  <v-container>
    <h1>edit.</h1>
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
            disabled
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

    <Dialog :dialog.sync="dialog" success="更新成功" error="更新失敗" :alert_type="alert_type" :persistent="false"></Dialog>
    <Overlay :overlay.sync="overlay"></Overlay>

  </v-container>
</template>
<script>
import Dialog from '@/components/_CoreComponents/_Dialog.vue'
import Overlay from '@/components/_CoreComponents/_Overlay.vue'

export default {
  created() {
    this.overlay = true
  },
  async mounted() {
    console.log('EDIT: ' + this.$route.params.id)
    let result = await this.axios.get(`/api/activity/ActivityType/${this.$route.params.id}`, {
      headers: {
        'X-Methods': 'edit',
      }
    })
        .catch(() => {
          this.overlay = false
          console.log('nono')
        })
    this.formData = result.data
    this.overlay = false
  },
  data() {
    return {
      valid: false,
      dialog: false,
      alert_type: true,
      overlay: false,
      formData: {},
      rules: {
        required: (v, field) => !!v || field + ' 尚未填寫!',
      },
      type_nameRules: [
        v => this.rules.required(v, '活動類別名稱'),
      ]
    }
  },
  components: {
    Overlay,
    Dialog
  },
  methods: {
    async save() {
      if (this.$refs.form.validate()) {
        this.overlay = true
        console.log('data', this.formData)
        let result = await this.axios.put(`/api/activity/ActivityType/${this.$route.params.id}`, {
          id: this.formData.id,
          type_name: this.formData.type_name,
          state: this.formData.state,
        }).catch(() => {
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
      }
    }
  }
}
</script>