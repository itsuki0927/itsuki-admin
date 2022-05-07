import { ArticleComment, ArticleForm } from '@/components/article'
import { Container } from '@/components/common'
import { QUERY_COMMENT } from '@/graphql/comment'
import type { SearchResponse } from '@/helper/http.interface'
import { useArticle, useDeleteArticle, useUpdateArticle } from '@/hooks/article'
import type { CommentSearchRequest } from '@/services/ant-design-pro/comment'
import type { API } from '@/services/ant-design-pro/typings'
import { convertToCommentTreeData } from '@/transforms/tree'
import { getBlogArticleUrl } from '@/transforms/url'
import {
  CommentOutlined,
  DeleteOutlined,
  EyeOutlined,
  LikeOutlined,
  RocketOutlined,
} from '@ant-design/icons'
import { useLazyQuery } from '@apollo/client'
import { Badge, Button, message, Modal, Space } from 'antd'
import { useState } from 'react'
import { history, useParams } from 'umi'

const EditArticle = () => {
  const { id } = useParams<{ id: string }>()
  const articleId = +id
  const { article, loading, updateQuery, cacheID } = useArticle(articleId)
  const [commentVisible, setCommentVisible] = useState(false)
  const [updateArticle] = useUpdateArticle()
  const [deleteArticle] = useDeleteArticle()

  const [fetchComments, { data: comments, loading: commentLoading }] = useLazyQuery<
    {
      comments: SearchResponse<API.Comment>
    },
    { input: CommentSearchRequest }
  >(QUERY_COMMENT)

  const handleRemove = () => {
    Modal.confirm({
      title: (
        <p>
          你确定要删除文章: <strong style={{ color: '#ff4d4f' }}>《{article?.title}》</strong>
          嘛?
        </p>
      ),
      content: '此操作不能撤销!!!',
      okType: 'danger',
      onOk() {
        deleteArticle({
          variables: {
            id: articleId,
          },
        }).then(() => {
          message.success('删除成功')
          history.replace('/article/list')
        })
      },
    })
  }

  if (loading || !article) {
    return <Container loading />
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
                fetchComments({
                  variables: {
                    input: {
                      articleId,
                    },
                  },
                })
                setCommentVisible(true)
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
              href={getBlogArticleUrl(id)}
            />
          </Button.Group>
        </Space>
      }
    >
      <ArticleForm
        cacheID={cacheID}
        request={() => Promise.resolve(article)}
        onFinish={(values) => {
          return updateArticle({
            variables: {
              id: article.id,
              input: values,
            },
          }).then(() => {
            message.success('更新成功')
            updateQuery((prevData) => ({
              ...prevData,
              ...values,
            }))
            return true
          })
        }}
      />
      <ArticleComment
        onRefresh={() =>
          fetchComments({
            variables: {
              input: {
                articleId,
              },
            },
          })
        }
        loading={commentLoading}
        count={article?.commenting}
        comments={convertToCommentTreeData(comments?.comments.data ?? [])}
        visible={commentVisible}
        onClose={() => setCommentVisible(false)}
      />
    </Container>
  )
}

export default EditArticle
