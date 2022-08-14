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
import { ArticleComment, ArticleForm } from '@/components/article';
import { Container } from '@/components/common';
import { MAX_PAGE_SIZE } from '@/constants/common';
import { useArticle, useDeleteArticle, useUpdateArticle } from '@/hooks/article';
import { useComments } from '@/hooks/comment';
import { convertToCommentTreeData } from '@/transforms/tree';
import { getBlogArticleUrl } from '@/transforms/url';

const EditArticle = () => {
  const { path } = useParams<{ path: string }>();
  const history = useNavigate();
  const { article, loading, updateQuery, cacheID, fetchArticle } = useArticle();
  const [commentVisible, setCommentVisible] = useState(false);
  const [updateArticle] = useUpdateArticle();
  const [deleteArticle] = useDeleteArticle();

  const [fetchComments, { data: comments, loading: commentLoading }] = useComments();

  const loadComments = () => {
    if (article?.id) {
      fetchComments({
        variables: {
          search: {
            articleId: article.id,
            pageSize: MAX_PAGE_SIZE,
          },
        },
      });
    }
  };

  useEffect(() => {
    const fetchArticleIfPath = async () => {
      if (path) {
        await fetchArticle({
          variables: {
            path,
          },
        });
      }
    };
    fetchArticleIfPath();
  }, [fetchArticle, path]);

  const handleRemove = () => {
    Modal.confirm({
      title: (
        <p>
          你确定要删除文章:{' '}
          <strong style={{ color: '#ff4d4f' }}>《{article?.title}》</strong>
          嘛?
        </p>
      ),
      content: '此操作不能撤销!!!',
      okType: 'danger',
      onOk() {
        if (article?.id) {
          deleteArticle({
            variables: {
              id: article.id,
            },
          }).then(() => {
            message.success('删除成功');
            history('/article/list', { replace: true });
          });
        }
      },
    });
  };

  if (loading || !article) {
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
          <Badge key='comments' count={article.commenting}>
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
              {article.liking}喜欢
            </Button>
            <Button size='small' disabled icon={<EyeOutlined />}>
              {article.reading}阅读
            </Button>
            <Button
              size='small'
              target='_blank'
              icon={<RocketOutlined />}
              href={getBlogArticleUrl(article.path)}
            />
          </Button.Group>
        </Space>
      }
    >
      <ArticleForm
        cacheID={cacheID}
        request={() => Promise.resolve(article)}
        onFinish={async values => {
          await updateArticle({
            variables: {
              id: article.id,
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
      <ArticleComment
        onRefresh={loadComments}
        loading={commentLoading}
        count={article?.commenting}
        comments={convertToCommentTreeData(comments?.comments.data ?? [])}
        visible={commentVisible}
        onClose={() => setCommentVisible(false)}
      />
    </Container>
  );
};

export default EditArticle;
