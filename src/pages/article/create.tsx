import { createArticle } from '@/services/ant-design-pro/article'
import { PageContainer } from '@ant-design/pro-layout'
import { message } from 'antd'
import ArticleDetail from './components/ArticleDetail'

const CreateArticle = () => {
  return (
    <PageContainer>
      <ArticleDetail
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
