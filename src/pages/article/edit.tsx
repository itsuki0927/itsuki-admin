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

  const { loading, data, mutate } = useRequest(() =>
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

  const handleRequest = () => {
    return new Promise<ArticleDetailResponse>((resolve) => {
      const localeContent = getUEditorCache(articleCacheID)
      if (!!localeContent && localeContent !== data?.content) {
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
              ...data!,
              content: localeContent,
            }
            mutate(mutateData)
            // TODO: 会弹出两个弹出框
            Modal.destroyAll()
            resolve(mutateData)
          },
          onCancel() {
            // TODO: 会弹出两个弹出框
            Modal.destroyAll()
            resolve(data!)
          },
        })
      } else {
        resolve(data!)
      }
    })
  }

  return (
    <Container
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
        <ArticleForm
          cacheID={articleCacheID}
          request={handleRequest}
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
    </Container>
  )
}

export default EditArticle
