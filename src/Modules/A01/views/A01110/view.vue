<template>
  <v-container>
    <h1>view.</h1>
    <v-sheet
        class="pa-2 grey lighten-4"
        rounded="rounded"
        elevation="3"
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
          disabled
          outlined
      ></v-text-field>

      <v-checkbox
          v-model="formData.state"
          :label="`活動類別使用狀態(${this.formData.state ? '使用中' : '停用'})`"
          disabled
      ></v-checkbox>

      <v-btn :to="{ name: 'A01110' }" color="error">
        <v-icon>
          mdi-logout
        </v-icon>
        <span>離開</span>
      </v-btn>
    </v-sheet>

    <Overlay :overlay.sync="overlay"></Overlay>

  </v-container>
</template>
<script>
import Overlay from '@/components/_CoreComponents/_Overlay.vue'

export default {
  created() {
    this.overlay = true
  },
  async mounted() {
    console.log('VIEW: ' + this.$route.params.id)
    let result = await this.axios.get(`/api/activity/ActivityType/${this.$route.params.id}`)
        .catch(() => {
          this.overlay = false
          console.log('nono')
        })
    this.formData = result.data
    this.overlay = false
  },
  data() {
    return {
      overlay: false,
      formData: {
        type_code: null,
        type_name: null,
        state: false,
      },
    }
  },
  components: {
    Overlay
  },
  methods: {}
}
</script>