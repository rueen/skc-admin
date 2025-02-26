import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user'

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, data, message: msg } = response.data
    
    if (code === 0) {
      return data
    }
    
    message.error(msg || '请求失败')
    return Promise.reject(new Error(msg || '请求失败'))
  },
  (error) => {
    const { status } = error.response
    
    switch (status) {
      case 401:
        message.error('未登录或登录已过期')
        const userStore = useUserStore()
        userStore.logout()
        break
      case 403:
        message.error('没有权限')
        break
      case 404:
        message.error('请求的资源不存在')
        break
      case 500:
        message.error('服务器错误')
        break
      default:
        message.error('网络错误')
    }
    
    return Promise.reject(error)
  }
)

export default service 