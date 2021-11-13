import { CodeBlock } from '@/components/common'
import { rs } from '@/constants/ranks'
import type { API } from '@/services/ant-design-pro/typings'
import { genMarkdownString } from '@/transforms/markdown'
import { Drawer, Space, Tag, Typography } from 'antd'

interface SnippetDrawerProps {
  visible: boolean
  onClose: () => void
  data?: API.Snippet
}

const SnippetDrawer = ({ data, visible, onClose }: SnippetDrawerProps) => {
  const ranks = data?.ranks !== undefined && rs(data?.ranks)
  return (
    <Drawer width={'50%'} visible={visible} title='预览' onClose={onClose}>
      <Typography>
        <Typography.Title level={3}>
          <Space align='center'>
            {data?.name}
            {ranks && (
              <Tag icon={ranks.icon} color={ranks.color}>
                {ranks.name}
              </Tag>
            )}
          </Space>
        </Typography.Title>
        <Typography.Paragraph>{data?.description}</Typography.Paragraph>
        <CodeBlock value={data?.skill ?? ''} />

        {/* 代码 */}
        <Typography.Title level={5}>Code</Typography.Title>
        <CodeBlock value={genMarkdownString(data?.code)} />

        {/* 示例 */}
        <Typography.Title level={5}>Example</Typography.Title>
        <CodeBlock value={genMarkdownString(data?.example)} />
      </Typography>
    </Drawer>
  )
}

export default SnippetDrawer
