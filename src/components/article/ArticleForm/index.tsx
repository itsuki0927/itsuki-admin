import type { ArticleActionRequest, ArticleDetailResponse } from '@/services/ant-design-pro/article'
import ProCard from '@ant-design/pro-card'
import type { ProFormInstance } from '@ant-design/pro-form'
import ProForm from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { useRef } from 'react'
import ArticleCategorySelect from './ArticleCategorySelect'
import ArticleCover from './ArticleCover'
import ArticleContent from './ArticleContent'
import ArticleOptions from './ArticleOptions'

type ArticleFormProps = {
  onFinish: (values: ArticleActionRequest) => Promise<boolean>
  request?: () => Promise<ArticleDetailResponse>
  cacheID?: string
}

const ArticleForm = ({ onFinish, request, cacheID }: ArticleFormProps) => {
  const formRef = useRef<ProFormInstance>()

  return (
    <ProForm<ArticleActionRequest>
      request={request}
      formRef={formRef}
      onFinish={onFinish}
      style={{ overflow: 'hidden' }}
      submitter={{
        submitButtonProps: {
          style: { width: 150 },
        },
        render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
      }}
    >
      <ProCard colSpan={{ md: 17 }} ghost gutter={24}>
        <ProCard title='基本信息' headerBordered>
          <ArticleContent cacheID={cacheID} />
        </ProCard>

        <ProCard colSpan={{ md: 7 }} ghost>
          <ArticleCategorySelect />
          <ArticleCover />
          <ArticleOptions />
        </ProCard>
      </ProCard>
    </ProForm>
  )
}

export default ArticleForm
