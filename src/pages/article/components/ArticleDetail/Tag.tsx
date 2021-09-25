import { useRequest } from 'umi'
import { Button, Space, Typography, Form, Divider, Spin } from 'antd'
import { queryTagList } from '@/services/ant-design-pro/tag'
import { CheckOutlined, ReloadOutlined, TagOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

type TagProps = {
  value?: number[]
  onChange?: (tags: number[]) => void
}

const Tag = ({ onChange }: TagProps) => {
  const { data, loading, refresh } = useRequest(() => queryTagList())

  const [checked, setChecked] = useState<{ check: boolean; value: number; name: string }[]>([])

  useEffect(() => {
    if (data) {
      const temp = data.map((item) => {
        return {
          checked: false,
          value: item.id,
          name: item.name,
        }
      })
      setChecked(temp as any[])
    }
  }, [data])

  return (
    <Space>
      {!data || !data.length ? (
        <Typography.Text>暂无标签</Typography.Text>
      ) : (
        <Spin spinning={loading}>
          <Space>
            {checked.map((item, index) => (
              <Button
                key={item.value}
                size='small'
                type={item.check ? 'primary' : 'default'}
                onClick={() => {
                  const check = !item.check
                  checked.splice(index, 1, {
                    ...item,
                    check,
                  })
                  setChecked([...checked])
                  onChange?.(checked.filter((v) => v.check).map((v) => v.value))
                }}
                icon={item.check ? <CheckOutlined /> : <TagOutlined />}
              >
                {item.name}
              </Button>
            ))}
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

const FormTag = () => {
  return (
    <Form.Item name='tagIds' label='标签'>
      <Tag />
    </Form.Item>
  )
}

export default FormTag
