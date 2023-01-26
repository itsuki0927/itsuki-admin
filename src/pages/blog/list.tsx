import { useState } from 'react';
import { BlogQuery, BlogTable } from '@/components/blog';
import { Container } from '@/components/common';
import type { SearchBlogInput } from '@/entities/blog';

const BlogList = () => {
  const [query, setQuery] = useState<SearchBlogInput>({});

  return (
    <Container>
      <BlogQuery onFinish={values => setQuery(values)} />
      <BlogTable query={query} />
    </Container>
  );
};

export default BlogList;
