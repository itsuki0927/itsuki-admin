import { rs } from '@/constants/ranks'
import type { API } from '@/services/ant-design-pro/typings'
import { markdownToHTML } from '@/transforms/markdown.transform'
import { Drawer, Space, Tag, Typography } from 'antd'

const genCodeMarkdownString = (code: string | undefined, language = 'js') =>
  code ? '```' + language + '\n' + code + '\n```' : ''

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
        <div dangerouslySetInnerHTML={{ __html: markdownToHTML(data?.skill ?? '') }} />
        <div
          dangerouslySetInnerHTML={{ __html: markdownToHTML(genCodeMarkdownString(data?.code)) }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: markdownToHTML(genCodeMarkdownString(data?.example)),
          }}
        />
      </Typography>
    </Drawer>
  )
}

export default SnippetDrawer
