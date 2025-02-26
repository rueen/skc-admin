import { defineStore } from 'pinia'
import { ref } from 'vue'

interface LoginParams {
  username: string
  password: string
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const userInfo = ref<any>(null)

  const login = async (params: LoginParams) => {
    // 这里应该调用实际的登录 API
    // 暂时模拟登录过程
    if (params.username === 'admin' && params.password === '123456') {
      const mockToken = 'mock-token-' + Date.now()
      token.value = mockToken
      localStorage.setItem('token', mockToken)
      userInfo.value = {
        username: params.username,
        role: 'admin',
      }
      return true
    }
    throw new Error('用户名或密码错误')
  }

  const logout = () => {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
  }

  const checkAuth = () => {
    return !!token.value
  }

  return {
    token,
    userInfo,
    login,
    logout,
    checkAuth,
  }
}) 