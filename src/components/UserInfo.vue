<template>
    <v-container>
        <p class="text-h4 font-weight-black">我的檔案</p>
        <p class="font-hk">管理你的檔案以保護你的帳戶</p>
        
        <v-divider></v-divider>
        
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="mt-5"
        >
          <v-text-field class="font-hk" label="使用者帳號" :value="account" readonly outlined />
          <v-btn class="blue lighten-3 mb-5 mt-n5" @click="changePwd">修改密碼</v-btn>
          <template v-if="changePwdState" class="">
            <v-text-field
                v-model="password" 
                :rules="passwordRules" 
                label="使用者密碼" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
                :type="show ? 'text' : 'password'" 
                @click:append="show = !show" 
                required
                outlined
            >
            </v-text-field>
            <v-text-field 
                v-model="password2" 
                :rules="password2Rules" 
                label="使用者密碼二次確認" 
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" 
                :type="show2 ? 'text' : 'password'" 
                @click:append="show2 = !show2" 
                required
                outlined
            >
            </v-text-field>
          </template>

          <v-text-field class="font-hk" label="姓名" v-model="name" :rules="nameRules" outlined />
          <v-text-field class="font-hk" label="Email" v-model="email" :rules="emailRules" outlined />
          <v-btn @click="save" color="success">存檔</v-btn>

        </v-form>

          <v-dialog
            v-model="dialog"
            max-width="290"
            :light="true"
          >
            <v-card>
              <v-card-title class="white--text lighten-1 font-weight-black grey darken-1 px-2 py-1">
                系統訊息
              </v-card-title>

              <v-card-text class="pa-10 text-h6 d-flex align-center">
                <template v-if="showAlert">
                    <v-icon class="px-1 text-h3 text--accent-4 light-green--text">mdi-check</v-icon>
                    <span class="font-hk ma-0 text-center font-weight-medium black--text text-h4">
                        更新成功
                    </span>
                </template>


                <template v-if="!showAlert">
                    <v-icon class="px-1 text-h3 text--accent-4 red--text">mdi-alert-circle</v-icon>
                    <p class="font-hk ma-0 text-center font-weight-medium black--text text-h4">
                        更新失敗
                    </p>
                </template>

              </v-card-text>
            </v-card>
          </v-dialog>

        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="70">
                <p class="mt-5 font-weight-black">處理中...</p>
            </v-progress-circular>
        </v-overlay>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            valid: false,
            showAlert: true,
            account: '',
            rules: {
                required: (v, field) => !!v || field + ' is required.',
            },
            name: '',
            nameRules: [
                v => this.rules.required(v, '姓名'),
            ],
            email: '',
            emailRules: [
                v => this.rules.required(v, 'Email'),
            ],
            password: '',
            passwordRules: [
                v => this.rules.required(v, '使用者密碼不相同'),
            ],
            password2: '',
            password2Rules: [
                v => this.changePwdState === false || this.rules.required(v, '使用者密碼二次確認'),
                v => v == this.password || '使用者密碼二次確認與使用者密碼不相同',
            ],
            show: false,
            show2: false,
            changePwdState: false,
            overlay: false,
            dialog: false,
            ref: false,
        }
    },
    watch: {
        user: {
            handler: function(user) {
                console.log('I Watch!')
                if(user) {
                    this.account = user.u_no
                    this.name = user.name
                    this.email = user.email
                    this.ref = true
                }
            },
        }
    },
    beforeMount() {
        let user = this.$store.state.user || null
        if(user) {
            this.account = user.u_no
            this.name = user.name
            this.email = user.email
        }
       
    },
    methods: {
        async save() {
            this.overlay = true

            if(this.$refs.form.validate()) {
                let putJson = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                }

                for(let item in putJson) {
                    if(putJson[item] == null || putJson[item] == undefined || putJson[item] == '') {
                        delete putJson[item]
                    }
                }

                let putHeader = {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                }
                // console.log('SAVE!', this.name, this.email)
                console.log(process.env.VUE_APP_API_PATH + '/api/user/' + this.$store.getters.user.id)
                await this.axios.put(process.env.VUE_APP_API_PATH + '/api/user/' + this.$store.getters.user.id, putJson, putHeader).then(response => {
                    console.log('AXIOS', response)
                    this.$store.dispatch('setUser', localStorage.getItem('token'))
                }).catch(error => {
                    console.log('AXIOS', error)
                })
                this.dialog = true
                this.showAlert = true
                this.overlay = false
                this.password = this.password2 = null
                this.changePwdState = false
            } else {
                console.log('Error!')
                this.overlay = false
                this.dialog = true
                this.showAlert = false
            }
        },
        changePwd() {
            this.changePwdState = !this.changePwdState
            if(this.changePwdState === false) {
                this.password = this.password2 = ''
            }
        },
    },
    computed: {
        ...mapGetters([
            'user'
        ]),
    }
}
</script>
