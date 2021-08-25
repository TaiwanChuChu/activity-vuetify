<template>
  <v-main>
    <!-- <v-alert
    type="success"
    dismissible
    v-model="alert"
    :loading="true"
  >
  幹你娘基八仙捷電腦 -->
  <!-- <template #prepend>
    <v-icon>mdi-account</v-icon>
  </template> -->
   <!-- <template #close>
    <v-icon>mdi-account</v-icon>
  </template> -->
  <!-- </v-alert> -->
  <!-- <v-btn v-if="!alert" @click="alert = !alert">RESET</v-btn> -->
  <!-- <test>
    <template v-slot:test="{ msg22, on }">
        <h1>{{ msg22 }}</h1>
        <button v-on="on" @click="function() {alert(123)}">click me</button>
    </template>
  </test> -->
  <v-card
        :loading="loading"
        class="mx-auto my-12"
        max-width="400"
      >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="5"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-card-text 
        class="text-center light-blue accent-2 mb-2"
      >
        <v-icon x-large class="white--text">mdi-account-circle</v-icon>
      </v-card-text>

      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-card-text>
          <v-text-field
            v-model="account"
            :rules="accountRules"
            label="Account"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            required
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="deep-purple lighten-2"
            text
            @click="login"
            :loading="loginLoading"
          >
            Login
          </v-btn>
          <v-btn
            color="deep-purple lighten-2"
            text
            @click="register"
          >
            Register
          </v-btn>

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
                <template v-if="!showAlert">
                    <v-icon class="px-1 text-h3 text--accent-4 red--text">mdi-alert-circle</v-icon>
                    <p class="font-hk ma-0 text-center font-weight-medium black--text text-h4">
                        登入失敗
                    </p>
                </template>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-main>
</template>

<script>
// var test = {
//   template: `
//     <div>
//       <h1>Fuck Component</h1>
//       <slot name="test" :msg22="msg2" :x="X" v-on="on">Default TEST</slot>
//       <p>{{ msg }}</p>
//     </div>
//   `,
//   mounted: function() {
//     console.log('CComponent mounted')
//     const on = {
//       'click': () => alert(123),
//       'mouseup': () => alert(456),
//     }
    
//     Object.keys(on).forEach((event) => {
//       this.$on(event, on[event])
//     })
    
//   },
//   data () {
//     return {
//       msg: 'test template123123123!',
//       msg2: 'FUCKKKKKKKKKK',
//       X: [1,2,3,4,5,6],
//     }
//   }
// }
export default {
  // components: {
  //   'test': test,
  // },
  // mounted() {
  //   if(localStorage.getItem('token')) {
  //     localStorage.removeItem('token')
  //   }
  // },
  data: () => ({
    data: '',
    dialog: false,
    showAlert: true,
    loading: false,
    loginLoading: false,
    selection: 1,
    valid: true,
    account: '',
    accountRules: [
      v => !!v || 'Account is required'
    ],
    show: false,
    password: '',
    passwordRules: [
      v => !!v || 'Password is required'
    ],
  }),

  methods: {
    login () {
      this.loginLoading = true
      if(this.$refs.form.validate() === true) {
        this.progess()
        this.$store.dispatch('login', {
              account: this.account,
              password: this.password,
        }).then(() => {
          console.log('dispatch !! -- redirect')
          this.loginLoading = false
          this.$store.dispatch('redirect')
        }).catch((err) => {
          console.log('login err', err)
          this.dialog = true
          this.showAlert = false
          this.loginLoading = false
        })
      } else {
        console.log('login fail!')
        this.loginLoading = false
      }
    },
    register() {
      this.$router.push('/register')
    },
    progess () {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    }
  },
}
</script>