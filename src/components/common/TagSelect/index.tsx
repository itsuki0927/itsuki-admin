import { CheckCircleOutlined, ReloadOutlined, TagOutlined } from '@ant-design/icons'
import { Button, Divider, Space, Spin, Typography } from 'antd'
import styles from './index.less'

export interface TagItem {
  value: number
  label: string
}

export interface TagSelectProps {
  tags?: TagItem[]
  loading?: boolean
  onRefresh?: () => void
  value?: number[]
  onChange?: (tags: number[]) => void
}

const TagSelect = ({ onChange, value: propValue, tags, loading, onRefresh }: TagSelectProps) => {
  const value = propValue || []

  function handleCheck(item: TagItem, check: boolean) {
    const omitValues = check ? [...value, item.value] : value.filter((v) => v !== item.value)
    onChange?.(omitValues as number[])
  }

  return (
    <Space className={styles.tag}>
      {!tags || !tags.length ? (
        <Typography.Text>暂无标签</Typography.Text>
      ) : (
        <Spin spinning={loading}>
          <Space size={12} wrap>
            {tags.map((tag) => {
              const check = value.includes(tag.value)
              return (
                <Button
                  key={tag.value}
                  size='small'
                  type={check ? 'primary' : 'default'}
                  onClick={() => handleCheck(tag, !check)}
                  icon={check ? <CheckCircleOutlined /> : <TagOutlined />}
                >
                  {tag.label}
                </Button>
              )
            })}
          </Space>
        </Spin>
      )}
      <Divider type='vertical' />
      <Button size='small' type='dashed' icon={<ReloadOutlined />} onClick={() => onRefresh?.()}>
        刷新列表
      </Button>
    </Space>
  )
}

export default TagSelect
