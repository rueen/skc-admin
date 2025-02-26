<template>
  <div class="platform-list">
    <div class="operation-bar">
      <a-space>
        <a-button type="primary" @click="handleAdd">
          <plus-outlined /> 新增渠道
        </a-button>
        <a-input-search
          v-model:value="searchParams.keyword"
          placeholder="请输入渠道名称"
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
        <template v-if="column.key === 'icon'">
          <img :src="text" class="platform-icon" alt="平台图标" />
        </template>
        <template v-else-if="column.key === 'action'">
          <a-space>
            <a @click="handleEdit(record)">编辑</a>
            <a @click="handleView(record)">查看</a>
            <a-popconfirm
              title="确定要删除这个渠道吗？"
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
        <a-form-item label="渠道图标" name="icon">
          <a-upload
            v-model:file-list="fileList"
            list-type="picture-card"
            :max-count="1"
            @preview="handlePreview"
          >
            <div v-if="fileList.length < 1">
              <plus-outlined />
              <div style="margin-top: 8px">上传</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="渠道名称" name="name">
          <a-input v-model:value="formData.name" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:open="previewVisible"
      title="图片预览"
      :footer="null"
    >
      <img :src="previewImage" style="width: 100%" />
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
    title: '渠道图标',
    dataIndex: 'icon',
    key: 'icon',
  },
  {
    title: '渠道名称',
    dataIndex: 'name',
    key: 'name',
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
  icon: '',
})

const fileList = ref([])
const previewVisible = ref(false)
const previewImage = ref('')

const rules = {
  name: [{ required: true, message: '请输入渠道名称' }],
}

// 模拟数据
const mockData = [
  {
    id: 1,
    name: '抖音',
    icon: 'https://example.com/douyin.png',
    createTime: '2024-06-01',
  },
]

const handleSearch = () => {
  console.log('search:', searchParams)
}

const handleAdd = () => {
  modalMode.value = 'add'
  modalTitle.value = '新增渠道'
  modalVisible.value = true
}

const handleEdit = (record: any) => {
  modalMode.value = 'edit'
  modalTitle.value = '编辑渠道'
  Object.assign(formData, record)
  modalVisible.value = true
}

const handleView = (record: any) => {
  modalMode.value = 'view'
  modalTitle.value = '查看渠道'
  Object.assign(formData, record)
  modalVisible.value = true
}

const handleDelete = (record: any) => {
  console.log('delete:', record)
}

const handlePreview = async (file: any) => {
  previewImage.value = file.url || file.preview
  previewVisible.value = true
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
.platform-list {
  .operation-bar {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }

  .platform-icon {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }

  .danger {
    color: #ff4d4f;
  }
}
</style> 