<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">{{ collapsed ? t('login.title').split(' ')[0] : t('login.title') }}</div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        class="custom-menu"
      >
        <a-menu-item v-if="userStore.hasPermission('nav:task')" key="task">
          <template #icon>
            <OrderedListOutlined  />
          </template>
          <router-link to="/task">{{ t('menu.task') }}</router-link>
        </a-menu-item>
        <a-menu-item v-if="userStore.hasPermission('nav:enrollment')" key="enrollment">
          <template #icon>
            <FormOutlined />
          </template>
          <router-link to="/enrollment">{{ t('menu.enrollment') }}</router-link>
        </a-menu-item>
        <a-menu-item v-if="userStore.hasPermission('nav:member')" key="member">
          <template #icon>
            <TeamOutlined />
          </template>
          <router-link to="/member">{{ t('menu.member') }}</router-link>
        </a-menu-item>
        <a-menu-item v-if="userStore.hasPermission('nav:finance')" key="finance">
          <template #icon>
            <AccountBookOutlined />
          </template>
          <router-link to="/finance">{{ t('menu.finance') }}</router-link>
        </a-menu-item>
        <a-menu-item v-if="userStore.hasPermission('nav:platform')" key="platform">
          <template #icon>
            <AppstoreOutlined />
          </template>
          <router-link to="/platform">{{ t('menu.platform') }}</router-link>
        </a-menu-item>
        <a-menu-item v-if="userStore.hasPermission('nav:group')" key="group">
          <template #icon>
            <UsergroupAddOutlined />
          </template>
          <router-link to="/group">{{ t('menu.group') }}</router-link>
        </a-menu-item>
        <a-menu-item v-if="userStore.isAdmin" key="account">
          <template #icon>
            <UserOutlined />
          </template>
          <router-link to="/account">{{ t('menu.account') }}</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <span class="trigger" @click="() => (collapsed = !collapsed)">
          <MenuFoldOutlined v-if="!collapsed" />
          <MenuUnfoldOutlined v-else />
        </span>
        <div class="header-right">
          <a-select
            v-model:value="currentLang"
            style="width: 100px; margin-right: 12px"
            @change="handleLangChange"
          >
            <a-select-option value="zh-CN">中文</a-select-option>
            <a-select-option value="en-US">English</a-select-option>
          </a-select>
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              管理员
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item key="0">
                  <a href="javascript:;" @click="handleLogout">{{ t('header.logout') }}</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import {
  OrderedListOutlined,
  FormOutlined,
  TeamOutlined,
  AccountBookOutlined,
  AppstoreOutlined,
  UsergroupAddOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { t, locale } = useI18n()

const currentLang = ref(locale.value)

const handleLangChange = (value: string) => {
  locale.value = value
  localStorage.setItem('language', value)
}

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}

const collapsed = ref(false)
const selectedKeys = ref<string[]>([])

// 根据当前路由路径设置选中的菜单项
watchEffect(() => {
  const path = route.path
  const firstLevelPath = path.split('/')[1] || 'task'
  selectedKeys.value = [firstLevelPath]
})

// 初始化用户状态
userStore.initState()
</script>

<style lang="less" scoped>
.layout {
  min-height: 100vh;
  display: flex;

  :deep(.ant-layout-sider) {
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  > .ant-layout {
    margin-left: 200px;
    min-height: 100vh;
    transition: margin-left 0.2s;

    &.ant-layout-has-sider {
      margin-left: 80px;
    }
  }
}

.logo {
  height: 32px;
  margin: 16px;
  color: white;
  font-size: 18px;
  text-align: center;
  line-height: 32px;
}

.header {
  background: #fff;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .trigger {
    padding: 0 24px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    height: 100%;

    &:hover {
      color: @primary-color;
      background-color: rgba(0, 0, 0, 0.025);
    }
  }

  .header-right {
    padding-right: 24px;
  }
}

.content {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  height: calc(100vh - 112px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
}

.custom-menu {
  :deep(.anticon) {
    font-size: 18px;
  }

  :deep(.ant-menu-item) {
    display: flex;
    align-items: center;
  }

  :deep(.ant-menu-inline-collapsed) {
    .ant-menu-item {
      padding: 0 !important;
      justify-content: center;
    }
  }
}
</style> 