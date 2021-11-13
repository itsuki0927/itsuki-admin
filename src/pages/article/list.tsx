import { ArticleQuery, ArticleTable } from '@/components/article'
import type { ArticleSearchRequest } from '@/services/ant-design-pro/article'
import { patchArticle, patchArticleMeta } from '@/services/ant-design-pro/article'
import { PageContainer } from '@ant-design/pro-layout'
import { message } from 'antd'
import { useState } from 'react'

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
        onMetaPatch={(id, data) =>
          patchArticleMeta(id, data).then((res) => {
            message.success('变更成功')
            return res
          })
        }
      />
    </PageContainer>
  )
}

export default ArticleList
