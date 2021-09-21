import { createArticle } from '@/services/ant-design-pro/article'
import { message } from 'antd'
import ArticleDetail from './components/ArticleDetail'

const CreateArticle = () => {
  return (
    <ArticleDetail
      onFinish={(value) => {
        console.log('value:', value)
        return createArticle(value).then(() => {
          message.success('发布成功')
          return true
        })
      }}
    />
  )
}

export default CreateArticle
