<template>
  <div class="login-container">
    <div class="login-box">
      <h2>skc种草</h2>
      <a-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        @finish="handleSubmit"
      >
        <a-form-item name="username">
          <a-input
            v-model:value="formData.username"
            size="large"
            placeholder="用户名"
          >
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input-password
            v-model:value="formData.password"
            size="large"
            placeholder="密码"
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            :loading="loading"
            block
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import type { FormInstance } from 'ant-design-vue'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref<FormInstance>()
const loading = ref(false)

const formData = reactive({
  username: '',
  password: '',
})

const rules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
}

const handleSubmit = async () => {
  try {
    loading.value = true
    await userStore.login(formData)
    message.success('登录成功')
    router.push('/')
  } catch (error) {
    message.error('登录失败：' + (error as Error).message)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;

  .login-box {
    width: 368px;
    padding: 24px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

    h2 {
      text-align: center;
      margin-bottom: 24px;
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
</style> 