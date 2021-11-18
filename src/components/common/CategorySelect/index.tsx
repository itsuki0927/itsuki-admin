import { convertToTreeData, getAntdTreeByTree } from '@/transforms/tree'
import { ReloadOutlined } from '@ant-design/icons'
import ProCard from '@ant-design/pro-card'
import type { TreeProps } from 'antd'
import { Button, Divider, Space, Tree, Typography } from 'antd'
import type { ReactNode } from 'react'
import styles from './index.less'

type CategoryItem = {
  id: number
  parentId: number
  name: string
  path: string
}

export interface CategorySelectProps {
  data?: CategoryItem[]
  loading?: boolean
  onRefresh?: () => void
  value?: number[]
  onChange?: (value: number[]) => void
  treeProps?: TreeProps
  title?: ReactNode
}

const CategorySelect = ({
  value,
  onChange,
  loading,
  data,
  onRefresh,
  treeProps,
  title = '分类目录',
}: CategorySelectProps) => {
  return (
    <ProCard
      title={title}
      headerBordered
      loading={loading}
      extra={
        <Button icon={<ReloadOutlined />} type='dashed' size='small' onClick={onRefresh}>
          刷新列表
        </Button>
      }
    >
      {!data || !data.length ? (
        <Typography.Text type='secondary'>无分类</Typography.Text>
      ) : (
        <Tree
          className={styles.categorySelect}
          treeData={getAntdTreeByTree(convertToTreeData(data || []))}
          showLine
          checkable
          blockNode
          defaultExpandAll
          checkStrictly
          checkedKeys={value}
          onCheck={(omitValue) => {
            const ids = Array.isArray(omitValue) ? omitValue : omitValue.checked
            onChange?.(ids as number[])
          }}
          titleRender={(nodeData) => {
            const category = (nodeData as any).data
            return (
              <Space size='small'>
                <Typography.Text strong={true}>{category.name}</Typography.Text>
                <Divider type='vertical' />
                {category.path}
              </Space>
            )
          }}
          {...treeProps}
        />
      )}
    </ProCard>
  )
}

export default CategorySelect
