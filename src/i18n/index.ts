/*
 * @Author: diaochan
 * @Date: 2025-02-26 11:32:36
 * @LastEditors: rueen
 * @LastEditTime: 2025-02-26 11:48:58
 * @Description: 
 */
import { createI18n } from 'vue-i18n'
import zhCN from './zh'
import enUS from './en'

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