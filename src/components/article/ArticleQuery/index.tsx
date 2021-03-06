import { articleBanners } from '@/constants/article/banner'
import { SELECT_ALL_VALUE } from '@/constants/common'
import { publishStates } from '@/constants/publish'
import { useAllTag } from '@/hooks/tag'
import type { ArticleSearchRequest } from '@/services/ant-design-pro/article'
import { getSelectOptionsByState } from '@/transforms/option'
import compose from '@/utils/compose'
import ProCard from '@ant-design/pro-card'
import { ProFormSelect, ProFormText, QueryFilter } from '@ant-design/pro-form'

type ArticleQueryProps = {
  onFinish: (values: ArticleSearchRequest) => void
}

const initialValues: ArticleSearchRequest = {
  name: '',
  publish: SELECT_ALL_VALUE,
  tagId: SELECT_ALL_VALUE,
  banner: SELECT_ALL_VALUE,
}

const resolve = () => Promise.resolve(true)

const ArticleQuery = ({ onFinish }: ArticleQueryProps) => {
  const { data: tags } = useAllTag()
  console.log('tags', tags)

  return (
    <ProCard style={{ marginBottom: 24 }}>
      <QueryFilter<ArticleSearchRequest>
        initialValues={initialValues}
        style={{ marginBottom: -24 }}
        defaultCollapsed={false}
        onFinish={(values) => {
          return compose(resolve, onFinish)(values)
        }}
        onReset={() => onFinish(initialValues)}
      >
        <ProFormText name='name' label='关键字' />
        <ProFormSelect
          name='publish'
          label='发布状态'
          options={[
            {
              label: '全部状态',
              value: SELECT_ALL_VALUE,
            },
            ...getSelectOptionsByState(publishStates),
          ]}
        />
        <ProFormSelect
          name='banner'
          label='轮播状态'
          options={[
            { label: '全部来源', value: SELECT_ALL_VALUE },
            ...getSelectOptionsByState(articleBanners),
          ]}
        />
        <ProFormSelect
          name='tagId'
          label='标签'
          options={[{ label: '全部标签', value: SELECT_ALL_VALUE }].concat(
            tags?.tags.data.map((item) => ({ label: item.name, value: item.id })) ?? []
          )}
        />
      </QueryFilter>
    </ProCard>
  )
}

export default ArticleQuery
