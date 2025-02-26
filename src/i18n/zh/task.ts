/*
 * @Author: diaochan
 * @Date: 2025-02-26 11:50:50
 * @LastEditors: rueen
 * @LastEditTime: 2025-02-26 15:24:40
 * @Description: 
 */
export default {
  platform: '平台渠道',
  newTask: '新增任务',
  searchPlaceholder: '请输入任务名称',
  platformPlaceholder: '平台渠道',
  statusPlaceholder: '任务状态',
  columns: {
    name: '任务名称',
    platform: '平台渠道',
    status: '状态',
    enrollCount: '报名人数',
    startTime: '开始时间',
    endTime: '结束时间',
    operation: '操作',
  },
  status: {
    pending: '未开始',
    processing: '进行中',
    completed: '已结束',
  },
  platformOptions: {
    all: '全部',
    douyin: '抖音',
    kuaishou: '快手',
  },
  statusOptions: {
    all: '全部',
    pending: '未开始',
    processing: '进行中',
    completed: '已结束',
  },
  deleteConfirm: '确定要删除这个任务吗？',
  detail: {
    title: {
      new: '新增任务',
      edit: '编辑任务',
      view: '任务详情',
    },
    form: {
      name: '任务名称',
      namePlaceholder: '请输入任务名称',
      nameRequired: '请输入任务名称',
      platform: '平台渠道',
      platformPlaceholder: '请选择平台渠道',
      platformRequired: '请选择平台渠道',
      category: '达人领域',
      categoryPlaceholder: '请选择达人领域',
      categoryRequired: '请选择达人领域',
      reward: '任务奖励',
      rewardPlaceholder: '请输入任务奖励',
      rewardRequired: '请输入任务奖励',
      startTime: '开始时间',
      startTimePlaceholder: '请选择开始时间',
      startTimeRequired: '请选择开始时间',
      endTime: '结束时间',
      endTimePlaceholder: '请选择结束时间',
      endTimeRequired: '请选择结束时间',
      quota: '任务名额',
      quotaPlaceholder: '请输入任务名额',
      quotaRequired: '请输入任务名额',
      publishType: '发布形式',
      publishTypeRequired: '请选择发布形式',
      fansRequired: '粉丝要求',
      fansRequiredPlaceholder: '请输入最低粉丝数',
      fansRequiredRequired: '请输入粉丝要求',
      contentRequirement: '作品要求',
      contentRequirementPlaceholder: '请输入作品要求',
      taskInfo: '任务信息',
      taskInfoPlaceholder: '请输入任务信息',
    },
    categoryOptions: {
      beauty: '美妆',
      food: '美食',
      travel: '旅游',
      fashion: '时尚',
      lifestyle: '生活方式',
      mother: '母婴',
      education: '教育',
      technology: '科技数码',
    },
    publishTypeOptions: {
      video: '视频',
      live: '直播',
      both: '视频+直播',
    },
  },
} 