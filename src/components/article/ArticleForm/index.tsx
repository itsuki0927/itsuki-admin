import type { ArticleActionRequest, ArticleDetailResponse } from '@/services/ant-design-pro/article'
import ProCard from '@ant-design/pro-card'
import ProForm from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Space } from 'antd'
import ArticleBasic from './ArticleBasic'
import ArticleContent from './ArticleContent'
import ArticleCover from './ArticleCover'
import ArticleOptions from './ArticleOptions'

type ArticleFormProps = {
  onFinish: (values: ArticleActionRequest) => Promise<boolean>
  request?: () => Promise<ArticleDetailResponse>
  cacheID?: string
}

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
      <Space size={24} direction='vertical' style={{ width: '100%' }}>
        <ProCard title='基本信息'>
          <ArticleBasic />
          <ArticleCover />
        </ProCard>

        <ArticleOptions />

        <ProCard title='文章内容'>
          <ArticleContent cacheID={cacheID} />
        </ProCard>
      </Space>
    </ProForm>
  )
}

export default ArticleForm
