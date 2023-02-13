import ProCard from '@ant-design/pro-card';
import { ProFormSelect, ProFormText, QueryFilter } from '@ant-design/pro-form';
import { useEffect } from 'react';
import { blogBanners } from '@/constants/blog/banner';
import { SELECT_ALL_VALUE } from '@/constants/common';
import { publishStates } from '@/constants/publish';
import { useAllTag } from '@/hooks/tag';
import type { SearchBlogInput } from '@/entities/blog';
import { getSelectOptionsByState } from '@/transforms/option';
import compose from '@/utils/compose';

type BlogQueryProps = {
  onFinish: (values: SearchBlogInput) => void;
};

const initialValues: SearchBlogInput = {
  name: '',
  publish: SELECT_ALL_VALUE,
  tagId: SELECT_ALL_VALUE,
  banner: SELECT_ALL_VALUE,
};

const resolve = () => Promise.resolve(true);

const BlogQuery = ({ onFinish }: BlogQueryProps) => {
  const { data: tags, fetchTags } = useAllTag();

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return (
    <ProCard style={{ marginBottom: 24 }}>
      <QueryFilter<SearchBlogInput>
        initialValues={initialValues}
        style={{ marginBottom: -24 }}
        defaultCollapsed={false}
        onFinish={values => compose(resolve, onFinish)(values)}
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
            ...getSelectOptionsByState(blogBanners),
          ]}
        />
        <ProFormSelect
          name='tagId'
          label='标签'
          options={[{ label: '全部标签', value: SELECT_ALL_VALUE }].concat(
            tags?.tags.data.map(item => ({ label: item.name, value: item.id })) ?? []
          )}
        />
      </QueryFilter>
    </ProCard>
  );
};

export default BlogQuery;
