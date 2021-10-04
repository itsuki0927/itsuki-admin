import { CommentState, commentStates, cs } from '@/constants/comment'
import type { CommentPatchRequest } from '@/services/ant-design-pro/comment'
import { queryCommentList } from '@/services/ant-design-pro/comment'
import type { API } from '@/services/ant-design-pro/typings'
import { formatDate } from '@/transforms/date.transform'
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartOutlined,
  LinkOutlined,
  StopOutlined,
} from '@ant-design/icons'
import type { ProFormInstance } from '@ant-design/pro-form'
import type { ActionType, ProColumns } from '@ant-design/pro-table'
import ProTable from '@ant-design/pro-table'
import { Avatar, Button, Input, message, Modal, Popover, Space, Tag, Typography } from 'antd'
import gravatar from 'gravatar'
import { useEffect, useRef } from 'react'

type CommentTableProps = {
  onStateChange: (data: CommentPatchRequest) => Promise<number>
  onRemove: (id: number) => Promise<number>
  onDetail: (comment: API.Comment) => void
  refresh: boolean
}

const CommentTable = ({ onStateChange, onRemove, onDetail, refresh }: CommentTableProps) => {
  const formRef = useRef<ProFormInstance | undefined>()
  const actionRef = useRef<ActionType | undefined>()

  // TODO: 有更好的方式解决
  // HACK: 用这种方式先实现
  useEffect(() => {
    actionRef?.current?.reload()
  }, [refresh])

  const handleStateChange = (data: CommentPatchRequest) => {
    Modal.confirm({
      title: `确定要将 状态变更为 [${cs(data.status).name}] 状态嘛?`,
      content: '此操作不能撤销!!!',
      centered: true,
      onOk() {
        onStateChange(data).then(() => {
          message.success('状态变更成功')
          actionRef.current?.reload()
        })
      },
    })
  }

  const handleRemoveComment = (id: number) => {
    Modal.confirm({
      title: `确定要彻底删除 1 个评论吗？`,
      content: '此操作不能撤销!!!',
      centered: true,
      onOk() {
        onRemove(id).then(() => {
          message.success('删除成功')
          actionRef.current?.reload()
        })
      },
    })
  }

  const handleArticleIdChange = (AID: number) => {
    formRef.current?.setFieldsValue({
      AID,
    })
    formRef.current?.submit()
  }

  const columns: ProColumns<API.Comment>[] = [
    { title: 'ID', width: 40, dataIndex: 'id', search: false },
    {
      title: 'PID',
      width: 40,
      dataIndex: 'parentId',
      search: false,
      renderText: (text) => text || '-',
    },
    {
      title: 'AID',
      width: 40,
      dataIndex: 'articleId',
      render: (_, { articleId }) => (
        <Button size='small' type='ghost' onClick={() => handleArticleIdChange(articleId)}>
          {articleId || '留言板'}
        </Button>
      ),
      valueType: 'select',
      valueEnum: {
        0: '全部评论',
        '-1': '留言评论',
      },
      fieldProps: {
        dropdownRender: (menu: React.ReactElement) => (
          <div>
            {menu}
            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
              <Input.Search
                allowClear
                size='small'
                type='number'
                placeholder='AID'
                enterButton={<span>GO</span>}
                onSearch={(value) => handleArticleIdChange(value as any)}
              />
            </div>
          </div>
        ),
      },
    },
    {
      title: '内容',
      width: 300,
      dataIndex: 'content',
      render: (_, { content }) => (
        <Typography.Paragraph ellipsis={{ rows: 6, expandable: true }}>
          {content}
        </Typography.Paragraph>
      ),
    },
    {
      title: '个人信息',
      width: 240,
      dataIndex: 'content',
      search: false,
      render: (_, { email, nickname, website }) => (
        <Space direction='vertical'>
          <span>
            头像：
            <Avatar shape='square' size='small' src={gravatar.url(email, { protocol: 'https' })} />
          </span>
          <span>名字：{nickname}</span>
          <span>
            邮箱：
            <Typography.Text copyable>{email || '-'}</Typography.Text>
          </span>
          <span>
            网址：
            {website ? (
              <Typography.Link underline target='_blank' rel='noreferrer' href={website}>
                点击打开
              </Typography.Link>
            ) : (
              '-'
            )}
          </span>
        </Space>
      ),
    },
    {
      title: '发布于',
      width: 230,
      dataIndex: 'content',
      search: false,
      render: (_, { city, province, ip, createAt }) => (
        <Space direction='vertical'>
          <span>
            IP：
            <Typography.Text copyable={true}>{ip || '-'}</Typography.Text>
          </span>
          <span>
            位置：
            {city || '-'}
            <span> - </span>
            {province || '-'}
          </span>
          <span>
            终端：
            <Popover
              title='终端信息'
              placement='right'
              content={
                <div>
                  <p>浏览器：Chrome</p>
                  <div>系统：Mac</div>
                </div>
              }
            >
              Chrome | 91
            </Popover>
          </span>
          <span>
            时间：
            {formatDate(createAt)}
          </span>
        </Space>
      ),
    },
    {
      title: '状态',
      width: 120,
      dataIndex: 'status',
      valueType: 'select',
      fieldProps: {
        options: [
          { label: '全部状态', value: 'ALL' },
          ...commentStates.map((state) => {
            return {
              value: state.id,
              label: (
                <Space>
                  {state.icon}
                  {state.name}
                </Space>
              ),
            }
          }),
        ],
      },
      render: (_, { status, liking }) => {
        const state = cs(status)
        return (
          <Space direction='vertical'>
            <Tag icon={<HeartOutlined />} color={liking > 0 ? 'magenta' : undefined}>
              {liking} 个赞
            </Tag>
            <Tag icon={state.icon} color={state.color}>
              {state.name}
            </Tag>
          </Space>
        )
      },
    },
    {
      title: '操作',
      width: 110,
      valueType: 'option',
      render: (_, comment) => (
        <Space direction='vertical'>
          <Button
            size='small'
            type='text'
            block
            icon={<EditOutlined />}
            onClick={() => onDetail(comment)}
          >
            评论详情
          </Button>
          {comment.status === CommentState.Auditing && (
            <Button
              size='small'
              type='text'
              block={true}
              icon={<CheckOutlined />}
              onClick={() =>
                handleStateChange({ ids: [comment.id], status: CommentState.Published })
              }
            >
              <Typography.Text type='success'>审核通过</Typography.Text>
            </Button>
          )}
          {comment.status === CommentState.Published && (
            <Button
              size='small'
              type='text'
              block={true}
              danger={true}
              icon={<StopOutlined />}
              onClick={() => handleStateChange({ ids: [comment.id], status: CommentState.Spam })}
            >
              标为垃圾
            </Button>
          )}
          {(comment.status === CommentState.Auditing ||
            comment.status === CommentState.Published) && (
            <Button
              size='small'
              type='text'
              block={true}
              danger={true}
              icon={<DeleteOutlined />}
              onClick={() => handleStateChange({ ids: [comment.id], status: CommentState.Deleted })}
            >
              移回收站
            </Button>
          )}
          {(comment.status === CommentState.Deleted || comment.status === CommentState.Spam) && (
            <>
              <Button
                size='small'
                type='text'
                block={true}
                icon={<EditOutlined />}
                onClick={() =>
                  handleStateChange({ ids: [comment.id], status: CommentState.Auditing })
                }
              >
                <Typography.Text type='warning'>退为草稿</Typography.Text>
              </Button>
              <Button
                size='small'
                type='text'
                danger={true}
                block={true}
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveComment(comment.id)}
              >
                彻底删除
              </Button>
            </>
          )}
          <Button
            size='small'
            block={true}
            type='link'
            target='_blank'
            icon={<LinkOutlined />}
            href={''}
          >
            宿主页面
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <ProTable
      formRef={formRef}
      actionRef={actionRef}
      columnEmptyText='-'
      headerTitle='评论列表'
      rowKey='id'
      columns={columns}
      request={(params) => queryCommentList(params as any)}
    />
  )
}

export default CommentTable
