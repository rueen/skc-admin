<template>
  <div class="task-list">
    <div class="operation-bar">
      <a-space>
        <a-button type="primary" @click="handleAdd">
          <plus-outlined /> {{ t('task.newTask') }}
        </a-button>
        <a-input-search
          v-model:value="searchParams.keyword"
          :placeholder="t('task.searchPlaceholder')"
          style="width: 200px"
          @search="handleSearch"
        />
      </a-space>
      <a-space>
        <a-select
          v-model:value="searchParams.platform"
          style="width: 120px"
          :placeholder="t('task.platformPlaceholder')"
        >
          <a-select-option value="">{{ t('task.platformOptions.all') }}</a-select-option>
          <a-select-option value="1">{{ t('task.platformOptions.douyin') }}</a-select-option>
          <a-select-option value="2">{{ t('task.platformOptions.kuaishou') }}</a-select-option>
        </a-select>
        <a-select
          v-model:value="searchParams.status"
          style="width: 120px"
          :placeholder="t('task.statusPlaceholder')"
        >
          <a-select-option value="">{{ t('task.statusOptions.all') }}</a-select-option>
          <a-select-option value="0">{{ t('task.statusOptions.pending') }}</a-select-option>
          <a-select-option value="1">{{ t('task.statusOptions.processing') }}</a-select-option>
          <a-select-option value="2">{{ t('task.statusOptions.completed') }}</a-select-option>
        </a-select>
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
        <template v-if="column.key === 'status'">
          <a-tag :color="getStatusColor(text)">{{ getStatusText(text) }}</a-tag>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-space>
            <a @click="handleEdit(record)">{{ t('common.edit') }}</a>
            <a @click="handleView(record)">{{ t('common.view') }}</a>
            <a-popconfirm
              :title="t('task.deleteConfirm')"
              @confirm="handleDelete(record)"
            >
              <a class="danger">{{ t('common.delete') }}</a>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { TablePaginationConfig } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const columns = computed(() => [
  {
    title: t('task.columns.name'),
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: t('task.columns.platform'),
    dataIndex: 'platform',
    key: 'platform',
  },
  {
    title: t('task.columns.status'),
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: t('task.columns.enrollCount'),
    dataIndex: 'enrollCount',
    key: 'enrollCount',
  },
  {
    title: t('task.columns.startTime'),
    dataIndex: 'startTime',
    key: 'startTime',
  },
  {
    title: t('task.columns.endTime'),
    dataIndex: 'endTime',
    key: 'endTime',
  },
  {
    title: t('task.columns.operation'),
    key: 'action',
  },
])

const searchParams = reactive({
  keyword: '',
  platform: '',
  status: '',
})

const loading = ref(false)
const tableData = ref<TaskItem[]>([])
const pagination = reactive<TablePaginationConfig>({
  total: 0,
  current: 1,
  pageSize: 10,
})

interface TaskItem {
  id: number
  name: string
  platform: string
  status: TaskStatus
  enrollCount: string
  startTime: string
  endTime: string
}

type TaskStatus = '0' | '1' | '2'

const getStatusColor = (status: TaskStatus) => {
  const colors: Record<TaskStatus, string> = {
    '0': 'blue',
    '1': 'green',
    '2': 'gray',
  }
  return colors[status] || 'blue'
}

const getStatusText = (status: TaskStatus) => {
  const texts: Record<TaskStatus, string> = {
    '0': t('task.statusOptions.pending'),
    '1': t('task.statusOptions.processing'),
    '2': t('task.statusOptions.completed'),
  }
  return texts[status] || t('common.unknown')
}

const handleSearch = () => {
  // 实现搜索逻辑
  console.log('search:', searchParams)
}

const handleAdd = () => {
  router.push('/task/detail/new')
}

const handleEdit = (record: TaskItem) => {
  router.push(`/task/detail/${record.id}`)
}

const handleView = (record: TaskItem) => {
  router.push(`/task/detail/${record.id}?mode=view`)
}

const handleDelete = (record: TaskItem) => {
  console.log('delete:', record)
}

const handleTableChange = (pag: TablePaginationConfig) => {
  pagination.current = pag.current || 1
  // 实现分页逻辑
}

// 初始化加载数据
const mockData: TaskItem[] = [
  {
    id: 1,
    name: '618美妆推广',
    platform: '抖音',
    status: '1',
    enrollCount: '10/20',
    startTime: '2024-06-01',
    endTime: '2024-06-18',
  },
  // 更多模拟数据...
]

tableData.value = mockData
</script>

<style lang="less" scoped>
.task-list {
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