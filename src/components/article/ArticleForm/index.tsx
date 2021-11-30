import type { ArticleActionRequest, ArticleDetailResponse } from '@/services/ant-design-pro/article'
import ProCard from '@ant-design/pro-card'
import type { ProFormInstance } from '@ant-design/pro-form'
import { StepsForm } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { useRef } from 'react'
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

const ArticleForm = ({ onFinish, request, cacheID }: ArticleFormProps) => {
  const formRef = useRef<ProFormInstance>()

  return (
    <StepsForm
      formRef={formRef}
      onFinish={onFinish}
      formProps={{
        request,
      }}
      containerStyle={{ width: '100%' }}
      submitter={{
        submitButtonProps: {
          style: { width: 150 },
        },
        render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
      }}
    >
      <StepsForm.StepForm title='基本信息'>
        <ArticleBasic />
      </StepsForm.StepForm>

      <StepsForm.StepForm title='文章内容'>
        <ArticleContent cacheID={cacheID} />
      </StepsForm.StepForm>

      <StepsForm.StepForm title='其他设置'>
        <ProCard ghost gutter={24}>
          <ProCard colSpan={12} ghost>
            <ArticleCategorySelect />
            <ArticleCover />
          </ProCard>
          <ProCard colSpan={12} ghost>
            <ArticleOptions />
          </ProCard>
        </ProCard>
      </StepsForm.StepForm>
    </StepsForm>
  )
}

export default ArticleForm
