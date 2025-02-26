/*
 * @Author: diaochan
 * @Date: 2025-02-26 11:32:36
 * @LastEditors: rueen
 * @LastEditTime: 2025-02-26 11:40:50
 * @Description: 
 */
import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN'
import enUS from './en-US'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

export default i18n 