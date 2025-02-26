<template>
  <div class="finance-list">
    <div class="operation-bar">
      <a-space>
        <a-input-search
          v-model:value="searchParams.keyword"
          placeholder="请输入账单ID"
          style="width: 200px"
          @search="handleSearch"
        />
        <a-select
          v-model:value="searchParams.type"
          style="width: 120px"
          placeholder="账单类型"
        >
          <a-select-option value="">全部</a-select-option>
          <a-select-option value="1">任务收益</a-select-option>
          <a-select-option value="2">邀请奖励</a-select-option>
          <a-select-option value="3">群主奖励</a-select-option>
          <a-select-option value="4">提现</a-select-option>
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
      <template #type="{ text }">
        <span>{{ getBillType(text) }}</span>
      </template>
      <template #amount="{ text, record }">
        <span :class="{ 'text-red': record.type === '4' }">
          {{ record.type === '4' ? '-' : '+' }}{{ text }}
        </span>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { TablePaginationConfig } from 'ant-design-vue'

const columns = [
  {
    title: '账单ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '账单类型',
    dataIndex: 'type',
    key: 'type',
    slots: { customRender: 'type' },
  },
  {
    title: '关联任务',
    dataIndex: 'taskName',
    key: 'taskName',
  },
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
    slots: { customRender: 'amount' },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
]

const searchParams = reactive({
  keyword: '',
  type: '',
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
    id: 'BILL001',
    type: '1',
    taskName: '618美妆推广',
    amount: '1000.00',
    createTime: '2024-06-01 10:00:00',
  },
  {
    id: 'BILL002',
    type: '4',
    taskName: '-',
    amount: '2000.00',
    createTime: '2024-06-02 14:30:00',
  },
]

const getBillType = (type: string) => {
  const types = {
    '1': '任务收益',
    '2': '邀请奖励',
    '3': '群主奖励',
    '4': '提现',
  }
  return types[type] || '未知'
}

const handleSearch = () => {
  console.log('search:', searchParams)
}

const handleTableChange = (pag: TablePaginationConfig) => {
  pagination.current = pag.current || 1
}

// 初始化加载数据
tableData.value = mockData
</script>

<style lang="less" scoped>
.finance-list {
  .operation-bar {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
  }

  .text-red {
    color: #ff4d4f;
  }
}
</style> 