import { UniversalEditor } from '@/components/common'
import { UEditorLanguage } from '@/components/common/UniversalEditor'
import ProCard from '@ant-design/pro-card'
import { Form } from 'antd'

interface ArticleContentProps {
  cacheID?: string
}

const ArticleContent = ({ cacheID }: ArticleContentProps) => {
  return (
    <ProCard>
      <Form.Item name='content' rules={[{ required: true, message: '请输入文章内容' }]}>
        <UniversalEditor formStatus cacheID={cacheID} language={UEditorLanguage.Markdown} />
      </Form.Item>
    </ProCard>
  )
}

export default ArticleContent
