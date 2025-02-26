<template>
  <div class="task-detail">
    <a-page-header
      :title="mode === 'view' ? '任务详情' : isEdit ? '编辑任务' : '新增任务'"
      @back="goBack"
    >
      <template #extra>
        <a-space>
          <a-button v-if="mode === 'view'" @click="handleEdit">编辑</a-button>
          <a-button v-else type="primary" @click="handleSave">保存</a-button>
        </a-space>
      </template>
    </a-page-header>

    <a-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :disabled="mode === 'view'"
      layout="vertical"
    >
      <a-card title="基本信息" class="card-wrapper">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="任务名称" name="name">
              <a-input v-model:value="formData.name" placeholder="请输入任务名称" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="平台渠道" name="platform">
              <a-select v-model:value="formData.platform" placeholder="请选择平台渠道">
                <a-select-option value="1">抖音</a-select-option>
                <a-select-option value="2">快手</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="达人领域" name="category">
              <a-select v-model:value="formData.category" placeholder="请选择达人领域">
                <a-select-option value="1">生活/宝妈</a-select-option>
                <a-select-option value="2">运动达人</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="任务奖励" name="reward">
              <a-input-number
                v-model:value="formData.reward"
                :min="0"
                :step="100"
                class="full-width"
                placeholder="请输入任务奖励"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="任务时间" name="timeRange">
              <a-range-picker
                v-model:value="formData.timeRange"
                show-time
                class="full-width"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="任务名额" name="quota">
              <a-input-number
                v-model:value="formData.quota"
                :min="1"
                class="full-width"
                placeholder="请输入任务名额"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

      <a-card title="任务要求" class="card-wrapper">
        <a-form-item label="发布形式" name="publishType">
          <a-radio-group v-model:value="formData.publishType">
            <a-radio value="1">图文</a-radio>
            <a-radio value="2">视频</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="粉丝要求" name="fansRequirement">
          <a-input-number
            v-model:value="formData.fansRequirement"
            :min="0"
            :step="1000"
            class="full-width"
            placeholder="请输入最低粉丝数要求"
          />
        </a-form-item>
        <a-form-item label="作品要求" name="contentRequirement">
          <a-textarea
            v-model:value="formData.contentRequirement"
            :rows="4"
            placeholder="请输入作品要求"
          />
        </a-form-item>
      </a-card>

      <a-card title="任务信息" class="card-wrapper">
        <a-form-item name="description">
          <a-textarea
            v-model:value="formData.description"
            :rows="6"
            placeholder="请输入任务详细信息"
          />
        </a-form-item>
      </a-card>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance } from 'ant-design-vue'

const route = useRoute()
const router = useRouter()
const formRef = ref<FormInstance>()

const mode = computed(() => route.query.mode)
const isEdit = computed(() => route.params.id !== 'new')

const formData = reactive({
  name: '',
  platform: undefined,
  category: undefined,
  reward: undefined,
  timeRange: [],
  quota: undefined,
  publishType: '1',
  fansRequirement: undefined,
  contentRequirement: '',
  description: '',
})

const rules = {
  name: [{ required: true, message: '请输入任务名称' }],
  platform: [{ required: true, message: '请选择平台渠道' }],
  category: [{ required: true, message: '请选择达人领域' }],
  reward: [{ required: true, message: '请输入任务奖励' }],
  timeRange: [{ required: true, message: '请选择任务时间' }],
  quota: [{ required: true, message: '请输入任务名额' }],
  fansRequirement: [{ required: true, message: '请输入粉丝要求' }],
}

const goBack = () => {
  router.back()
}

const handleEdit = () => {
  router.push(`/task/detail/${route.params.id}`)
}

const handleSave = async () => {
  try {
    await formRef.value?.validate()
    console.log('form data:', formData)
    // 实现保存逻辑
  } catch (error) {
    console.error('validation failed:', error)
  }
}
</script>

<style lang="less" scoped>
.task-detail {
  .card-wrapper {
    margin-bottom: 24px;
  }

  .full-width {
    width: 100%;
  }
}
</style> 