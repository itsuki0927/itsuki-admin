import { ArticleComment, ArticleForm } from '@/components/article'
import { Container } from '@/components/common'
import { getUEditorCache } from '@/components/common/UniversalEditor'
import type { ArticleActionRequest, ArticleDetailResponse } from '@/services/ant-design-pro/article'
import { deleteArticle } from '@/services/ant-design-pro/article'
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
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Badge, Button, message, Modal, Space } from 'antd'
import { useEffect, useState } from 'react'
import { history, useParams } from 'umi'

const handleDiffContent =
  (articleCacheID: string) =>
  (result: ArticleDetailResponse): Promise<{ data: ArticleDetailResponse }> => {
    return new Promise((resolve) => {
      const localeContent = getUEditorCache(articleCacheID)
      if (result && !!localeContent && localeContent !== result.content) {
        Modal.confirm({
          title: '本地缓存存在未保存的文章，是否要覆盖远程数据？',
          content: '如果覆盖错了，就自己刷新吧！',
          okText: '本地覆盖远程',
          cancelText: '使用远程数据',
          centered: true,
          okButtonProps: {
            danger: true,
          },
          onOk() {
            const mutateData = {
              ...result,
              content: localeContent,
            }
            resolve({ data: mutateData })
          },
          onCancel() {
            resolve({ data: result })
          },
        })
      } else {
        resolve({ data: result })
      }
    })
  }

const QUERY_COMMENT = gql`
  query findComments($articleId: ID!) {
    comments(articleId: $articleId) {
      id
      nickname
      email
      website
      content
      liking
      ip
      agent
      city
      province
      status
      fix
      expand
      articleTitle
      articleDescription
      parentNickName
      parentId
      articleId
    }
  }
`

const UPDATE_ARTICLE = gql`
  mutation updateArticle($id: ID!, $input: CreateArticleInput!) {
    updateArticle(id: $id, input: $input) {
      id
    }
  }
`

const QUERY_ARTICLE = gql`
  query findArticle($id: ID!) {
    article(id: $id) {
      id
      title
      description
      content
      author
      cover
      keywords
      open
      publish
      origin
      banner
      reading
      liking
      commenting
      categoryId
      path
      tags {
        name
        id
      }
      category {
        name
        path
        id
      }
    }
  }
`

const EditArticle = () => {
  const articleCacheID = window.location.pathname
  const diffContent = handleDiffContent(articleCacheID)
  const { id } = useParams<{ id: string }>()
  const [commentVisible, setCommentVisible] = useState(false)
  const [article, setArticle] = useState<ArticleDetailResponse | undefined>()
  const [updateArticle] = useMutation<API.Article, { id: number; input: ArticleActionRequest }>(
    UPDATE_ARTICLE
  )
  const { data, loading, updateQuery } = useQuery<{ article: ArticleDetailResponse }>(
    QUERY_ARTICLE,
    {
      variables: {
        id: +id,
      },
      onCompleted: ({ article: articleProp }) => {
        diffContent(articleProp)
      },
    }
  )
  const [fetchComments, { data: comments, loading: commentLoading }] = useLazyQuery<
    {
      comments: API.Comment[]
    },
    { articleId: number }
  >(QUERY_COMMENT)

  useEffect(() => {
    if (data) {
      setArticle({
        ...data.article,
        categoryId: Number(data.article.categoryId),
        keywords: data.article.keywords.split('、') as any,
        tagIds: data.article.tags.map((v) => v.id),
      })
    }
  }, [data])

  const handleRemove = () => {
    Modal.confirm({
      title: `你确定要删除《${data?.article.title}》嘛?`,
      content: '此操作不能撤销!!!',
      onOk() {
        deleteArticle(+id).then(() => {
          message.success('删除成功')
          history.replace('/article/list')
        })
      },
    })
  }

  if (!data || loading || !article) {
    return <Container loading={!data || loading} />
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
          <Badge key='comments' count={data?.article.commenting}>
            <Button
              size='small'
              icon={<CommentOutlined />}
              onClick={() => {
                fetchComments({
                  variables: {
                    articleId: +id,
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
              {data?.article.liking}喜欢
            </Button>
            <Button size='small' disabled icon={<EyeOutlined />}>
              {data?.article.reading}阅读
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
        cacheID={articleCacheID}
        request={() => Promise.resolve(article)}
        onFinish={(values) => {
          return updateArticle({
            variables: {
              id: data.article.id,
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
              articleId: +id,
            },
          })
        }
        loading={commentLoading}
        count={comments?.comments.length}
        comments={convertToCommentTreeData(comments?.comments ?? [])}
        visible={commentVisible}
        onClose={() => setCommentVisible(false)}
      />
    </Container>
  )
}

export default EditArticle
