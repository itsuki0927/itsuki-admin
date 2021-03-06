import { ArticleForm } from '@/components/article'
import { Container } from '@/components/common'
import { CREATE_ARTICLE } from '@/graphql/article'
import type { API } from '@/services/ant-design-pro/typings'
import { useMutation } from '@apollo/client'
import { message } from 'antd'

const CreateArticle = () => {
  const [createArticle] = useMutation<API.Article, any>(CREATE_ARTICLE)
  return (
    <Container>
      <ArticleForm
        onFinish={async (input) => {
          await createArticle({
            variables: {
              input,
            },
          })
          message.success('发布成功')
          return true
        }}
      />
    </Container>
  )
}

export default CreateArticle
