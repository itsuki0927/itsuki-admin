import { omitBy } from 'lodash'

// 选中全部
export const SELECT_ALL_VALUE = -101

/**
 * 移除所有值为SELECT_ALL_VALUE属性,组成一个新对象
 *
 * @param target
 * @returns 排除了SELECT_ALL_VALUE值的对象
 */
export const omitSelectAllValue = (target?: Record<string, any>) =>
  omitBy(target, (v) => Number(v) === SELECT_ALL_VALUE)
