import { CategorySelect } from '@/components/common'
import { QUERY_CATEGORY } from '@/graphql/category'
import type { QueryCategoryResponse } from '@/graphql/category'
import { useQuery } from '@apollo/client'
import { Form } from 'antd'

const ArticleCategorySelect = () => {
  const { data, loading, refetch } = useQuery<QueryCategoryResponse>(QUERY_CATEGORY)

  return (
    <Form.Item
      name='categoryId'
      rules={[
        {
          message: '请选择选择一个分类',
          required: true,
        },
      ]}
    >
      <CategorySelect data={data?.categories} loading={loading} onRefresh={() => refetch()} />
    </Form.Item>
  )
}

export default ArticleCategorySelect
