import { ArticleComment, ArticleForm } from '@/components/article'
import { Container } from '@/components/common'
import { getUEditorCache } from '@/components/common/UniversalEditor'
import type { SearchResponse } from '@/helper/http.interface'
import type { ArticleActionRequest, ArticleDetailResponse } from '@/services/ant-design-pro/article'
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
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Badge, Button, message, Modal, Space } from 'antd'
import { useState } from 'react'
import { history, useParams } from 'umi'

const handleDiffContent =
  (articleCacheID: string) =>
  (result: ArticleDetailResponse): Promise<ArticleDetailResponse> => {
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
            resolve(mutateData)
          },
          onCancel() {
            resolve(result)
          },
        })
      } else {
        resolve(result)
      }
    })
  }

const QUERY_COMMENT = gql`
  query findComments($input: CommentSearchRequest!) {
    comments(input: $input) {
      total
      data {
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

const DETELTE_ARTICLE = gql`
  mutation deleteArticle($id: ID!) {
    deleteArticle(id: $id)
  }
`

type ID = {
  id: number
}

type UpdateArticleInput = {
  input: ArticleActionRequest
} & ID

type QueryArticleResponse = {
  article: ArticleDetailResponse
}

const EditArticle = () => {
  const articleCacheID = window.location.pathname
  const diffContent = handleDiffContent(articleCacheID)
  const { id } = useParams<{ id: string }>()
  const articleId = +id
  const [commentVisible, setCommentVisible] = useState(false)
  const [article, setArticle] = useState<ArticleDetailResponse | undefined>()
  const [updateArticle] = useMutation<void, UpdateArticleInput>(UPDATE_ARTICLE)
  const [deleteArticle] = useMutation<number, ID>(DETELTE_ARTICLE)
  const { data, loading, updateQuery } = useQuery<QueryArticleResponse, ID>(QUERY_ARTICLE, {
    variables: {
      id: +id,
    },
    onCompleted: ({ article: articleProp }) => {
      diffContent(articleProp).then((result) => {
        setArticle({
          ...result,
          categoryId: Number(result.categoryId),
          keywords: result.keywords.split('、') as any,
          tagIds: result.tags.map((v) => v.id),
        })
      })
    },
  })
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
          你确定要删除文章: <strong style={{ color: '#ff4d4f' }}>《{data?.article.title}》</strong>
          嘛?
        </p>
      ),
      content: '此操作不能撤销!!!',
      okType: 'danger',
      onOk() {
        deleteArticle({
          variables: {
            articleId,
          },
        }).then(() => {
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
