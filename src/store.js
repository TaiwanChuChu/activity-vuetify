import Vue from 'vue'
import Vuex from 'vuex'
import axios from './core/_axios'
import router from './router/router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      // 取不到token直接設定
      if (!localStorage.getItem('token')) {
        localStorage.setItem('token', payload.access_token)
        // 有取到token，但如果token不一樣就要重新設定，避免使用的是過期token
      } else if (localStorage.getItem('token') && localStorage.getItem('token') != payload.access_token) {
        localStorage.setItem('token', payload.access_token)
      }
    },
    logOut(state) {
      state.user = null
    },
  },
  actions: {
    async login({ dispatch }, payload) {
      let data = await axios.post('/oauth/token', {
        grant_type: 'password',
        client_id: `${process.env.VUE_APP_OAUTH_CLIENT_ID}`,
        client_secret: process.env.VUE_APP_OAUTH_SECURITY_KEY,
        username: payload.account,
        // username:'user_40170964',
        password: payload.password,
        // password:'password',
        scope: '',
      });

      await dispatch('setUser', data.access_token)
    },

    async setUser({ commit }, payload) {
      console.log('setUser ------------------------')

      if (payload == null || payload == undefined) {
        return false
      }

      let data = await axios.get('/api/user', {
        headers: {
          'Authorization': `Bearer ${payload}`
        }
      });
      data.data[0]['access_token'] = payload

      await commit('setUser', data.data[0])
    },
    async logOut({ commit }, flag) {
      console.log('LOGOUT!!!', flag)
      if (flag === false) return
      await axios.post('/api/user/logout')
      localStorage.removeItem('token')
      commit('logOut')
      router.push({ name: 'login' }).then().catch(() => { })
    },
    redirect({ state }) {
      // console.log('redirect----------------')
      router.push({ name: 'Home', params: { userId: state.user.id } })
    },
    // async checkLogin(payload) {
    //   console.log('CHECK LOGIN')
    //   await axios.get('/api/user', {
    //     headers: {
    //       'Authorization': `Bearer ${payload}`
    //     }
    //   })
    //     .then(response => {
    //       console.log('setUser ------------------------')
    //       response.data.access_token = payload
    //       console.log('setUser------------------resolve-------------', response)
    //       commit('setUser', response.data)
    //     }).catch(err => {
    //       console.log(err)
    //     })
    //   console.log('CHECK LOGIN END')
    // }
  },
  getters: {
    user: state => {
      console.log('getters::::::::' + state.user)
      return state.user
    }
  }
})

export default store