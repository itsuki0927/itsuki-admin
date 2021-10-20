import ImageUploader from '@/components/ImageUploader'
import ProCard from '@ant-design/pro-card'
import { Form } from 'antd'

const Cover = () => {
  return (
    <ProCard title='文章封面' headerBordered>
      <Form.Item name='cover' style={{ marginBottom: 0 }}>
        <ImageUploader prefix='article' />
      </Form.Item>
    </ProCard>
  )
}

export default Cover
