import ImageUploader from '@/components/ImageUploader'
import ProCard from '@ant-design/pro-card'
import { Form } from 'antd'

const WrapperCover = (props: any) => {
  return (
    <ProCard title='文章封面' headerBordered>
      <ImageUploader prefix='article-cover' {...props} />
    </ProCard>
  )
}

const Cover = () => {
  return (
    <Form.Item name='cover' rules={[{ message: '请上传封面', required: true }]}>
      <WrapperCover />
    </Form.Item>
  )
}

export default Cover
