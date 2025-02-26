<template>
  <div class="enrollment-detail">
    <a-page-header
      :title="'报名详情'"
      @back="goBack"
    >
      <template #extra>
        <a-space v-if="detail.status === '0'">
          <a-button type="primary" @click="handleApprove">审核通过</a-button>
          <a-button danger @click="handleReject">审核拒绝</a-button>
        </a-space>
      </template>
    </a-page-header>

    <a-card title="任务信息" class="detail-card">
      <a-descriptions :column="2">
        <a-descriptions-item label="任务ID">{{ detail.taskId }}</a-descriptions-item>
        <a-descriptions-item label="任务名称">
          <a @click="goToTask">{{ detail.taskName }}</a>
        </a-descriptions-item>
        <a-descriptions-item label="平台渠道">{{ detail.platform }}</a-descriptions-item>
        <a-descriptions-item label="任务状态">
          <a-tag :color="getTaskStatusColor(detail.taskStatus)">
            {{ getTaskStatusText(detail.taskStatus) }}
          </a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="开始时间">{{ detail.startTime }}</a-descriptions-item>
        <a-descriptions-item label="结束时间">{{ detail.endTime }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card title="会员信息" class="detail-card">
      <a-descriptions :column="2">
        <a-descriptions-item label="会员ID">{{ detail.memberId }}</a-descriptions-item>
        <a-descriptions-item label="会员昵称">
          {{ detail.memberName }}
          <a-tooltip v-if="detail.isGroupOwner" :title="detail.groupName">
            <a-tag color="purple" style="margin-left: 8px">群主</a-tag>
          </a-tooltip>
        </a-descriptions-item>
        <a-descriptions-item label="手机号码">{{ detail.phone }}</a-descriptions-item>
        <a-descriptions-item label="粉丝数量">{{ detail.fansCount }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card title="报名数据" class="detail-card">
      <a-descriptions :column="1">
        <a-descriptions-item label="帖子链接">
          <a :href="detail.postLink" target="_blank">{{ detail.postLink }}</a>
        </a-descriptions-item>
        <a-descriptions-item label="分享链接">
          <a :href="detail.shareLink" target="_blank">{{ detail.shareLink }}</a>
        </a-descriptions-item>
        <a-descriptions-item label="数据截图">
          <a-image-preview-group>
            <a-space>
              <a-image
                v-for="(img, index) in detail.screenshots"
                :key="index"
                :src="img"
                :width="200"
              />
            </a-space>
          </a-image-preview-group>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card title="审核信息" class="detail-card">
      <a-descriptions :column="2">
        <a-descriptions-item label="报名时间">{{ detail.createTime }}</a-descriptions-item>
        <a-descriptions-item label="报名状态">
          <a-tag :color="getStatusColor(detail.status)">
            {{ getStatusText(detail.status) }}
          </a-tag>
        </a-descriptions-item>
        <template v-if="detail.status !== '0'">
          <a-descriptions-item label="审核时间">{{ detail.auditTime }}</a-descriptions-item>
          <a-descriptions-item label="审核人">{{ detail.auditor }}</a-descriptions-item>
          <a-descriptions-item v-if="detail.status === '2'" label="拒绝原因">
            {{ detail.rejectReason }}
          </a-descriptions-item>
        </template>
      </a-descriptions>
    </a-card>

    <!-- 审核通过确认弹窗 -->
    <a-modal
      v-model:open="approveModalVisible"
      title="审核通过"
      @ok="handleApproveConfirm"
      :okText="'确定'"
      :cancelText="'取消'"
    >
      <p>审核通过后无法撤回，确认审核通过吗？</p>
    </a-modal>

    <!-- 拒绝原因弹窗 -->
    <a-modal
      v-model:open="rejectModalVisible"
      title="审核拒绝"
      @ok="handleRejectConfirm"
      :okText="'确定'"
      :cancelText="'取消'"
    >
      <a-form :model="rejectForm">
        <a-form-item
          label="拒绝原因"
          name="reason"
          :rules="[{ required: true, message: '请输入拒绝原因' }]"
        >
          <a-textarea
            v-model:value="rejectForm.reason"
            placeholder="请输入拒绝原因"
            :rows="4"
            :maxLength="200"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { FormInstance } from 'ant-design-vue'

const router = useRouter()
const route = useRoute()

// 模拟详情数据
const mockDetail = {
  id: 1,
  taskId: 'TASK001',
  taskName: '618美妆推广',
  platform: '抖音',
  taskStatus: '1',
  startTime: '2024-06-01',
  endTime: '2024-06-18',
  memberId: 'M001',
  memberName: '张三',
  isGroupOwner: true,
  groupName: '美妆交流群',
  phone: '13800138000',
  fansCount: '100.5k',
  postLink: 'https://www.douyin.com/video/123456',
  shareLink: 'https://www.douyin.com/share/123456',
  screenshots: [
    'https://example.com/screenshot1.jpg',
    'https://example.com/screenshot2.jpg',
  ],
  status: '0',
  createTime: '2024-06-01 10:00:00',
  auditTime: '',
  auditor: '',
  rejectReason: '',
}

const detail = reactive({ ...mockDetail })

// 审核通过相关
const approveModalVisible = ref(false)

// 拒绝相关
const rejectModalVisible = ref(false)
const rejectForm = reactive({
  reason: '',
})
const rejectFormRef = ref<FormInstance>()

const getTaskStatusColor = (status: string) => {
  const colors = {
    '0': 'blue',
    '1': 'green',
    '2': 'gray',
  }
  return colors[status] || 'blue'
}

const getTaskStatusText = (status: string) => {
  const texts = {
    '0': '未开始',
    '1': '进行中',
    '2': '已结束',
  }
  return texts[status] || '未知'
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

const goBack = () => {
  router.back()
}

const goToTask = () => {
  router.push(`/task/detail/${detail.taskId}?mode=view`)
}

const handleApprove = () => {
  approveModalVisible.value = true
}

const handleApproveConfirm = () => {
  console.log('approve:', detail.id)
  approveModalVisible.value = false
}

const handleReject = () => {
  rejectModalVisible.value = true
}

const handleRejectConfirm = () => {
  if (!rejectForm.reason.trim()) {
    return
  }
  console.log('reject:', {
    id: detail.id,
    reason: rejectForm.reason,
  })
  rejectModalVisible.value = false
  rejectForm.reason = ''
}
</script>

<style lang="less" scoped>
.enrollment-detail {
  .detail-card {
    margin-bottom: 24px;
  }
}
</style> 