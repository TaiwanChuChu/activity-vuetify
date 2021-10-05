import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/router'
import VueAxios from 'vue-axios'
import store from './store'
import Helper from './helper'
import axios from './core/_axios'

// import MyPlugin2 from './helper2'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

// Vue.use(MyPlugin2)

// Vue.prototype.$myMethod = function (methodOptions) {
//   console.log('$myMethod', methodOptions)
// }

// Vue.prototype.$myMethod2 = function (methodOptions) {
//   console.log('$myMethod2', methodOptions)
// }

// Vue.myGlobalMethod = function () {
//   console.log('mmm',store.getters.user)
// }

// Vue.myPhone = MyPlugin2
// console.log(Vue.myPhone.myGlobalMethod__())

Vue.mixin(Helper)
// Vue.config.devtools = false;
// Vue.config.debug = false;

new Vue({
  vuetify,
  router,
  store,
  beforeMount: async function() {
    console.log('beforeMount22')
    console.log(router.history.current.meta)
    if(router.history.current.meta.requireAuth === true) {
      Helper.methods.isLogin().then(async status => {
      console.log('beforeMount~~', status)
        if(status === false) {
          try {
            return router.push({ name: 'login' })
          } catch (e) { 
            console.log(e)
          }
        }

        if (router.history.current.meta.isAdmin === true && store.getters.user.isAdmin === false) {
            return router.push({ name: 'User', params: { userId: store.getters.user.id } })
        }
      })
    }
  },
  render: h => h(App),
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log('beforeEach2', to.meta.requireAuth, 'isAdmin', to.meta.isAdmin)

  if(!(to.meta.requireAuth === true)) {
    return next()
  }

  Helper.methods.isLogin().then(status => {
    console.log('SS:',status)
    if (to.meta.isAdmin === true) {
      if (store.getters.user.isAdmin) {
        return next()
      }
    } else {
      if (status) {
        return next()
      }
    }
    return router.push({name: 'login'}).catch(() => {})
  }).catch(() => router.push({name: 'login'}).catch(() => {}))
})
// router.beforeResolve ((to, from, next) => {
//   console.log('beforeResolve')
//   return next()

// })
// router.afterEach((to, from, next) => {
//   console.log('afterEach')
//   return next()
// })