import { queryArticleById, updateArticle } from '@/services/ant-design-pro/article'
import { CommentOutlined, DeleteOutlined, EyeOutlined, LikeOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout'
import { Badge, Button, Space } from 'antd'
import { useRequest } from 'umi'
import ArticleDetail from './components/ArticleDetail'

const EditArticle = () => {
  const { loading, data } = useRequest(() =>
    queryArticleById(1).then((result) => {
      // eslint-disable-next-line no-param-reassign
      result.keywords = result.keywords?.split('、') as any
      // eslint-disable-next-line no-param-reassign
      result.tagIds = result.tags?.map((v) => v.id)
      // eslint-disable-next-line no-param-reassign
      result.categoryIds = result.categories?.map((v) => v.id)
      return { data: result }
    })
  )

  return (
    <PageContainer
      loading={loading}
      extra={
        <Space>
          <Button danger type='dashed' size='small' icon={<DeleteOutlined />}>
            删除文章
          </Button>
          <Badge count={data?.commenting}>
            <Button size='small' icon={<CommentOutlined />}>
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
          </Button.Group>
        </Space>
      }
    >
      <ArticleDetail
        title='更新文章'
        initialValues={data as any}
        onFinish={(values) => {
          return updateArticle(data?.id!, values).then(() => true)
        }}
      />
    </PageContainer>
  )
}

export default EditArticle
