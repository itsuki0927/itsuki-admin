import { CategorySelect } from '@/components/common'
import type { CategorySelectProps } from '@/components/common/CategorySelect'
import { querySnippetCategoryList } from '@/services/ant-design-pro/snippetCategory'
import { useRequest } from 'umi'

const SnippetTagSelect = (props: Pick<CategorySelectProps, 'value' | 'onChange'>) => {
  const { data, loading, refresh } = useRequest(() => querySnippetCategoryList())

  return (
    <CategorySelect
      data={data}
      loading={loading}
      onRefresh={refresh}
      {...props}
      treeProps={{
        checkStrictly: false,
      }}
    />
  )
}

export default SnippetTagSelect
