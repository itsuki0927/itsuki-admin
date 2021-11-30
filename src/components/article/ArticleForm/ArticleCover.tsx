import { ImageUploader } from '@/components/common'
import ProCard from '@ant-design/pro-card'
import { Form } from 'antd'

const ArticleCover = () => {
  return (
    <ProCard title='文章封面' headerBordered>
      <Form.Item name='cover' rules={[{ message: '请上传封面', required: true }]}>
        <ImageUploader prefix='article-cover' />
      </Form.Item>
    </ProCard>
  )
}

export default ArticleCover
