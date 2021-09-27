<template>
    <v-dialog
      v-model="subDialog"
      max-width="290"
      :light="light"
      :persistent="persistent"
    >
      <v-card>
        <v-card-title class="white--text lighten-1 font-weight-black grey darken-1 px-2 py-1">
          {{ title }}
        </v-card-title>

        <v-card-text class="pa-10 text-h6 d-flex align-center">
          <template v-if="alert_type">
              <v-icon class="px-1 text-h3 text--accent-4 light-green--text">mdi-check</v-icon>
              <span class="font-hk ma-0 text-center font-weight-medium black--text text-h4">
                  {{ success }}
              </span>
          </template>


          <template v-if="!alert_type">
              <v-icon class="px-1 text-h3 text--accent-4 red--text">mdi-alert-circle</v-icon>
              <p class="font-hk ma-0 text-center font-weight-medium black--text text-h4">
                  {{ error }}
              </p>
          </template>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        dialog: {
            type: Boolean,
            required: true,
            default: false,
        },
        light: {
            type: Boolean,
            default: false,
        },
        persistent: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            default: '系統訊息',
        },
        success: {
            type: String,
            default: '動作執行成功',
        },
        error: {
            type: String,
            default: '動作執行失敗',
        },
        alert_type: {
            type: Boolean,
            required: true,
            default: null,
        }
    },
    data() {
        return {

        }
    },
    methods: {
        // doneDate() {
        //     this.tab = 1
        // },
        // reset() {
        //     this.tab = 0
        //     this.menu_show = false
        //     this.date = null
        //     this.time = null
        //     this.value = null
        //     this.$refs.time_picker.selecting = 1
        // },
        // finish() {
        //     if(this.date && this.time) {
        //         this.menu_show = false
        //         this.value = this.date + ' ' + this.time
        //     }
        // },

    },
    computed: {
        subDialog: {
           get() {
                return this.dialog
            },
            set(val) {
                this.$emit('update:dialog', val)
            }
        }
    }
}
</script>