<template>
  <div class="enrollment-list">
    <div class="operation-bar">
      <a-space>
        <a-input-search
          v-model:value="searchParams.keyword"
          placeholder="请输入任务ID"
          style="width: 200px"
          @search="handleSearch"
        />
        <a-select
          v-model:value="searchParams.status"
          style="width: 120px"
          placeholder="报名状态"
        >
          <a-select-option value="">全部</a-select-option>
          <a-select-option value="0">待审核</a-select-option>
          <a-select-option value="1">已通过</a-select-option>
          <a-select-option value="2">已拒绝</a-select-option>
        </a-select>
      </a-space>
      <a-space>
        <a-button
          type="primary"
          :disabled="!selectedRows.length"
          @click="handleBatchApprove"
        >
          批量通过
        </a-button>
        <a-button
          danger
          :disabled="!selectedRows.length"
          @click="handleBatchReject"
        >
          批量拒绝
        </a-button>
      </a-space>
    </div>

    <a-table
      :columns="columns"
      :data-source="tableData"
      :loading="loading"
      :pagination="pagination"
      :row-selection="rowSelection"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.key === 'status'">
          <a-tag :color="getStatusColor(text)">{{ getStatusText(text) }}</a-tag>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-space>
            <a @click="handleView(record)">查看</a>
            <template v-if="record.status === '0'">
              <a @click="handleApprove(record)">审核通过</a>
              <a class="danger" @click="handleReject(record)">审核拒绝</a>
            </template>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TablePaginationConfig } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const columns = [
  {
    title: '任务ID',
    dataIndex: 'taskId',
    key: 'taskId',
  },
  {
    title: '任务名称',
    dataIndex: 'taskName',
    key: 'taskName',
  },
  {
    title: '会员昵称',
    dataIndex: 'memberName',
    key: 'memberName',
  },
  {
    title: '报名时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const searchParams = reactive({
  keyword: '',
  status: '',
})

const loading = ref(false)
const tableData = ref([])
const selectedRows = ref<any[]>([])
const pagination = reactive<TablePaginationConfig>({
  total: 0,
  current: 1,
  pageSize: 10,
})

// 模拟数据
const mockData = [
  {
    id: 1,
    taskId: 'TASK001',
    taskName: '618美妆推广',
    memberName: '张三',
    createTime: '2024-06-01 10:00:00',
    status: '0',
  },
  // 更多模拟数据...
]

const rowSelection = {
  onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
    console.log('selectedRowKeys:', selectedRowKeys)
    selectedRows.value = selectedRows
  },
}

const getStatusColor = (status: string) => {
  const colors = {
    '0': 'blue',
    '1': 'green',
    '2': 'red',
  }
  return colors[status] || 'blue'
}

const getStatusText = (status: string) => {
  const texts = {
    '0': '待审核',
    '1': '已通过',
    '2': '已拒绝',
  }
  return texts[status] || '未知'
}

const handleSearch = () => {
  console.log('search:', searchParams)
}

const handleView = (record: any) => {
  router.push(`/enrollment/detail/${record.id}`)
}

const handleApprove = (record: any) => {
  console.log('approve:', record)
}

const handleReject = (record: any) => {
  console.log('reject:', record)
}

const handleBatchApprove = () => {
  console.log('batch approve:', selectedRows.value)
}

const handleBatchReject = () => {
  console.log('batch reject:', selectedRows.value)
}

const handleTableChange = (pag: TablePaginationConfig) => {
  pagination.current = pag.current || 1
}

// 初始化加载数据
tableData.value = mockData
</script>

<style lang="less" scoped>
.enrollment-list {
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