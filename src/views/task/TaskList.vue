<template>
  <div class="task-list">
    <div class="operation-bar">
      <a-space>
        <a-button type="primary" @click="handleAdd">
          <plus-outlined /> 新增任务
        </a-button>
        <a-input-search
          v-model:value="searchParams.keyword"
          placeholder="请输入任务名称"
          style="width: 200px"
          @search="handleSearch"
        />
      </a-space>
      <a-space>
        <a-select
          v-model:value="searchParams.platform"
          style="width: 120px"
          placeholder="平台渠道"
        >
          <a-select-option value="">全部</a-select-option>
          <a-select-option value="1">抖音</a-select-option>
          <a-select-option value="2">快手</a-select-option>
        </a-select>
        <a-select
          v-model:value="searchParams.status"
          style="width: 120px"
          placeholder="任务状态"
        >
          <a-select-option value="">全部</a-select-option>
          <a-select-option value="0">未开始</a-select-option>
          <a-select-option value="1">进行中</a-select-option>
          <a-select-option value="2">已结束</a-select-option>
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
            <a @click="handleEdit(record)">编辑</a>
            <a @click="handleView(record)">查看</a>
            <a-popconfirm
              title="确定要删除这个任务吗？"
              @confirm="handleDelete(record)"
            >
              <a class="danger">删除</a>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { TablePaginationConfig } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const columns = [
  {
    title: '任务名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '平台渠道',
    dataIndex: 'platform',
    key: 'platform',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '报名人数',
    dataIndex: 'enrollCount',
    key: 'enrollCount',
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    key: 'startTime',
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    key: 'endTime',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const searchParams = reactive({
  keyword: '',
  platform: '',
  status: '',
})

const loading = ref(false)
const tableData = ref([])
const pagination = reactive<TablePaginationConfig>({
  total: 0,
  current: 1,
  pageSize: 10,
})

// 模拟数据
const mockData = [
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

const getStatusColor = (status: string) => {
  const colors = {
    '0': 'blue',
    '1': 'green',
    '2': 'gray',
  }
  return colors[status] || 'blue'
}

const getStatusText = (status: string) => {
  const texts = {
    '0': '未开始',
    '1': '进行中',
    '2': '已结束',
  }
  return texts[status] || '未知'
}

const handleSearch = () => {
  // 实现搜索逻辑
  console.log('search:', searchParams)
}

const handleAdd = () => {
  router.push('/task/detail/new')
}

const handleEdit = (record: any) => {
  router.push(`/task/detail/${record.id}`)
}

const handleView = (record: any) => {
  router.push(`/task/detail/${record.id}?mode=view`)
}

const handleDelete = (record: any) => {
  console.log('delete:', record)
}

const handleTableChange = (pag: TablePaginationConfig) => {
  pagination.current = pag.current || 1
  // 实现分页逻辑
}

// 初始化加载数据
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