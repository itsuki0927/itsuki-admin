import { useEffect } from 'react';
import { TagSelect } from '@/components/common';
import type { TagItem, TagSelectProps } from '@/components/common/TagSelect';
import { useAllTag } from '@/hooks/tag';

const ArticleTagSelect = (props: Pick<TagSelectProps, 'onChange' | 'value'>) => {
  const { fetchTags, data, loading, refetch } = useAllTag();

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const tags = data?.tags.data.map(item => ({ value: item.id, label: item.name }));

  return (
    <TagSelect
      tags={tags as TagItem[]}
      loading={loading}
      onRefresh={refetch}
      {...props}
    />
  );
};

export default ArticleTagSelect;
