import axios from 'axios'
import cookie from 'cookiejs'
// import vue from '../main'
import router from '../router/index'
// 创建axios实例

const http = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// http request 拦截器 用于发送token等
http.interceptors.request.use(
  (c) => {
    c.headers.Authorization = cookie('token')
    return c
  }
)

// http respons 拦截器 用于统一错误处理等
http.interceptors.response.use(

  (response) => {
    // if (vue.$vux.loading) vue.$vux.loading.hide()
    return response.data
  },

  (error) => {
    if (error.message.indexOf('Network Error') >= 0 || error.message.indexOf('timeout of 3000ms exceeded') >= 0) {
      router.push('404')
      // location.href = '/#/maintain';
      return Promise.reject(error.message)
    }

    if (error.response) {
      switch (error.response.data.message) {
        // case ErrorCode.TOKEN_INVALID:
        // store.dispatch('clearTokenInfo', true);
        // wxAuth()
        // break
      }
      throw new Error(error.response.data.message)
    }
  }
)
