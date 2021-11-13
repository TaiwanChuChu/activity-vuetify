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
    console.log('beforeMount22', router.history.current.matched)
    if(router.history.current.matched.length > 0) {
      
      let requireAuth = router.history.current.matched[0].meta.requireAuth
      let isAdmin = router.history.current.matched[0].meta.isAdmin

      router.history.current.matched.some(record => {
        if(router.history.current.path.toLowerCase() == record.path) {

          let meta = router.history.current.meta
          if(typeof(meta.meta.requireAuth) !== 'undefined') {
            requireAuth = meta.requireAuth
          }
          if(typeof(meta.meta.isAdmin) !== 'undefined') {
            isAdmin = meta.isAdmin
          }
        }
      })

      if(requireAuth === true) {
        Helper.methods.isLogin().then(async status => {
        console.log('beforeMount~~', status)
          if(status === false) {
            try {
              return router.push({ name: 'login' })
            } catch (e) { 
              console.log(e)
            }
          }

          if (isAdmin === true && store.getters.user.isAdmin === false) {
              return router.push({ name: 'User', params: { userId: store.getters.user.id } })
          }
        })
      }
    }
  },
  render: h => h(App),
}).$mount('#app')

router.beforeEach((to, from, next) => {
  // console.log('beforeEach2', to.meta.requireAuth, 'isAdmin', to.meta.isAdmin)
  let requireAuth = to.matched[0].meta.requireAuth
  let isAdmin = to.matched[0].meta.isAdmin

  to.matched.some(record => {
    if(to.path.toLowerCase() == record.path) {
      if(typeof(to.meta.requireAuth) !== 'undefined') {
        requireAuth = to.meta.requireAuth
      }
      if(typeof(to.meta.isAdmin) !== 'undefined') {
        isAdmin = to.meta.isAdmin
      }
    }
  })

  if(!(requireAuth === true)) {
    return next()
  }

  Helper.methods.isLogin().then(status => {
    console.log('SS:',status)
    if (isAdmin === true) {
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