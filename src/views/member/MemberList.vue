<template>
  <div class="member-list">
    <div class="operation-bar">
      <a-space>
        <a-button type="primary" @click="handleAdd">
          <plus-outlined /> 新增会员
        </a-button>
        <a-input-search
          v-model:value="searchParams.keyword"
          placeholder="请输入会员昵称"
          style="width: 200px"
          @search="handleSearch"
        />
      </a-space>
    </div>

    <a-table
      :columns="columns"
      :data-source="tableData"
      :loading="loading"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.key === 'groupName'">
          {{ text }}
          <a-tag v-if="record.isGroupOwner" color="purple" style="margin-left: 8px">群主</a-tag>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-space>
            <a @click="handleEdit(record)">{{ t('common.edit') }}</a>
            <a @click="handleView(record)">{{ t('common.view') }}</a>
            <a-popconfirm
              :title="t('member.deleteConfirm')"
              @confirm="handleDelete(record)"
            >
              <a class="danger">{{ t('common.delete') }}</a>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:open="modalVisible"
      :title="modalTitle"
      @ok="handleModalOk"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        :disabled="modalMode === 'view'"
      >
        <a-form-item label="会员昵称" name="nickname">
          <a-input v-model:value="formData.nickname" />
        </a-form-item>
        <a-form-item label="手机号" name="phone">
          <a-input v-model:value="formData.phone" />
        </a-form-item>
        <a-form-item label="是否群主" name="isGroupOwner">
          <a-switch v-model:checked="formData.isGroupOwner" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { TablePaginationConfig } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const columns = [
  {
    title: '会员昵称',
    dataIndex: 'nickname',
    key: 'nickname',
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '所属群',
    dataIndex: 'groupName',
    key: 'groupName',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const searchParams = reactive({
  keyword: '',
})

const loading = ref(false)
const tableData = ref([])
const pagination = reactive<TablePaginationConfig>({
  total: 0,
  current: 1,
  pageSize: 10,
})

const modalVisible = ref(false)
const modalMode = ref<'add' | 'edit' | 'view'>('add')
const modalTitle = ref('')
const formRef = ref<FormInstance>()
const formData = reactive({
  nickname: '',
  phone: '',
  isGroupOwner: false,
})

const rules = {
  nickname: [{ required: true, message: '请输入会员昵称' }],
  phone: [{ required: true, message: '请输入手机号' }],
}

// 模拟数据
const mockData = [
  {
    id: 1,
    nickname: '张三',
    phone: '13800138000',
    groupName: '美妆交流群',
    isGroupOwner: true,
    createTime: '2024-02-26 10:00:00',
  },
  {
    id: 2,
    nickname: '李四',
    phone: '13800138001',
    groupName: '美食分享群',
    isGroupOwner: false,
    createTime: '2024-02-26 11:00:00',
  },
  // 更多数据...
]

const showGroupInfo = () => {
  message.info('美妆交流群')
}

const handleSearch = () => {
  console.log('search:', searchParams)
}

const handleAdd = () => {
  modalMode.value = 'add'
  modalTitle.value = '新增会员'
  modalVisible.value = true
}

const handleEdit = (record: any) => {
  modalMode.value = 'edit'
  modalTitle.value = '编辑会员'
  Object.assign(formData, record)
  modalVisible.value = true
}

const handleView = (record: any) => {
  modalMode.value = 'view'
  modalTitle.value = '查看会员'
  Object.assign(formData, record)
  modalVisible.value = true
}

const handleDelete = (record: any) => {
  console.log('delete:', record)
}

const handleModalOk = async () => {
  if (modalMode.value === 'view') {
    modalVisible.value = false
    return
  }

  try {
    await formRef.value?.validate()
    console.log('form data:', formData)
    modalVisible.value = false
  } catch (error) {
    console.error('validation failed:', error)
  }
}

const handleTableChange = (pag: TablePaginationConfig) => {
  pagination.current = pag.current || 1
}

// 初始化加载数据
tableData.value = mockData
</script>

<style lang="less" scoped>
.member-list {
  .operation-bar {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }

  .danger {
    color: #ff4d4f;
  }
}
</style> 