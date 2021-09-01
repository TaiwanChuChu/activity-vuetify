import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
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
      if(!localStorage.getItem('token')) {
        localStorage.setItem('token', payload.access_token)
      // 有取到token，但如果token不一樣就要重新設定，避免使用的是過期token
      } else if(localStorage.getItem('token') && localStorage.getItem('token') != payload.access_token) {
        localStorage.setItem('token', payload.access_token)
      }
    },
    logOut(state) {
      state.user = null
    },
    // updateUserName(state, payload) {
    //   state.user.name = payload
    // },
    // updateUserEmail(state, payload) {
    //   state.user.email = payload
    // }
  },
  actions: {
    async login({ dispatch }, payload) {
      let data = await axios.post(process.env.VUE_APP_API_PATH + '/oauth/token', {
          grant_type:'password',
          client_id:'1',
          client_secret:'R1S5SlZXTYjKREj8CiFvR3ZcTidBdgWoxSAVTmxM',
          username: payload.account,
          // username:'user_40170964',
          password: payload.password,
          // password:'password',
          scope:'',
        })
        .then(response => {
          // console.log('login resolve----------------------------------')
          return response.data.access_token
        })
        .catch(err => {
          console.log(err);
        })
      // console.log('data',data)

        await dispatch('setUser', data)
    },

    async setUser({ commit }, payload) {
          console.log('setUser ------------------------')

        // console.log('PAYLOAD',payload)
        if(payload == null || payload == undefined) {
          return false
        }
        await axios.get(process.env.VUE_APP_API_PATH + '/api/user', {
          headers: {
            'Authorization': `Bearer ${payload}`
          }
        })
        .then(async response => {
          // console.log('setUser ------------------------')
          response.data.data[0]['access_token'] = payload
          // console.log('setUser------------------resolve-------------', response)
          // console.log('huihihihihih', response.data.data)
          await commit('setUser', response.data.data[0])
        }).catch((err) => {
          console.log('Vuex setUser ERR',err)
        })
    },
    logOut ({ commit }, flag) {
      console.log('LOGOUT!!!', flag)
      if(flag === false) return
      axios.post(process.env.VUE_APP_API_PATH + '/api/user/logout', {}, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
      localStorage.removeItem('token')
      commit('logOut')
      router.push({name: 'login'}).then().catch(() => {})
    },
    redirect({ state }) {
      // console.log('redirect----------------')
      router.push({ name: 'Home', params: { userId: state.user.id }})
    },
    // async checkLogin(payload) {
    //   console.log('CHECK LOGIN')
    //   await axios.get(process.env.VUE_APP_API_PATH + '/api/user', {
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