import { ArticleQuery, ArticleTable } from '@/components/article'
import { Container } from '@/components/common'
import type { ArticleSearchRequest } from '@/services/ant-design-pro/article'
import { patchArticle, patchArticleMeta } from '@/services/ant-design-pro/article'
import { message } from 'antd'
import { useState } from 'react'

const ArticleList = () => {
  const [query, setQuery] = useState<ArticleSearchRequest | undefined>()

  return (
    <Container>
      <ArticleQuery onFinish={(values) => setQuery(values)} />
      <ArticleTable
        query={query}
        onPatch={(data) =>
          patchArticle(data).then((res) => {
            message.success('变更成功')
            return res
          })
        }
        onMetaPatch={(id, data) =>
          patchArticleMeta(id, data).then((res) => {
            message.success('变更成功')
            return res
          })
        }
      />
    </Container>
  )
}

export default ArticleList
