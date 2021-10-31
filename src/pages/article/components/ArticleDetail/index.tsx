import type { ArticleActionRequest } from '@/services/ant-design-pro/article'
import type { API } from '@/services/ant-design-pro/typings'
import ProCard from '@ant-design/pro-card'
import ProForm from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import Category from './Category'
import Cover from './Cover'
import Main from './Main'
import Options from './Options'

type ArticleDetailProps = {
  onFinish: (values: ArticleActionRequest) => Promise<boolean>
  initialValues?: API.Article
}

const ArticleDetail = ({ onFinish, initialValues }: ArticleDetailProps) => {
  return (
    <ProForm<ArticleActionRequest>
      onFinish={onFinish}
      style={{ overflow: 'hidden' }}
      initialValues={initialValues}
      submitter={{
        submitButtonProps: {
          style: { width: 150 },
        },
        render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
      }}
    >
      <ProCard colSpan={{ md: 17 }} ghost gutter={36}>
        <ProCard title='基本信息' headerBordered>
          <Main />
        </ProCard>

        <ProCard colSpan={{ md: 7 }} ghost direction='column' gutter={24}>
          <Category />
          <Cover />
          <Options />
        </ProCard>
      </ProCard>
    </ProForm>
  )
}

export default ArticleDetail
