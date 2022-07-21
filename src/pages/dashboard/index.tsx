import { Space } from 'antd';
import { Container } from '../../components/common';
import { ArticleSummary, SiteSummary } from '../../components/dashboard';
import { queryArticleSummary } from '@/services/ant-design-pro/article';
import { querySiteSummary } from '@/services/ant-design-pro/siteinfo';

const Dashboard = () => {
  const { data: articleSummary, loading } = useRequest(() =>
    queryArticleSummary().then(data => ({ data }))
  );
  const { data: siteSummary, loading: siteLoading } = useRequest(() =>
    querySiteSummary().then(data => ({ data }))
  );

  return (
    <Container loading={loading || siteLoading}>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <SiteSummary summary={siteSummary} />

        <ArticleSummary summary={articleSummary} />
      </Space>
    </Container>
  );
};

export default Dashboard;
