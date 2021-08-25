import store from './store'

export default {
    methods: {
        isLogin: async () => {
            console.log('helper', store.getters.user)
            if(store.getters.user) {
                return true
            }
            return await new Promise(resolve => {
                let status = store.dispatch('setUser', localStorage.getItem('token')).then(() => {
                    console.log('ISLOGIN RRRR', store.getters.user)
                    if(store.getters.user == null || store.getters.user == undefined) {
                        return false
                    }
                    return true
                })
                resolve(status)
            })
        }
    },
}