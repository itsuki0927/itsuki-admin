import type { ArticleSummaryResponse } from '@/entities/article'
import { StatisticCard } from '@ant-design/pro-card'

interface ArticleSummaryProps {
  summary?: ArticleSummaryResponse
}

const keys = ['total', 'draft', 'recycle', 'published'] as const

const ArticleSummary = ({ summary }: ArticleSummaryProps) => {
  if (!summary) {
    return <StatisticCard.Group loading />
  }
  return (
    <StatisticCard.Group direction='row'>
      {keys.map((key) => (
        <StatisticCard key={key} statistic={summary[key] as any} />
      ))}
    </StatisticCard.Group>
  )
}

export default ArticleSummary
