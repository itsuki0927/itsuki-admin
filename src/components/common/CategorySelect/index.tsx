import { ReloadOutlined } from '@ant-design/icons'
import ProCard from '@ant-design/pro-card'
import { Button, Divider, Space, Select, Typography } from 'antd'
import type { ReactNode } from 'react'

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
  title?: ReactNode
}

const CategorySelect = ({
  value,
  onChange,
  loading,
  data,
  onRefresh,
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
        <Select placeholder='请选择文章分类' value={value} onChange={onChange}>
          {data.map((category) => (
            <Select.Option value={category.id}>
              <Space size='small'>
                <Typography.Text strong={true}>{category.name}</Typography.Text>
                <Divider type='vertical' />
                {category.path}
              </Space>
            </Select.Option>
          ))}
        </Select>
      )}
    </ProCard>
  )
}

export default CategorySelect
