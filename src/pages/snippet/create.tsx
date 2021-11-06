import SnippetForm from '@/components/snippet/SnippetForm'
import { createSnippet } from '@/services/ant-design-pro/snippet'
import { PageContainer } from '@ant-design/pro-layout'
import { message } from 'antd'

const SnippetCreate = () => {
  return (
    <PageContainer>
      <SnippetForm
        key='createSnippet'
        onFinish={(values) => {
          return createSnippet(values).then(() => {
            message.success('创建成功')
            return true
          })
        }}
      />
    </PageContainer>
  )
}

export default SnippetCreate
