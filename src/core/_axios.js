import axios from 'axios';

// 建立axios實體
const service = axios.create({ 
    // 設定基本URL路徑
    baseURL: process.env.VUE_APP_API_PATH,
    // 設定header
    headers: {
       "Content-Type": "application/json;charset=UTF-8",
    },
    // 配置请求超时时间
    timeout: 0,
});

// 攔截request
service.interceptors.request.use(function (config) {
    if(localStorage.getItem('token')) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    }
    return config
})

// 攔截response
service.interceptors.response.use((response) => {
    return response.data;
}, (err) => {
    return Promise.reject(err);
});

export default {
    get: async (api, config = {}) => {
        console.log('get', api, config)
        return await service.get(api, config)
    },
    post: async (api, options = {}, config = {}) => {
        console.log('post', api, options, config)
        return await service.post(api, options, config)
    },
    put: async (api, options = {}, config = {}) => {
        console.log('put', api, options, config)
        return await service.put(api, options, config)
    },
    delete: async (api, options = {}, config = {}) => {
        console.log('delete', api, options, config)
        return await service.delete(api, options, config)
    },
}