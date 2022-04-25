import { ab } from '@/constants/article/banner'
import { ao } from '@/constants/article/origin'
import { ap } from '@/constants/article/public'
import { omitSelectAllValue } from '@/constants/common'
import { ps, PublishState } from '@/constants/publish'
import type {
  ArticleMetaPatchRequest,
  ArticlePatchRequest,
  ArticleSearchRequest,
} from '@/services/ant-design-pro/article'
import { queryArticleList } from '@/services/ant-design-pro/article'
import type { API } from '@/services/ant-design-pro/typings'
import { formatDate } from '@/transforms/date'
import {
  CheckOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FolderOpenOutlined,
  HeartOutlined,
  LinkOutlined,
  RetweetOutlined,
  RollbackOutlined,
  SwapOutlined,
  TagOutlined,
} from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-table'
import ProTable, { TableDropdown } from '@ant-design/pro-table'
import { Button, Card, Modal, Space, Table, Tag, Typography } from 'antd'
import { useRef } from 'react'
import { history, Link } from 'umi'

type ArticleTableProps = {
  query?: ArticleSearchRequest
  onPatch: (data: ArticlePatchRequest) => Promise<number>
  onMetaPatch: (id: number, data: ArticleMetaPatchRequest) => Promise<number>
}

const ArticleTable = ({ query, onPatch, onMetaPatch }: ArticleTableProps) => {
  const actionRef = useRef<ActionType | undefined>()

  const handleStateChange = (ids: number[], state: PublishState, cb?: () => void) => {
    Modal.confirm({
      title: `确定要将 状态变更为 [${ps(state).name}] 状态嘛?`,
      content: '此操作不能撤销!!!',
      centered: true,
      onOk() {
        onPatch({ ids, state }).then(() => {
          actionRef.current?.reload()
          if (cb) {
            cb()
          }
        })
      },
    })
  }

  const handleBannerChange = (id: number, value: number, cb?: () => void) => {
    Modal.confirm({
      title: `确定要将该文章 ${value === 1 ? '加入轮播图' : '移除轮播图'} 吗?`,
      content: '此操作不能撤销!!!',
      centered: true,
      onOk() {
        onMetaPatch(id, { meta: 'banner', value }).then(() => {
          actionRef.current?.reload()
          if (cb) {
            cb()
          }
        })
      },
    })
  }

  const columns: ProColumns<API.Article>[] = [
    { title: 'id', width: 40, dataIndex: 'id' },
    {
      title: '文章',
      width: 360,
      render: (_, { title, description, cover }) => {
        return (
          <Card
            size='small'
            bordered={false}
            bodyStyle={{
              minHeight: '100px',
              backdropFilter: 'blur(2px)',
            }}
            style={{
              margin: '1rem 0',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              minHeight: '100px',
              backgroundImage: `url(${cover})`,
            }}
          >
            <Card.Meta
              title={
                <Typography.Title style={{ marginTop: '5px' }} level={5}>
                  {title}
                </Typography.Title>
              }
              description={
                <Typography.Paragraph
                  type='secondary'
                  style={{ marginBottom: '5px' }}
                  ellipsis={{ rows: 2, expandable: true }}
                >
                  {description}
                </Typography.Paragraph>
              }
            />
          </Card>
        )
      },
    },
    {
      title: '归类',
      width: 130,
      render: (_, { tags, categories }) => {
        return (
          <Space direction='vertical'>
            {categories?.map((category) => (
              <Space size='small' key={category.id}>
                <FolderOpenOutlined />
                {category.name}
              </Space>
            ))}
            <Space size='small' wrap={true}>
              {tags?.map((tag) => (
                <Tag icon={<TagOutlined />} key={tag.id}>
                  {tag.name}
                </Tag>
              ))}
            </Space>
          </Space>
        )
      },
    },
    {
      title: '被关注',
      width: 150,
      render: (_, { reading, liking, commenting }) => {
        return (
          <Space direction='vertical'>
            <Space size='small'>
              <EyeOutlined />
              浏览 {reading} 次
            </Space>
            <Space size='small'>
              <HeartOutlined />
              喜欢 {liking} 次
            </Space>
            <Space size='small'>
              <CommentOutlined />
              评论 {commenting} 条
            </Space>
          </Space>
        )
      },
    },
    {
      title: '更新周期',
      width: 230,
      render: (_, { createAt, updateAt }) => {
        return (
          <Space direction='vertical'>
            <span>最早发布：{formatDate(createAt)}</span>
            <span>最后更新：{formatDate(updateAt)}</span>
          </Space>
        )
      },
    },
    {
      title: '状态',
      width: 120,
      render: (
        _,
        { publish: propPublish, open: propOpen, origin: propOrigin, banner: propBanner }
      ) => {
        const publish = ps(propPublish!)
        const open = ap(propOpen!)
        const origin = ao(propOrigin!)
        const banner = ab(propBanner!)
        return (
          <Space direction='vertical'>
            {[publish, open, origin, banner].map((s) => (
              <Tag icon={s.icon} color={s.color} key={s.id}>
                {s.name}
              </Tag>
            ))}
          </Space>
        )
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 110,
      render: (_, article) => (
        <Space direction='vertical'>
          <Link to={`/article/edit/${article.id}`}>
            <Button size='small' type='text' block icon={<EditOutlined />}>
              文章详情
            </Button>
          </Link>
          {article.publish === PublishState.Draft && (
            <Button
              size='small'
              type='text'
              block
              icon={<CheckOutlined />}
              onClick={() => handleStateChange([article.id], PublishState.Published)}
            >
              <Typography.Text type='success'>直接发布</Typography.Text>
            </Button>
          )}
          {article.publish === PublishState.Published && (
            <Button
              size='small'
              type='text'
              block
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleStateChange([article.id], PublishState.Recycle)}
            >
              移回收站
            </Button>
          )}
          {article.publish === PublishState.Recycle && (
            <Button
              size='small'
              type='text'
              block
              icon={<RollbackOutlined />}
              onClick={() => handleStateChange([article.id], PublishState.Draft)}
            >
              <Typography.Text type='warning'>退至草稿</Typography.Text>
            </Button>
          )}
          <Button
            size='small'
            type='text'
            block
            icon={article.banner === 1 ? <SwapOutlined /> : <RetweetOutlined />}
            onClick={() => handleBannerChange(article.id, article.banner === 1 ? 0 : 1)}
          >
            {article.banner === 1 ? '移除轮播' : '加入轮播'}
          </Button>
          <Button size='small' block type='link' target='_blank' icon={<LinkOutlined />}>
            宿主页面
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <ProTable
      actionRef={actionRef}
      headerTitle='文章列表'
      search={false}
      params={omitSelectAllValue(query)}
      columns={columns}
      rowKey='id'
      rowSelection={{
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
      }}
      tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
        <Space size={24}>
          <span>
            已选 {selectedRowKeys.length} 项
            <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
              取消选择
            </a>
          </span>
        </Space>
      )}
      tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => {
        return (
          <Space>
            <Button
              size='small'
              type='text'
              block
              icon={<CheckOutlined />}
              onClick={() => {
                handleStateChange(
                  selectedRowKeys as number[],
                  PublishState.Published,
                  onCleanSelected
                )
              }}
            >
              <Typography.Text type='success'>直接发布</Typography.Text>
            </Button>
            <Button
              size='small'
              type='text'
              block
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                handleStateChange(
                  selectedRowKeys as number[],
                  PublishState.Recycle,
                  onCleanSelected
                )
              }}
            >
              移回收站
            </Button>
            <Button
              size='small'
              type='text'
              block
              icon={<RollbackOutlined />}
              onClick={() => {
                handleStateChange(selectedRowKeys as number[], PublishState.Draft, onCleanSelected)
              }}
            >
              <Typography.Text type='warning'>退至草稿</Typography.Text>
            </Button>
            <TableDropdown
              menus={[
                { name: '加入轮播', key: 'joinBanner' },
                {
                  name: '移除轮播',
                  key: 'removeBanner',
                },
              ]}
            />
          </Space>
        )
      }}
      request={(params, sort) => {
        return queryArticleList({ ...params, ...sort })
      }}
      toolBarRender={() => [
        <Button type='primary' onClick={() => history.push('/article/create')}>
          撰写文章
        </Button>,
      ]}
    />
  )
}

export default ArticleTable
