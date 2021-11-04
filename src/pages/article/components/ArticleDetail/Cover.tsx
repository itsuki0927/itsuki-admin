import ImageUploader from '@/components/ImageUploader'
import ProCard from '@ant-design/pro-card'
import { Form } from 'antd'

const Cover = () => {
  return (
    <Form.Item name='cover'>
      <ProCard title='文章封面' headerBordered>
        <ImageUploader prefix='article' />
      </ProCard>
    </Form.Item>
  )
}

export default Cover
