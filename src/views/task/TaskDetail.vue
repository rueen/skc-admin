<template>
  <div class="task-detail">
    <a-page-header
      :title="mode === 'view' ? '任务详情' : isEdit ? '编辑任务' : '新增任务'"
      @back="goBack"
    >
      <template #extra>
        <a-space>
          <a-button v-if="mode === 'view'" @click="handleEdit">编辑</a-button>
        </a-space>
      </template>
    </a-page-header>

    <a-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item
        :label="t('task.detail.form.name')"
        name="name"
      >
        <a-input
          v-model:value="formData.name"
          :placeholder="t('task.detail.form.namePlaceholder')"
          :maxLength="50"
          :disabled="isView"
        />
      </a-form-item>

      <a-form-item
        :label="t('task.detail.form.platform')"
        name="platform"
      >
        <a-select
          v-model:value="formData.platform"
          :placeholder="t('task.detail.form.platformPlaceholder')"
          :disabled="isView"
        >
          <a-select-option value="1">{{ t('task.platformOptions.douyin') }}</a-select-option>
          <a-select-option value="2">{{ t('task.platformOptions.kuaishou') }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        :label="t('task.detail.form.category')"
        name="category"
      >
        <a-select
          v-model:value="formData.category"
          :placeholder="t('task.detail.form.categoryPlaceholder')"
          :disabled="isView"
        >
          <a-select-option v-for="(label, value) in categoryOptions" :key="value" :value="value">
            {{ label }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        :label="t('task.detail.form.reward')"
        name="reward"
      >
        <a-input-number
          v-model:value="formData.reward"
          :placeholder="t('task.detail.form.rewardPlaceholder')"
          :min="1"
          :max="999999"
          :precision="2"
          :disabled="isView"
          style="width: 100%"
        />
      </a-form-item>

      <a-form-item
        :label="t('task.detail.form.startTime')"
        name="startTime"
      >
        <a-date-picker
          v-model:value="formData.startTime"
          :placeholder="t('task.detail.form.startTimePlaceholder')"
          :disabled="isView"
          style="width: 100%"
        />
      </a-form-item>

      <a-form-item
        :label="t('task.detail.form.endTime')"
        name="endTime"
      >
        <a-date-picker
          v-model:value="formData.endTime"
          :placeholder="t('task.detail.form.endTimePlaceholder')"
          :disabled="isView"
          style="width: 100%"
        />
      </a-form-item>

      <a-form-item
        :label="t('task.detail.form.quota')"
        name="quota"
      >
        <a-input-number
          v-model:value="formData.quota"
          :placeholder="t('task.detail.form.quotaPlaceholder')"
          :min="1"
          :max="999"
          :disabled="isView"
          style="width: 100%"
        />
      </a-form-item>

      <a-form-item
        :label="t('task.detail.form.publishType')"
        name="publishType"
      >
        <a-radio-group v-model:value="formData.publishType" :disabled="isView">
          <a-radio value="video">{{ t('task.detail.publishTypeOptions.video') }}</a-radio>
          <a-radio value="live">{{ t('task.detail.publishTypeOptions.live') }}</a-radio>
          <a-radio value="both">{{ t('task.detail.publishTypeOptions.both') }}</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        :label="t('task.detail.form.fansRequired')"
        name="fansRequired"
      >
        <a-input-number
          v-model:value="formData.fansRequired"
          :placeholder="t('task.detail.form.fansRequiredPlaceholder')"
          :min="1000"
          :max="9999999"
          :step="1000"
          :disabled="isView"
          style="width: 100%"
        />
      </a-form-item>

      <a-form-item
        :label="t('task.detail.form.contentRequirement')"
        name="contentRequirement"
      >
        <a-textarea
          v-model:value="formData.contentRequirement"
          :placeholder="t('task.detail.form.contentRequirementPlaceholder')"
          :rows="4"
          :maxLength="500"
          :disabled="isView"
        />
      </a-form-item>

      <a-form-item
        :label="t('task.detail.form.taskInfo')"
        name="taskInfo"
      >
        <a-textarea
          v-model:value="formData.taskInfo"
          :placeholder="t('task.detail.form.taskInfoPlaceholder')"
          :rows="4"
          :maxLength="1000"
          :disabled="isView"
        />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 16, offset: 4 }">
        <a-space>
          <a-button v-if="!isView" type="primary" @click="handleSubmit">
            {{ t('common.save') }}
          </a-button>
          <a-button @click="handleBack">
            {{ t('common.cancel') }}
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance } from 'ant-design-vue'
import dayjs from 'dayjs'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const formRef = ref<FormInstance>()

const mode = computed(() => route.query.mode)
const isEdit = computed(() => route.params.id !== 'new')
const isView = computed(() => route.query.mode === 'view')

// 模拟任务详情数据
const mockTaskDetail = {
  1: {
    name: '618美妆推广',
    platform: '1',
    category: 'beauty',
    reward: 1000,
    startTime: '2024-06-01',
    endTime: '2024-06-18',
    quota: 20,
    publishType: 'video',
    fansRequired: 10000,
    contentRequirement: '1. 视频时长不少于1分钟\n2. 展示产品使用效果\n3. 突出产品优势',
    taskInfo: '618美妆推广活动，通过达人种草带货，提升品牌知名度和销量。',
  },
  // 更多任务数据...
}

const formData = reactive({
  name: '',
  platform: undefined,
  category: undefined,
  reward: undefined,
  startTime: undefined,
  endTime: undefined,
  quota: undefined,
  publishType: undefined,
  fansRequired: undefined,
  contentRequirement: '',
  taskInfo: '',
})

// 获取任务详情
const getTaskDetail = async (id: string) => {
  try {
    // 这里应该是调用API获取数据
    // 暂时使用模拟数据
    const detail = mockTaskDetail[id as keyof typeof mockTaskDetail]
    if (detail) {
      Object.assign(formData, {
        ...detail,
        // 转换日期字符串为 dayjs 对象
        startTime: dayjs(detail.startTime),
        endTime: dayjs(detail.endTime),
      })
    }
  } catch (error) {
    console.error('获取任务详情失败:', error)
  }
}

// 在组件挂载时获取任务详情
onMounted(() => {
  const { id } = route.params
  if (id && id !== 'new') {
    getTaskDetail(id as string)
  }
})

const rules = {
  name: [{ required: true, message: t('task.detail.form.nameRequired') }],
  platform: [{ required: true, message: t('task.detail.form.platformRequired') }],
  category: [{ required: true, message: t('task.detail.form.categoryRequired') }],
  reward: [{ required: true, message: t('task.detail.form.rewardRequired') }],
  startTime: [{ required: true, message: t('task.detail.form.startTimeRequired') }],
  endTime: [{ required: true, message: t('task.detail.form.endTimeRequired') }],
  quota: [{ required: true, message: t('task.detail.form.quotaRequired') }],
  publishType: [{ required: true, message: t('task.detail.form.publishTypeRequired') }],
  fansRequired: [{ required: true, message: t('task.detail.form.fansRequiredRequired') }],
}

const categoryOptions = computed(() => ({
  beauty: t('task.detail.categoryOptions.beauty'),
  food: t('task.detail.categoryOptions.food'),
  travel: t('task.detail.categoryOptions.travel'),
  fashion: t('task.detail.categoryOptions.fashion'),
  lifestyle: t('task.detail.categoryOptions.lifestyle'),
  mother: t('task.detail.categoryOptions.mother'),
  education: t('task.detail.categoryOptions.education'),
  technology: t('task.detail.categoryOptions.technology'),
}))

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

const handleSubmit = () => {
  formRef.value?.validate().then(() => {
    console.log('form data:', formData)
    handleBack()
  })
}

const handleBack = () => {
  router.back()
}
</script>

<style lang="less" scoped>
.task-detail {
  max-width: 1000px;
  margin: 0 auto;
}
</style> 