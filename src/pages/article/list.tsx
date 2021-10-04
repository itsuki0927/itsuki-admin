import type { ArticleSearchRequest } from '@/services/ant-design-pro/article'
import { patchArticle } from '@/services/ant-design-pro/article'
import { PageContainer } from '@ant-design/pro-layout'
import { useState } from 'react'
import ArticleTable from './components/Table'
import ArticleQuery from './components/Query'
import { message } from 'antd'

const ArticleList = () => {
  const [query, setQuery] = useState<ArticleSearchRequest | undefined>()

  return (
    <PageContainer>
      <ArticleQuery onFinish={(values) => setQuery(values)} />
      <ArticleTable
        query={query}
        onPatch={(data) =>
          patchArticle(data).then((res) => {
            message.success('变更成功')
            return res
          })
        }
      />
    </PageContainer>
  )
}

export default ArticleList
