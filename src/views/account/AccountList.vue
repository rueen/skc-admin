<template>
  <div class="account-list">
    <div class="operation-bar">
      <a-button type="primary" @click="handleAdd">
        <plus-outlined /> {{ t('account.newAccount') }}
      </a-button>
    </div>

    <a-table
      :columns="columns"
      :data-source="tableData"
      :loading="loading"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-space>
            <a @click="handlePermission(record)">{{ t('account.permissions.title') }}</a>
            <a @click="handleEdit(record)">{{ t('common.edit') }}</a>
            <a-popconfirm
              :title="t('account.deleteConfirm')"
              @confirm="handleDelete(record)"
            >
              <a class="danger">{{ t('common.delete') }}</a>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>

    <!-- 账号表单弹窗 -->
    <a-modal
      v-model:open="accountModalVisible"
      :title="accountModalTitle"
      @ok="handleAccountModalOk"
      :okText="t('common.confirm')"
      :cancelText="t('common.cancel')"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
      >
        <a-form-item
          :label="t('account.form.username')"
          name="username"
        >
          <a-input
            v-model:value="formData.username"
            :placeholder="t('account.form.usernamePlaceholder')"
            :maxLength="20"
          />
        </a-form-item>
        <a-form-item
          :label="t('account.form.password')"
          name="password"
        >
          <a-input-password
            v-model:value="formData.password"
            :placeholder="t('account.form.passwordPlaceholder')"
            :maxLength="20"
          />
        </a-form-item>
        <a-form-item
          :label="t('account.form.description')"
          name="description"
        >
          <a-textarea
            v-model:value="formData.description"
            :placeholder="t('account.form.descriptionPlaceholder')"
            :rows="4"
            :maxLength="100"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 权限设置弹窗 -->
    <a-modal
      v-model:open="permissionModalVisible"
      :title="t('account.permissions.title')"
      @ok="handlePermissionModalOk"
      :okText="t('common.confirm')"
      :cancelText="t('common.cancel')"
      width="800px"
    >
      <div class="permission-container">
        <!-- 左侧权限类型列表 -->
        <div class="permission-types">
          <a-menu
            v-model:selectedKeys="selectedPermissionType"
            mode="inline"
            style="height: 100%"
          >
            <a-menu-item key="navigation">
              {{ t('account.permissions.navigation.title') }}
            </a-menu-item>
            <a-menu-item key="task">
              {{ t('account.permissions.task.title') }}
            </a-menu-item>
            <a-menu-item key="enrollment">
              {{ t('account.permissions.enrollment.title') }}
            </a-menu-item>
            <a-menu-item key="member">
              {{ t('account.permissions.member.title') }}
            </a-menu-item>
            <a-menu-item key="platform">
              {{ t('account.permissions.platform.title') }}
            </a-menu-item>
            <a-menu-item key="group">
              {{ t('account.permissions.group.title') }}
            </a-menu-item>
          </a-menu>
        </div>
        
        <!-- 右侧权限选项 -->
        <div class="permission-options">
          <template v-if="selectedPermissionType[0] === 'navigation'">
            <a-checkbox-group v-model:value="permissionData.navigation" class="permission-group">
              <a-checkbox value="task">{{ t('account.permissions.navigation.task') }}</a-checkbox>
              <a-checkbox value="enrollment">{{ t('account.permissions.navigation.enrollment') }}</a-checkbox>
              <a-checkbox value="member">{{ t('account.permissions.navigation.member') }}</a-checkbox>
              <a-checkbox value="finance">{{ t('account.permissions.navigation.finance') }}</a-checkbox>
              <a-checkbox value="platform">{{ t('account.permissions.navigation.platform') }}</a-checkbox>
              <a-checkbox value="group">{{ t('account.permissions.navigation.group') }}</a-checkbox>
              <a-checkbox value="account">{{ t('account.permissions.navigation.account') }}</a-checkbox>
            </a-checkbox-group>
          </template>
          
          <template v-if="selectedPermissionType[0] === 'task'">
            <a-checkbox-group v-model:value="permissionData.task" class="permission-group">
              <a-checkbox value="create">{{ t('account.permissions.task.create') }}</a-checkbox>
              <a-checkbox value="edit">{{ t('account.permissions.task.edit') }}</a-checkbox>
              <a-checkbox value="view">{{ t('account.permissions.task.view') }}</a-checkbox>
              <a-checkbox value="delete">{{ t('account.permissions.task.delete') }}</a-checkbox>
            </a-checkbox-group>
          </template>
          
          <template v-if="selectedPermissionType[0] === 'enrollment'">
            <a-checkbox-group v-model:value="permissionData.enrollment" class="permission-group">
              <a-checkbox value="view">{{ t('account.permissions.enrollment.view') }}</a-checkbox>
              <a-checkbox value="review">{{ t('account.permissions.enrollment.review') }}</a-checkbox>
            </a-checkbox-group>
          </template>
          
          <template v-if="selectedPermissionType[0] === 'member'">
            <a-checkbox-group v-model:value="permissionData.member" class="permission-group">
              <a-checkbox value="create">{{ t('account.permissions.member.create') }}</a-checkbox>
              <a-checkbox value="view">{{ t('account.permissions.member.view') }}</a-checkbox>
              <a-checkbox value="edit">{{ t('account.permissions.member.edit') }}</a-checkbox>
              <a-checkbox value="delete">{{ t('account.permissions.member.delete') }}</a-checkbox>
            </a-checkbox-group>
          </template>
          
          <template v-if="selectedPermissionType[0] === 'platform'">
            <a-checkbox-group v-model:value="permissionData.platform" class="permission-group">
              <a-checkbox value="create">{{ t('account.permissions.platform.create') }}</a-checkbox>
              <a-checkbox value="view">{{ t('account.permissions.platform.view') }}</a-checkbox>
              <a-checkbox value="edit">{{ t('account.permissions.platform.edit') }}</a-checkbox>
              <a-checkbox value="delete">{{ t('account.permissions.platform.delete') }}</a-checkbox>
            </a-checkbox-group>
          </template>
          
          <template v-if="selectedPermissionType[0] === 'group'">
            <a-checkbox-group v-model:value="permissionData.group" class="permission-group">
              <a-checkbox value="create">{{ t('account.permissions.group.create') }}</a-checkbox>
              <a-checkbox value="view">{{ t('account.permissions.group.view') }}</a-checkbox>
              <a-checkbox value="edit">{{ t('account.permissions.group.edit') }}</a-checkbox>
              <a-checkbox value="delete">{{ t('account.permissions.group.delete') }}</a-checkbox>
            </a-checkbox-group>
          </template>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { TablePaginationConfig, FormInstance } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface AccountItem {
  id: number
  username: string
  description: string
  permissions?: string[]
}

const columns = computed(() => [
  {
    title: t('account.columns.username'),
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: t('account.columns.description'),
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: t('account.columns.operation'),
    key: 'action',
  },
])

const loading = ref(false)
const tableData = ref<AccountItem[]>([])
const pagination = reactive<TablePaginationConfig>({
  total: 0,
  current: 1,
  pageSize: 10,
})

// 账号表单相关
const accountModalVisible = ref(false)
const accountModalTitle = ref('')
const formRef = ref<FormInstance>()
const formData = reactive({
  username: '',
  password: '',
  description: '',
})

const rules = {
  username: [{ required: true, message: t('account.form.usernameRequired') }],
  password: [{ required: true, message: t('account.form.passwordRequired') }],
}

// 权限设置相关
const permissionModalVisible = ref(false)
const currentAccount = ref<AccountItem>()
const permissionData = reactive({
  navigation: [] as string[],
  task: [] as string[],
  enrollment: [] as string[],
  member: [] as string[],
  platform: [] as string[],
  group: [] as string[],
})

// 当前选中的权限类型
const selectedPermissionType = ref(['navigation'])

// 重置权限数据
const resetPermissionData = () => {
  permissionData.navigation = []
  permissionData.task = []
  permissionData.enrollment = []
  permissionData.member = []
  permissionData.platform = []
  permissionData.group = []
}

// 根据权限字符串解析权限数据
const parsePermissions = (permissions: string[]) => {
  resetPermissionData()
  permissions.forEach(permission => {
    const [module, action] = permission.split(':')
    switch(module) {
      case 'nav':
        permissionData.navigation.push(action)
        break
      case 'task':
        permissionData.task.push(action)
        break
      case 'enrollment':
        permissionData.enrollment.push(action)
        break
      case 'member':
        permissionData.member.push(action)
        break
      case 'platform':
        permissionData.platform.push(action)
        break
      case 'group':
        permissionData.group.push(action)
        break
    }
  })
}

// 处理函数
const handleAdd = () => {
  accountModalTitle.value = t('account.newAccount')
  accountModalVisible.value = true
}

const handleEdit = (record: AccountItem) => {
  accountModalTitle.value = t('account.editButton')
  Object.assign(formData, record)
  accountModalVisible.value = true
}

const handleDelete = (record: AccountItem) => {
  console.log('delete:', record)
}

const handlePermission = (record: AccountItem) => {
  currentAccount.value = record
  // 加载当前账号的权限数据
  if (record.permissions) {
    parsePermissions(record.permissions)
  } else {
    resetPermissionData()
  }
  permissionModalVisible.value = true
}

const handleAccountModalOk = () => {
  formRef.value?.validate().then(() => {
    console.log('form data:', formData)
    accountModalVisible.value = false
  })
}

const handlePermissionModalOk = () => {
  // 将权限数据转换为权限字符串数组
  const permissions: string[] = [
    ...permissionData.navigation.map(action => `nav:${action}`),
    ...permissionData.task.map(action => `task:${action}`),
    ...permissionData.enrollment.map(action => `enrollment:${action}`),
    ...permissionData.member.map(action => `member:${action}`),
    ...permissionData.platform.map(action => `platform:${action}`),
    ...permissionData.group.map(action => `group:${action}`),
  ]
  
  // 更新当前账号的权限
  if (currentAccount.value) {
    currentAccount.value.permissions = permissions
  }
  
  permissionModalVisible.value = false
}

const handleTableChange = (pag: TablePaginationConfig) => {
  pagination.current = pag.current || 1
}

// 初始化加载数据
const mockData: AccountItem[] = [
  {
    id: 1,
    username: 'admin',
    description: '超级管理员',
    permissions: [
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
    ],
  },
]

tableData.value = mockData
</script>

<style lang="less" scoped>
.account-list {
  .operation-bar {
    margin-bottom: 16px;
  }

  .danger {
    color: #ff4d4f;
  }
}

.permission-container {
  display: flex;
  height: 400px;
  border: 1px solid #f0f0f0;

  .permission-types {
    width: 200px;
    border-right: 1px solid #f0f0f0;
    overflow-y: auto;
  }

  .permission-options {
    flex: 1;
    padding: 16px;
    overflow-y: auto;

    .permission-group {
      display: flex;
      flex-direction: column;
      gap: 12px;

      :deep(.ant-checkbox-wrapper) {
        margin-left: 0;
      }
    }
  }
}
</style> 