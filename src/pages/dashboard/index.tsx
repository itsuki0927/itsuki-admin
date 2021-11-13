import { ArticleSummary, SiteSummary } from '@/components/dashboard'
import { queryArticleSummary } from '@/services/ant-design-pro/article'
import { querySiteSummary } from '@/services/ant-design-pro/siteinfo'
import { PageContainer } from '@ant-design/pro-layout'
import { Space } from 'antd'
import { useRequest } from 'umi'

const Dashboard = () => {
  const { data: articleSummary, loading } = useRequest(() =>
    queryArticleSummary().then((data) => ({ data }))
  )
  const { data: siteSummary, loading: siteLoading } = useRequest(() =>
    querySiteSummary().then((data) => ({ data }))
  )

  return (
    <PageContainer loading={loading || siteLoading}>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <SiteSummary summary={siteSummary} />

        <ArticleSummary summary={articleSummary} />
      </Space>
    </PageContainer>
  )
}

export default Dashboard
