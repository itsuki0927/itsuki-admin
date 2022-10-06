import { useEffect } from 'react';
import { Space } from 'antd';
import { Container } from '@/components/common';
import { BlogSummary, SiteSummary } from '@/components/dashboard';
import { useBlogSummary } from '@/hooks/blog';
import { useSummary } from '@/hooks/summary';

const Dashboard = () => {
  const [fetchBlogSummary, { data: blogSummary, loading: blogLoading }] =
    useBlogSummary();
  const [fetchSummary, { data: siteSummary, loading: siteLoading }] = useSummary();

  useEffect(() => {
    fetchBlogSummary();
  }, [fetchBlogSummary]);
  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return (
    <Container loading={blogLoading || siteLoading}>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <SiteSummary summary={siteSummary?.summary} />

        <BlogSummary summary={blogSummary?.blogSummary} />
      </Space>
    </Container>
  );
};

export default Dashboard;
