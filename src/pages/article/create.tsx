import { ArticleForm } from '@/components/article'
import { Container } from '@/components/common'
import { createArticle } from '@/services/ant-design-pro/article'
import { message } from 'antd'

const CreateArticle = () => {
  return (
    <Container>
      <ArticleForm
        onFinish={(value) => {
          return createArticle(value).then(() => {
            message.success('发布成功')
            return true
          })
        }}
      />
    </Container>
  )
}

export default CreateArticle
