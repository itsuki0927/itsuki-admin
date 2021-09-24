import { LinkOutlined } from '@ant-design/icons'
import ProCard from '@ant-design/pro-card'
import { ProFormText, ProFormUploadDragger } from '@ant-design/pro-form'

const Cover = () => {
  return (
    <ProCard title='文章封面' headerBordered>
      <ProFormUploadDragger
        name='cover'
        style={{ width: '100%' }}
        max={1}
        fieldProps={{ name: 'file' }}
      />
      <ProFormText
        placeholder='可以直接输入地址'
        name='coverUrl'
        fieldProps={{ prefix: <LinkOutlined /> }}
      />
    </ProCard>
  )
}

export default Cover
