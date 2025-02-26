<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">skc种草</div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
      >
        <a-menu-item key="task">
          <router-link to="/task">{{ t('menu.task') }}</router-link>
        </a-menu-item>
        <a-menu-item key="enrollment">
          <router-link to="/enrollment">{{ t('menu.enrollment') }}</router-link>
        </a-menu-item>
        <a-menu-item key="member">
          <router-link to="/member">会员管理</router-link>
        </a-menu-item>
        <a-menu-item key="finance">
          <router-link to="/finance">金融管理</router-link>
        </a-menu-item>
        <a-menu-item key="platform">
          <router-link to="/platform">平台渠道</router-link>
        </a-menu-item>
        <a-menu-item key="group">
          <router-link to="/group">群管理</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <button class="trigger" @click="() => (collapsed = !collapsed)">
          {{ collapsed ? '展开' : '收起' }}
        </button>
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
                  <a href="javascript:;">{{ t('header.settings') }}</a>
                </a-menu-item>
                <a-menu-item key="1">
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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

const { t, locale } = useI18n()
const router = useRouter()
const userStore = useUserStore()

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
const selectedKeys = ref(['task'])
</script>

<style lang="less" scoped>
.layout {
  min-height: 100vh;
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

  .trigger {
    padding: 0 24px;
    font-size: 18px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: @primary-color;
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
  min-height: 280px;
}
</style> 