import { useMutation } from '@apollo/client';
import { message } from 'antd';
import { BlogForm } from '@/components/blog';
import { Container } from '@/components/common';
import { CREATE_BLOG } from '@/graphql/blog';
import type { Blog } from '@/entities/blog';

const CreateBlog = () => {
  const [createBlog] = useMutation<Blog, any>(CREATE_BLOG);
  return (
    <Container>
      <BlogForm
        onFinish={async input => {
          await createBlog({
            variables: {
              input,
            },
          });
          message.success('发布成功');
          return true;
        }}
      />
    </Container>
  );
};

export default CreateBlog;
