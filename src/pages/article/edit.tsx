import {
  deleteArticle,
  queryArticleById,
  queryArticleCommentList,
  updateArticle,
} from '@/services/ant-design-pro/article'
import { convertToCommentTreeData } from '@/transforms/tree'
import { getBlogArticleUrl } from '@/transforms/url'
import {
  CommentOutlined,
  DeleteOutlined,
  EyeOutlined,
  LikeOutlined,
  RocketOutlined,
} from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout'
import { Badge, Button, message, Modal, Space } from 'antd'
import { useState } from 'react'
import { history, useParams, useRequest } from 'umi'
import ArticleDetail from './components/ArticleDetail'
import ArticleComment from './components/Comment'

const EditArticle = () => {
  const { id } = useParams<{ id: string }>()
  const articleCacheID = window.location.pathname
  const [commentVisible, setCommentVisible] = useState(false)

  const {
    loading: commentLoading,
    data: comments,
    refresh: refreshComments,
  } = useRequest(() =>
    queryArticleCommentList(id).then((data) => {
      const treeData = convertToCommentTreeData(data)
      return { data: treeData }
    })
  )

  const { loading, data } = useRequest(() =>
    queryArticleById(+id).then((result) => {
      result.keywords = result.keywords?.split('、') as any
      result.tagIds = result.tags?.map((v) => v.id)
      result.categoryIds = result.categories?.map((v) => v.id)
      return { data: result }
    })
  )

  const handleRemove = () => {
    Modal.confirm({
      title: `你确定要删除《${data?.title}》嘛?`,
      content: '此操作不能撤销!!!',
      onOk() {
        deleteArticle(+id).then(() => {
          message.success('删除成功')
          history.replace('/article/list')
        })
      },
    })
  }

  return (
    <PageContainer
      loading={loading}
      extra={
        <Space>
          <Button
            danger
            type='dashed'
            size='small'
            onClick={handleRemove}
            icon={<DeleteOutlined />}
          >
            删除文章
          </Button>
          <Badge count={data?.commenting}>
            <Button size='small' icon={<CommentOutlined />} onClick={() => setCommentVisible(true)}>
              文章评论
            </Button>
          </Badge>
          <Button.Group>
            <Button size='small' disabled icon={<LikeOutlined />}>
              {data?.liking}喜欢
            </Button>
            <Button size='small' disabled icon={<EyeOutlined />}>
              {data?.reading}阅读
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
      {data ? (
        <ArticleDetail
          cacheID={articleCacheID}
          request={() => Promise.resolve(data)}
          onFinish={(values) => {
            return updateArticle(data?.id!, values).then(() => {
              message.success('更新成功')
              return true
            })
          }}
        />
      ) : null}

      <ArticleComment
        onRefresh={() => refreshComments()}
        loading={commentLoading}
        count={comments?.length}
        comments={comments}
        visible={commentVisible}
        onClose={() => setCommentVisible(false)}
      />
    </PageContainer>
  )
}

export default EditArticle
