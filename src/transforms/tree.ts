import type { DataNode } from 'rc-tree/lib/interface';
import { NO_PARENT_VALUE } from '@/constants/common';
import type { CommentTree } from '@/entities/comment';
import type { API } from '@/entities/typings';

type ConvertTreeData = {
  parentId: number;
  id: number;
  [key: string]: any;
};

type TreeData<T = ConvertTreeData> = ConvertTreeData & {
  children?: T[];
  name?: string;
};

/**
 * 将带有parentId和id的数组转换为树
 *
 * @param data 数组
 * @returns 树
 */
export function convertToTreeData<T extends ConvertTreeData>(dataSources: T[]) {
  function buildConvertToTreeData(data: T[], parentId: number): TreeData<T>[] {
    const parentData = data.filter(v => v.parentId === parentId) as TreeData<T>[];

    return parentData.map(item => {
      const children = buildConvertToTreeData(data, item.id);
      return { ...item, children };
    }) as TreeData<T>[];
  }

  return buildConvertToTreeData(dataSources, NO_PARENT_VALUE);
}

/**
 * 将当前树转换为Antd支持的数据格式
 *
 * @param tree 树
 * @param currentCategoryId 当前id
 * @returns
 */
export function getAntdTreeByTree<T extends TreeData<T>>(
  tree: T[],
  currentCategoryId?: number
) {
  const toAntdTree = (_tree: T[]): DataNode[] =>
    _tree.map(category => ({
      data: category,
      title: category.name,
      key: category.id!,
      value: category.id!,
      disabled: Boolean(currentCategoryId && currentCategoryId === category.id),
      children: toAntdTree(category.children! || []),
    }));
  return toAntdTree(tree);
}

const buildCommentTree = (data: API.Comment[], parentId: number) => {
  const newData = JSON.parse(JSON.stringify(data)) as API.Comment[];
  const parents = newData.filter(v => v.parentId == parentId) as CommentTree[];

  return parents.map(item => {
    item.children = buildCommentTree(newData, item.id);
    return item;
  });
};

/**
 * comment数组转化为comment tree
 */
export const convertToCommentTreeData = (data: API.Comment[]) =>
  buildCommentTree(data, NO_PARENT_VALUE);
