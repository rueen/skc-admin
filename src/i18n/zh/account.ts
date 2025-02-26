export default {
  title: '账号管理',
  newAccount: '新增账号',
  columns: {
    username: '账号名称',
    description: '账号说明',
    operation: '操作',
  },
  form: {
    username: '用户名',
    usernamePlaceholder: '请输入用户名',
    usernameRequired: '请输入用户名',
    password: '密码',
    passwordPlaceholder: '请输入密码',
    passwordRequired: '请输入密码',
    description: '账号说明',
    descriptionPlaceholder: '请输入账号说明',
  },
  permissions: {
    title: '权限设置',
    navigation: {
      title: '导航权限',
      task: '任务管理',
      enrollment: '报名管理',
      member: '会员管理',
      finance: '金融管理',
      platform: '平台渠道',
      group: '群管理',
      account: '账号管理',
    },
    task: {
      title: '任务权限',
      create: '新增任务',
      edit: '编辑任务',
      view: '查看任务',
      delete: '删除任务',
    },
    enrollment: {
      title: '报名权限',
      view: '查看详情',
      review: '审核报名',
    },
    member: {
      title: '会员权限',
      create: '新增会员',
      edit: '编辑会员',
      view: '查看会员',
      delete: '删除会员',
    },
    platform: {
      title: '渠道权限',
      create: '新增渠道',
      view: '查看渠道',
      edit: '编辑渠道',
      delete: '删除渠道',
    },
    group: {
      title: '群组权限',
      create: '新增群组',
      edit: '编辑群组',
      view: '查看群组',
      delete: '删除群组',
    },
  },
  deleteConfirm: '确定要删除这个账号吗？',
  permissionButton: '权限设置',
  editButton: '修改',
  deleteButton: '删除',
} 