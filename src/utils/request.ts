import axios, { AxiosRequestConfig } from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import qs from 'qs'
import router from '@/router'

const request = axios.create({

})

let isRefresh = false
const requestList: any[] = []
function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({ // 用新的axios实例避免请求会进入拦截器，如本次请求错误会出现死循环
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}
async function refresh (error: { config: AxiosRequestConfig }) {
  if (!store.state.user) {
    redirectLogin()
    return Promise.reject(error)
  }
  if (!isRefresh) {
    isRefresh = true
    return refreshToken().then(res => {
      if (!res.data.success) {
        throw new Error('更新token失败')
      }
      store.commit('setUser', res.data.content) // 把刷新的token重新存值
      while (requestList.length) { // 把挂起的请求方法执行 resolve改变状态
        requestList.shift()()
      }
      return request(error.config)
    }).catch(() => {
      store.commit('setUser', null)
      redirectLogin()
      return Promise.reject(error)
    }).finally(() => {
      isRefresh = false
    })
  }
  // 刷新状态下 把请求挂起放到requestList中
  return new Promise((resolve) => { // token失效后，如果存在多个需要token的请求，则先存起来，等token刷新后重新发起
    requestList.push(() => {
      resolve(request(error.config))
    })
  })
}

// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config // config 一定要返回 否则请求发不出去
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // http状态码2XX 会进入这里
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // 如果是自定义错误状态码 错误处理写到这里
  return response
}, function (error) {
  // http状态码超出2XX 会进入这里
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response) { // 请求发出去收到响应了 但状态码超出了2XX 范围
    const { status } = error.response
    switch (status) {
      case 400:
        Message.error('请求参数错误')
        break
      case 401:
        return refresh(error)
        break
      case 403:
        Message.error('没有权限，请联系管理员')
        break
      case 404:
        Message.error('请求资源不存在')
        break
      default:
        // >= 500
        Message.error('服务端错误，请联系管理员')
        break
    }
  } else if (error.request) { // 请求发出去没有收到响应
    Message.error('请求超时')
  } else { // 在设置请求时发生了一些事情 触发了一个错误
    Message.error(`请求失败: ${error.message}`)
  }
  return Promise.reject(error)
})

export default request
