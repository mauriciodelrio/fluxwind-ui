import type { Translations } from '../types';

/**
 * Chinese (Simplified) translations
 */
export const zh: Translations = {
  common: {
    loading: '加载中...',
    error: '错误',
    success: '成功',
    save: '保存',
    cancel: '取消',
    delete: '删除',
    edit: '编辑',
    close: '关闭',
    confirm: '确认',
    search: '搜索',
    filter: '筛选',
    reset: '重置',
    apply: '应用',
  },
  button: {
    submit: '提交',
    cancel: '取消',
    loading: '加载中...',
    disabled: '已禁用',
  },
  form: {
    required: '此字段为必填项',
    invalid: '无效值',
    email: '无效的电子邮件地址',
    minLength: '最少 {{min}} 个字符',
    maxLength: '最多 {{max}} 个字符',
  },
  validation: {
    required: '{{field}} 为必填项',
    email: '请输入有效的电子邮件',
    min: '最小值为 {{min}}',
    max: '最大值为 {{max}}',
  },
  items: {
    count: {
      zero: '无项目',
      one: '1 个项目',
      other: '{{count}} 个项目',
    },
  },
  aria: {
    close: '关闭',
    menu: '菜单',
    search: '搜索',
    loading: '加载中',
    navigation: '导航',
  },
};
