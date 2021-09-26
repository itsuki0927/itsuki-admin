import { queryTagList } from '@/services/ant-design-pro/tag'
import { CheckOutlined, ReloadOutlined, TagOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Space, Spin, Typography } from 'antd'
import { useRequest } from 'umi'

type TagProps = {
  value?: number[]
  onChange?: (tags: number[]) => void
}

const Tag = ({ onChange, value: propValue }: TagProps) => {
  const { data, loading, refresh } = useRequest(() => queryTagList())

  const value = propValue || []

  function handleCheck(item: API.Tag, check: boolean) {
    const omitValues = check ? [...value, item.id] : value.filter((v) => v !== item.id)
    onChange?.(omitValues as number[])
  }

  return (
    <Space>
      {!data || !data.length ? (
        <Typography.Text>暂无标签</Typography.Text>
      ) : (
        <Spin spinning={loading}>
          <Space>
            {data.map((item) => {
              const check = value.includes(item.id)
              return (
                <Button
                  key={item.id}
                  size='small'
                  type={check ? 'primary' : 'default'}
                  onClick={() => handleCheck(item, !check)}
                  icon={check ? <CheckOutlined /> : <TagOutlined />}
                >
                  {item.name}
                </Button>
              )
            })}
          </Space>
        </Spin>
      )}
      <Divider type='vertical' />
      <Button size='small' type='dashed' icon={<ReloadOutlined />} onClick={() => refresh()}>
        刷新列表
      </Button>
    </Space>
  )
}

const TagSelect = () => {
  return (
    <Form.Item name='tagIds' label='标签'>
      <Tag />
    </Form.Item>
  )
}

export default TagSelect
