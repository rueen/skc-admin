/*
 * @Author: diaochan
 * @Date: 2025-02-26 11:32:36
 * @LastEditors: rueen
 * @LastEditTime: 2025-02-26 11:48:58
 * @Description: 
 */
import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zh,
    'en-US': en,
  },
})

export default i18n 