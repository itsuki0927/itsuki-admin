import { TagSelect } from '@/components/common'
import { queryTagList } from '@/services/ant-design-pro/tag'
import { useRequest } from 'umi'

interface ArticleTagSelectProps {
  value?: number[]
  onChange?: (value: number[]) => void
}

const ArticleTagSelect = (props: ArticleTagSelectProps) => {
  const { data, loading, refresh } = useRequest(() => queryTagList())
  const tags = data?.map((item) => ({ value: item.id, label: item.name }))

  return <TagSelect tags={tags as any} loading={loading} onRefresh={refresh} {...props} />
}

export default ArticleTagSelect
