import type { Translations } from '../types';

/**
 * Japanese translations
 */
export const ja: Translations = {
  common: {
    loading: '読み込み中...',
    error: 'エラー',
    success: '成功',
    save: '保存',
    cancel: 'キャンセル',
    delete: '削除',
    edit: '編集',
    close: '閉じる',
    confirm: '確認',
    search: '検索',
    filter: 'フィルター',
    reset: 'リセット',
    apply: '適用',
  },
  button: {
    submit: '送信',
    cancel: 'キャンセル',
    loading: '読み込み中...',
    disabled: '無効',
  },
  form: {
    required: 'このフィールドは必須です',
    invalid: '無効な値',
    email: '無効なメールアドレス',
    minLength: '最小 {{min}} 文字',
    maxLength: '最大 {{max}} 文字',
  },
  validation: {
    required: '{{field}} は必須です',
    email: '有効なメールアドレスを入力してください',
    min: '最小値は {{min}} です',
    max: '最大値は {{max}} です',
  },
  items: {
    count: {
      zero: 'アイテムなし',
      one: '1 アイテム',
      other: '{{count}} アイテム',
    },
  },
  aria: {
    close: '閉じる',
    menu: 'メニュー',
    search: '検索',
    loading: '読み込み中',
    navigation: 'ナビゲーション',
  },
};
