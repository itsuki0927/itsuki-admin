import type { API } from '@/services/ant-design-pro/typings'
import ProCard from '@ant-design/pro-card'
import ProForm from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import Category from './Category'
import Cover from './Cover'
import Options from './Options'
import Main from './Main'

type ArticleDetailProps = {
  onFinish: (values: API.Article) => Promise<boolean>
}

const ArticleDetail = ({ onFinish }: ArticleDetailProps) => {
  return (
    <PageContainer>
      <ProForm<API.Article>
        onFinish={onFinish}
        initialValues={{ status: 1 }}
        submitter={{
          submitButtonProps: {
            style: { width: 150 },
          },
          render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
        }}
      >
        <ProCard ghost gutter={8}>
          <ProCard ghost>
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
    </PageContainer>
  )
}

export default ArticleDetail
