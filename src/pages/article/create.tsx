import { ArticleForm } from '@/components/article'
import { createArticle } from '@/services/ant-design-pro/article'
import { PageContainer } from '@ant-design/pro-layout'
import { message } from 'antd'

const CreateArticle = () => {
  return (
    <PageContainer>
      <ArticleForm
        onFinish={(value) => {
          return createArticle(value).then(() => {
            message.success('发布成功')
            return true
          })
        }}
      />
    </PageContainer>
  )
}

export default CreateArticle
