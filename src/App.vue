<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link to="/" class="d-flex">
          <v-img
            alt="Vuetify Logo"
            class="shrink"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />

          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>
      <!-- <v-btn v-if="isLogin()">TEST2</v-btn> -->
      <!-- <v-btn @click="myGlobalMethod">myGlobalMethod</v-btn> -->
      <!-- <router-link v-if="user" to="/home" class="white--text" >Home</router-link> -->
      <!-- <a v-if="user" @click="logOut()" class="white--text">Log Out</a> -->
      
      <div class="mx-2">
          <v-btn icon :plain="true" v-if="user" @click.stop="dialog = true">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
          
          <v-dialog
            v-model="dialog"
            max-width="290"
            ref="Rdialog"
            :light="true"
            :return-value="flag"
            @update:return-value="logOut"
            :persistent="true"
          >
            <v-card>
              <v-card-title class="text-h5">
                登出
              </v-card-title>

              <v-card-text class="text-h6">
                確定要登出系統?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="green darken-1"
                  text
                  @click="dialogLogout(false)"
                >
                  取消
                </v-btn>

                <v-btn
                  color="green darken-1"
                  text
                  @click="dialogLogout(true)"
                >
                  確定
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        
        <v-btn v-if="user" icon :plain="true" to="/home">
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn v-if="user" icon :to="'/User/' + user.id" :plain="true">
          <v-icon>mdi-account-tie</v-icon>
        </v-btn>

        <v-btn v-if="!user" icon to="/login" :plain="true">
          <v-icon>mdi-account</v-icon>
        </v-btn>

      </div>

    </v-app-bar>

    <v-main class="">
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+HK:wght@500&display=swap');
  .font-hk {
    font-family: 'Noto Sans HK', sans-serif;
  }
</style>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "App",

  data: () => ({
     dialog: false,
     flag: false,
  }),
  methods: {
    ...mapActions([
      'logOut',
    ]),

    dialogLogout(val) {
      console.log('dialogLogout', val)
      this.dialog = false
      this.$refs.Rdialog.save(val)
    },
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  }
};
</script>
