import type { ArticleActionRequest, ArticleDetailResponse } from '@/services/ant-design-pro/article'
import ProCard from '@ant-design/pro-card'
import ProForm from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import type { CSSProperties } from 'react'
import ArticleBasic from './ArticleBasic'
import ArticleCategorySelect from './ArticleCategorySelect'
import ArticleContent from './ArticleContent'
import ArticleCover from './ArticleCover'
import ArticleOptions from './ArticleOptions'

type ArticleFormProps = {
  onFinish: (values: ArticleActionRequest) => Promise<boolean>
  request?: () => Promise<ArticleDetailResponse>
  cacheID?: string
}

const style: CSSProperties = { marginBottom: 24 }

const ArticleForm = ({ onFinish, request, cacheID }: ArticleFormProps) => {
  return (
    <ProForm
      onFinish={onFinish}
      request={request}
      style={{
        width: 850,
        margin: '0 auto',
      }}
      submitter={{
        submitButtonProps: {
          style: { width: 150 },
        },
        render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
      }}
    >
      <ProCard title='基本信息' style={style}>
        <ArticleBasic />
        <ArticleCategorySelect />
        <ArticleCover />
      </ProCard>

      <ProCard title='其他设置' style={style}>
        <ArticleOptions />
      </ProCard>

      <ProCard title='文章内容' style={style}>
        <ArticleContent cacheID={cacheID} />
      </ProCard>
    </ProForm>
  )
}

export default ArticleForm
