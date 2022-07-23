import { useEffect } from 'react';
import { Space } from 'antd';
import { Container } from '@/components/common';
import { ArticleSummary, SiteSummary } from '@/components/dashboard';
import { useArticleSummary } from '@/hooks/article';
import { useSummary } from '@/hooks/summary';

const Dashboard = () => {
  const [fetchArticleSummary, { data: articleSummary, loading: articleLoading }] =
    useArticleSummary();
  const [fetchSummary, { data: siteSummary, loading: siteLoading }] = useSummary();

  useEffect(() => {
    fetchArticleSummary();
  }, [fetchArticleSummary]);
  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return (
    <Container loading={articleLoading || siteLoading}>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <SiteSummary summary={siteSummary?.summary} />

        <ArticleSummary summary={articleSummary?.articleSummary} />
      </Space>
    </Container>
  );
};

export default Dashboard;
