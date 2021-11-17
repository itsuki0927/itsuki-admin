import { Container } from '@/components/common'
import { SnippetForm } from '@/components/snippet'
import { createSnippet } from '@/services/ant-design-pro/snippet'
import { message } from 'antd'

const SnippetCreate = () => {
  return (
    <Container>
      <SnippetForm
        key='createSnippet'
        onFinish={(values) => {
          return createSnippet(values).then(() => {
            message.success('创建成功')
            return true
          })
        }}
      />
    </Container>
  )
}

export default SnippetCreate
