import { StatisticCard } from '@ant-design/pro-card';
import type { BlogSummaryResponse } from '@/entities/blog';

interface BlogSummaryProps {
  summary?: BlogSummaryResponse;
}

const keys = ['total', 'draft', 'recycle', 'published'] as const;

const BlogSummary = ({ summary }: BlogSummaryProps) => {
  if (!summary) {
    return <StatisticCard.Group loading />;
  }
  return (
    <StatisticCard.Group direction='row'>
      {keys.map(key => (
        <StatisticCard key={key} statistic={summary[key] as any} />
      ))}
    </StatisticCard.Group>
  );
};

export default BlogSummary;
