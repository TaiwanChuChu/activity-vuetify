<template>
        <v-container>
            <h1>會員註冊</h1>

            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                class="mt-5"
            >
                <v-text-field
                    label="帳號"
                    v-model="account"
                    :rules="accountRules"
                    required
                    outlined
                ></v-text-field>
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
                <v-text-field
                    label="姓名"
                    v-model="name"
                    :rules="nameRules"
                    required
                    outlined
                ></v-text-field>
                <v-text-field
                    label="Email"
                    v-model="email"
                    :rules="emailRules"
                    required
                    outlined
                ></v-text-field>
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
                            註冊成功，請回首頁重新登入
                        </span>
                    </template>


                    <template v-if="!showAlert">
                        <v-icon class="px-1 text-h3 text--accent-4 red--text">mdi-alert-circle</v-icon>
                        <p class="font-hk ma-0 text-center font-weight-medium black--text text-h4">
                            註冊失敗
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
export default {
    data() {
        return {
            valid: false,
            dialog: false,
            overlay: false,
            showAlert: null,
            rules: {
                required: (v, field) => !!v || field + ' 尚未填寫!',
            },
            account: null,
            accountRules: [
                v => this.rules.required(v, '帳號'),
            ],
            name: null,
            nameRules: [
                v => this.rules.required(v, '姓名'),
            ],
            email: null,
            emailRules: [
                v => this.rules.required(v, 'Email'),
            ],
            show: false,
            password: null,
            passwordRules: [
                v => this.rules.required(v, '使用者密碼'),
            ],
            show2: false,
            password2: null,
            password2Rules: [
                v => this.rules.required(v, '使用者密碼二次確認'),
                v => v == this.password || '使用者密碼二次確認與使用者密碼不相同',
            ],
        }
    },
    methods: {
        save() {
            this.dialog = true
            
            if(this.$refs.form.validate()) {
                let putJson = {
                    u_no: this.account,
                    password: this.password,
                    name: this.name,
                    email: this.email,
                }

                this.overlay = true
                console.log(process.env.VUE_APP_API_PATH + '/api/user')
                this.axios.post(process.env.VUE_APP_API_PATH + '/api/user', putJson)
                .then(response => {
                    console.log('AXIOS', response)
                    this.showAlert = true
                    this.overlay = false
                    
                    setTimeout(
                        function (r) {
                            r.push('/login')
                        }
                    , 3000, this.$router)
                }).catch(error => {
                    console.log('AXIOS Error', error)
                    this.showAlert = false
                    this.overlay = false
                })
               
            } else {
                console.log('Error!')
                this.showAlert = false
                this.overlay = false
            }
        }
    }
}
</script>