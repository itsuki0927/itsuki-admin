import type { ArticleSearchRequest } from '@/services/ant-design-pro/article'
import { PageContainer } from '@ant-design/pro-layout'
import { useState } from 'react'
import ArticleTable from './components/Table'
import ArticleQuery from './components/Query'

const ArticleList = () => {
  const [query, setQuery] = useState<ArticleSearchRequest | undefined>()

  return (
    <PageContainer>
      <ArticleQuery onFinish={(values) => setQuery(values)} />
      <ArticleTable query={query} />
    </PageContainer>
  )
}

export default ArticleList
