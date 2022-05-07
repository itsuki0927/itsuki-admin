import { ArticleQuery, ArticleTable } from '@/components/article'
import { Container } from '@/components/common'
import type { ArticleSearchRequest } from '@/services/ant-design-pro/article'
import { useState } from 'react'

const ArticleList = () => {
  const [query, setQuery] = useState<ArticleSearchRequest>({})

  return (
    <Container>
      <ArticleQuery onFinish={(values) => setQuery(values)} />
      <ArticleTable query={query} />
    </Container>
  )
}

export default ArticleList
