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
      initialValues={initialValues}
      submitter={{
        submitButtonProps: {
          style: { width: 150 },
        },
        render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
      }}
    >
      <ProCard ghost gutter={8}>
        <ProCard title='基本信息' headerBordered>
          <Main />
        </ProCard>

        <ProCard colSpan='30%' ghost direction='column' gutter={16}>
          <ProCard ghost style={{ marginBottom: -12 }}>
            <Category />
          </ProCard>
          <ProCard ghost style={{ marginBottom: 12 }}>
            <Cover />
          </ProCard>
          <ProCard ghost>
            <Options />
          </ProCard>
        </ProCard>
      </ProCard>
    </ProForm>
  )
}

export default ArticleDetail
