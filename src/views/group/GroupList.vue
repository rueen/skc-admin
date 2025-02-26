<template>
  <div class="group-list">
    <div class="operation-bar">
      <a-space>
        <a-button type="primary" @click="handleAdd">
          <plus-outlined /> 新增群组
        </a-button>
        <a-input-search
          v-model:value="searchParams.keyword"
          placeholder="请输入群名称"
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
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-space>
            <a @click="handleEdit(record)">编辑</a>
            <a @click="handleView(record)">查看</a>
            <a-popconfirm
              title="确定要删除这个群组吗？"
              @confirm="handleDelete(record)"
            >
              <a class="danger">删除</a>
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
        <a-form-item label="群名称" name="name">
          <a-input v-model:value="formData.name" />
        </a-form-item>
        <a-form-item label="群ID" name="groupId">
          <a-input v-model:value="formData.groupId" />
        </a-form-item>
        <a-form-item label="群主" name="owner">
          <a-select v-model:value="formData.owner">
            <a-select-option value="1">张三</a-select-option>
            <a-select-option value="2">李四</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { TablePaginationConfig } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'

const columns = [
  {
    title: '群名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '群ID',
    dataIndex: 'groupId',
    key: 'groupId',
  },
  {
    title: '群主',
    dataIndex: 'ownerName',
    key: 'ownerName',
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
  name: '',
  groupId: '',
  owner: undefined,
})

const rules = {
  name: [{ required: true, message: '请输入群名称' }],
  groupId: [{ required: true, message: '请输入群ID' }],
  owner: [{ required: true, message: '请选择群主' }],
}

// 模拟数据
const mockData = [
  {
    id: 1,
    name: '美妆交流群',
    groupId: 'GROUP001',
    ownerName: '张三',
    createTime: '2024-06-01',
  },
]

const handleSearch = () => {
  console.log('search:', searchParams)
}

const handleAdd = () => {
  modalMode.value = 'add'
  modalTitle.value = '新增群组'
  modalVisible.value = true
}

const handleEdit = (record: any) => {
  modalMode.value = 'edit'
  modalTitle.value = '编辑群组'
  Object.assign(formData, record)
  modalVisible.value = true
}

const handleView = (record: any) => {
  modalMode.value = 'view'
  modalTitle.value = '查看群组'
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
.group-list {
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