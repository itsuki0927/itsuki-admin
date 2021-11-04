import { queryCategoryList } from '@/services/ant-design-pro/category'
import type { API } from '@/services/ant-design-pro/typings'
import { convertToTreeData, getAntdTreeByTree } from '@/transforms/tree.transform'
import { ReloadOutlined } from '@ant-design/icons'
import ProCard from '@ant-design/pro-card'
import { Button, Divider, Form, Space, Tree, Typography } from 'antd'
import { useRequest } from 'umi'
import styles from './style.module.less'

type CategoryProps = {
  value?: number[]
  onChange?: (value: number[]) => void
}

const Category = ({ value, onChange }: CategoryProps) => {
  const { data, loading, refresh } = useRequest(() => queryCategoryList())

  return (
    <ProCard
      title='分类目录'
      headerBordered
      loading={loading}
      extra={
        <Button icon={<ReloadOutlined />} type='dashed' size='small' onClick={() => refresh()}>
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
            const category: API.Category = (nodeData as any).data
            return (
              <Space size='small'>
                <Typography.Text strong={true}>{category.name}</Typography.Text>
                <Divider type='vertical' />
                {category.path}
              </Space>
            )
          }}
        />
      )}
    </ProCard>
  )
}

const CategorySelect = () => {
  return (
    <Form.Item
      name='categoryIds'
      rules={[
        {
          message: '至少选择一个分类',
          required: true,
        },
      ]}
    >
      <Category />
    </Form.Item>
  )
}

export default CategorySelect
