import { ImageUploader } from '@/components/common'
import ProCard from '@ant-design/pro-card'
import { Form } from 'antd'

const WrapperCover = (props: any) => {
  return (
    <ProCard title='文章封面' headerBordered>
      <ImageUploader prefix='article-cover' {...props} />
    </ProCard>
  )
}

const ArticleCover = () => {
  return (
    <Form.Item name='cover' rules={[{ message: '请上传封面', required: true }]}>
      <WrapperCover />
    </Form.Item>
  )
}

export default ArticleCover
