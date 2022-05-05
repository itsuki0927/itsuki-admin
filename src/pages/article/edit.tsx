import { ArticleComment, ArticleForm } from '@/components/article'
import { Container } from '@/components/common'
import { getUEditorCache } from '@/components/common/UniversalEditor'
import type { ArticleDetailResponse } from '@/services/ant-design-pro/article'
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
import { Badge, Button, message, Modal, Space } from 'antd'
import { useState } from 'react'
import { history, useParams, useRequest } from 'umi'

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

const EditArticle = () => {
  const { id } = useParams<{ id: string }>()
  const articleCacheID = window.location.pathname
  const [commentVisible, setCommentVisible] = useState(false)
  const diffContent = handleDiffContent(articleCacheID)

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

  const { loading, data, refresh } = useRequest<{ data: ArticleDetailResponse }>(() =>
    queryArticleById(+id)
      .then((result) => {
        result.keywords = result.keywords?.split('、') as any
        result.tagIds = result.tags?.map((v) => v.id)
        result.categoryId = result.category.id
        return result
      })
      .then(diffContent)
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

  if (!data || loading) {
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
          <Badge key='comments' count={data?.commenting}>
            <Button size='small' icon={<CommentOutlined />} onClick={() => setCommentVisible(true)}>
              文章评论
            </Button>
          </Badge>
          <Button.Group key='meta'>
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
      <ArticleForm
        cacheID={articleCacheID}
        request={() => Promise.resolve(data)}
        onFinish={(values) => {
          return updateArticle(data.id, values).then(() => {
            message.success('更新成功')
            refresh()
            return true
          })
        }}
      />
      <ArticleComment
        onRefresh={() => refreshComments()}
        loading={commentLoading}
        count={comments?.length}
        comments={comments}
        visible={commentVisible}
        onClose={() => setCommentVisible(false)}
      />
    </Container>
  )
}

export default EditArticle
