<template>
    <v-dialog
        v-model="subDialog"
        max-width="290"
        ref="Rdialog"
        :light="light"
        :persistent="persistent"
      >
        <v-card>
          <v-card-title class="text-h5">
            {{ title }}
          </v-card-title>

          <v-card-text class="text-h6">
            {{ confirm_title }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              text
              @click="done(false)"
            >
              {{ cancel_text }}
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              @click="done(true)"
            >
              {{ done_text }}
            </v-btn>
          </v-card-actions>
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
        confirm_title: {
            type: String,
            default: '確定要執行動作?',
        },
        done_text: {
            type: String,
            default: '確定',
        },
        cancel_text: {
            type: String,
            default: '取消',
        }
    },
    data() {
        return {

        }
    },
    methods: {
        done(val) {
            this.$emit('_confirm:done', val)
            //this.subDialog = val
        }
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