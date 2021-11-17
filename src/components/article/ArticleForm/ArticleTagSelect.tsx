import { TagSelect } from '@/components/common'
import type { TagSelectProps } from '@/components/common/TagSelect'
import { queryTagList } from '@/services/ant-design-pro/tag'
import { useRequest } from 'umi'

const ArticleTagSelect = (props: Pick<TagSelectProps, 'onChange' | 'value'>) => {
  const { data, loading, refresh } = useRequest(() => queryTagList())
  const tags = data?.map((item) => ({ value: item.id, label: item.name }))

  return <TagSelect tags={tags as any} loading={loading} onRefresh={refresh} {...props} />
}

export default ArticleTagSelect
