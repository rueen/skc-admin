import { defineStore } from 'pinia'
import { ref } from 'vue'

interface LoginParams {
  username: string
  password: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: null as any,
    permissions: [] as string[],
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.userInfo?.role === 'admin',
    hasPermission: (state) => (permission: string) => state.permissions.includes(permission),
  },
  
  actions: {
    async login(params: LoginParams) {
      // 这里应该调用实际的登录 API
      // 暂时模拟登录过程
      if (params.username === 'admin' && params.password === '123456') {
        const mockToken = 'mock-token-' + Date.now()
        this.token = mockToken
        localStorage.setItem('token', mockToken)
        this.userInfo = {
          username: params.username,
          role: 'admin',
          isAdmin: true,
        }
        this.permissions = [
          'nav:task',
          'nav:enrollment',
          'nav:member',
          'nav:finance',
          'nav:platform',
          'nav:group',
          'nav:account',
          'task:create',
          'task:edit',
          'task:view',
          'task:delete',
          'enrollment:review',
          'enrollment:batchOperation',
          'member:create',
          'member:edit',
          'member:view',
          'member:delete',
          'platform:create',
          'group:create',
          'group:edit',
          'group:view',
          'group:delete',
        ]
        localStorage.setItem('permissions', JSON.stringify(this.permissions))
        return true
      }
      throw new Error('用户名或密码错误')
    },

    logout() {
      this.token = ''
      this.userInfo = null
      this.permissions = []
      localStorage.removeItem('token')
      localStorage.removeItem('permissions')
    },

    checkAuth() {
      return !!this.token
    },

    initState() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        this.userInfo = {
          username: 'admin',
          role: 'admin',
          isAdmin: true,
        }
        const permissions = localStorage.getItem('permissions')
        // 如果没有权限记录，设置默认权限
        this.permissions = permissions ? JSON.parse(permissions) : [
          'nav:task',
          'nav:enrollment',
          'nav:member',
          'nav:finance',
          'nav:platform',
          'nav:group',
          'nav:account',
          'task:create',
          'task:edit',
          'task:view',
          'task:delete',
          'enrollment:review',
          'enrollment:batchOperation',
          'member:create',
          'member:edit',
          'member:view',
          'member:delete',
          'platform:create',
          'group:create',
          'group:edit',
          'group:view',
          'group:delete',
        ]
        // 保存权限到本地存储
        if (!permissions) {
          localStorage.setItem('permissions', JSON.stringify(this.permissions))
        }
      }
    },

    setPermissions(permissions: string[]) {
      this.permissions = permissions
      localStorage.setItem('permissions', JSON.stringify(permissions))
    },
  }
}) 