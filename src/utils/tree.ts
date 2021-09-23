import type { DataNode } from 'rc-tree/lib/interface'

type ConvertTreeData = {
  parentId?: number
  id?: number
  [key: string]: any
}

type TreeData<T> = {
  children?: T[]
  name?: string
  id?: number
  [key: string]: any
}

/**
 * 将带有parentId和id的数组转换为树
 *
 * @param data 数组
 * @returns 树
 */
export function convertToTreeData<T extends ConvertTreeData>(data: T[]) {
  const [parentData, childData] = data.reduce<[T[], T[]]>(
    (acc, v) => {
      const idx = v.parentId === -1 ? 0 : 1
      acc[idx].push(v)
      return acc
    },
    [[], []]
  )

  const returnedData = parentData.map((item) => {
    const children = childData.filter((v) => v.parentId === item.id)
    return { ...item, children }
  })

  return returnedData as TreeData<T>[]
}

/**
 * 将当前树转换为Antd支持的数据格式
 *
 * @param tree 树
 * @param currentCategoryId 当前id
 * @returns
 */
export function getAntdTreeByTree<T extends TreeData<T>>(tree: T[], currentCategoryId?: number) {
  const toAntdTree = (_tree: T[]): DataNode[] => {
    return _tree.map((category) => ({
      data: category,
      title: category.name,
      key: category.id!,
      value: category.id!,
      disabled: Boolean(currentCategoryId && currentCategoryId === category.id),
      children: toAntdTree(category.children! || []),
    }))
  }
  return toAntdTree(tree)
}
