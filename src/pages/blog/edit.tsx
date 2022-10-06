import { Badge, Button, message, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CommentOutlined,
  DeleteOutlined,
  EyeOutlined,
  LikeOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import { BlogComment, BlogForm } from '@/components/blog';
import { Container } from '@/components/common';
import { MAX_PAGE_SIZE } from '@/constants/common';
import { useBlog, useDeleteBlog, useUpdateBlog } from '@/hooks/blog';
import { useComments } from '@/hooks/comment';
import { convertToCommentTreeData } from '@/transforms/tree';
import { getBlogBlogUrl } from '@/transforms/url';

const EditBlog = () => {
  const { path } = useParams<{ path: string }>();
  const history = useNavigate();
  const { blog, loading, updateQuery, cacheID, fetchBlog } = useBlog();
  const [commentVisible, setCommentVisible] = useState(false);
  const [updateBlog] = useUpdateBlog();
  const [deleteBlog] = useDeleteBlog();

  const [fetchComments, { data: comments, loading: commentLoading }] = useComments();

  const loadComments = () => {
    if (blog?.id) {
      fetchComments({
        variables: {
          search: {
            blogId: blog.id,
            pageSize: MAX_PAGE_SIZE,
          },
        },
      });
    }
  };

  useEffect(() => {
    const fetchBlogIfPath = async () => {
      if (path) {
        await fetchBlog({
          variables: {
            path,
          },
        });
      }
    };
    fetchBlogIfPath();
  }, [fetchBlog, path]);

  const handleRemove = () => {
    Modal.confirm({
      title: (
        <p>
          你确定要删除文章:{' '}
          <strong style={{ color: '#ff4d4f' }}>《{blog?.title}》</strong>
          嘛?
        </p>
      ),
      content: '此操作不能撤销!!!',
      okType: 'danger',
      onOk() {
        if (blog?.id) {
          deleteBlog({
            variables: {
              id: blog.id,
            },
          }).then(() => {
            message.success('删除成功');
            history('/blog/list', { replace: true });
          });
        }
      },
    });
  };

  if (loading || !blog) {
    return <Container loading />;
  }

  return (
    <Container
      extra={
        <Space>
          <Button
            key='delete'
            danger
            type='dashed'
            size='small'
            onClick={handleRemove}
            icon={<DeleteOutlined />}
          >
            删除文章
          </Button>
          <Badge key='comments' count={blog.commenting}>
            <Button
              size='small'
              icon={<CommentOutlined />}
              onClick={() => {
                loadComments();
                setCommentVisible(true);
              }}
            >
              文章评论
            </Button>
          </Badge>
          <Button.Group key='meta'>
            <Button size='small' disabled icon={<LikeOutlined />}>
              {blog.liking}喜欢
            </Button>
            <Button size='small' disabled icon={<EyeOutlined />}>
              {blog.reading}阅读
            </Button>
            <Button
              size='small'
              target='_blank'
              icon={<RocketOutlined />}
              href={getBlogBlogUrl(blog.path)}
            />
          </Button.Group>
        </Space>
      }
    >
      <BlogForm
        cacheID={cacheID}
        request={() => Promise.resolve(blog)}
        onFinish={async values => {
          await updateBlog({
            variables: {
              id: blog.id,
              input: values,
            },
          });
          message.success('更新成功');
          updateQuery(prevData => ({
            ...prevData,
            ...values,
          }));
          return true;
        }}
      />
      <BlogComment
        onRefresh={loadComments}
        loading={commentLoading}
        count={blog?.commenting}
        comments={convertToCommentTreeData(comments?.comments.data ?? [])}
        visible={commentVisible}
        onClose={() => setCommentVisible(false)}
      />
    </Container>
  );
};

export default EditBlog;
