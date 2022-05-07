import { CommentState, commentStates, COMMENT_GUESTBOOK_ID, cs } from '@/constants/comment'
import { omitSelectAllValue, SELECT_ALL_VALUE } from '@/constants/common'
import { useComments, useDeleteComment, useUpdateCommentState } from '@/hooks/comment'
import type { CommentPatchRequest } from '@/services/ant-design-pro/comment'
import type { API } from '@/services/ant-design-pro/typings'
import { formatDate } from '@/transforms/date'
import { getGravatarUrl } from '@/transforms/gravatar'
import { parserBrowser, parserOS } from '@/transforms/ua'
import { getBlogArticleUrl } from '@/transforms/url'
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
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

type CommentTableProps = {
  onDetail: (comment: API.Comment) => void
}

export type CommentTableRef = {
  refresh: () => void
}

const CommentTable = forwardRef<CommentTableRef, CommentTableProps>(({ onDetail }, ref) => {
  const [fetchComments, { updateQuery }] = useComments()
  const [deleteComment] = useDeleteComment()
  const [updateCommentState] = useUpdateCommentState()
  const formRef = useRef<ProFormInstance | undefined>()
  const actionRef = useRef<ActionType | undefined>()
  const [loading, setLoading] = useState(false)

  useImperativeHandle(ref, () => ({
    refresh: () => {
      actionRef?.current?.reload()
    },
  }))

  const handleStateChange = (input: CommentPatchRequest) => {
    Modal.confirm({
      title: `确定要将评论状态变更为 [${cs(input.state).name}] 状态嘛?`,
      content: '此操作不能撤销!!!',
      centered: true,
      onOk() {
        setLoading(true)
        updateCommentState({
          variables: {
            ...input,
          },
        }).then(() => {
          updateQuery(({ comments }) => ({
            comments: {
              ...comments,
              data: comments.data.map((comment) => {
                if (input.id === comment.id) {
                  console.log('comment', comment, input)
                  return {
                    ...comment,
                    state: input.state,
                  }
                }
                return { ...comment }
              }),
            },
          }))
          actionRef.current?.reload()
          message.success('状态变更成功')
          setLoading(false)
        })
      },
    })
  }

  const handleRemoveComment = ({ id }: API.Comment) => {
    Modal.confirm({
      title: `确定要彻底删除该评论吗？`,
      content: '此操作不能撤销!!!',
      centered: true,
      okType: 'danger',
      onOk() {
        setLoading(true)
        deleteComment({ variables: { id } }).then(() => {
          updateQuery(({ comments }) => ({
            comments: {
              ...comments,
              data: comments.data.filter((v) => v.id !== id),
              total: comments.total - 1,
            },
          }))
          actionRef.current?.reload()
          message.success('删除成功')
          setLoading(false)
        })
      },
    })
  }

  const handleArticleIdChange = (articleId: number | string) => {
    formRef.current?.setFieldsValue({
      articleId,
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
        [SELECT_ALL_VALUE]: '全部评论',
        [COMMENT_GUESTBOOK_ID]: '留言评论',
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
                min={1}
                enterButton={<span>GO</span>}
                onSearch={(value) => handleArticleIdChange(value)}
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
      search: false,
      render: (_, { content }) => (
        <Typography.Paragraph ellipsis={{ rows: 6, expandable: true }}>
          {content}
        </Typography.Paragraph>
      ),
    },
    {
      title: '关键字',
      dataIndex: 'keyword',
      hideInTable: true,
    },
    {
      title: '个人信息',
      width: 240,
      key: 'profile',
      search: false,
      render: (_, { email, nickname, website }) => (
        <Space direction='vertical'>
          <span>
            头像：
            <Avatar shape='square' size='small' src={getGravatarUrl(email)} />
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
      key: 'time',
      width: 230,
      search: false,
      render: (_, { city, province, ip, createAt, agent }) => (
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
                  <p>浏览器：{parserBrowser(agent)}</p>
                  <div>系统：{parserOS(agent)}</div>
                </div>
              }
            >
              {parserBrowser(agent)}
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
      dataIndex: 'state',
      valueType: 'select',
      fieldProps: {
        options: [
          { label: '全部状态', value: SELECT_ALL_VALUE },
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
      render: (_, { state, liking }) => {
        const s = cs(state)
        return (
          <Space direction='vertical'>
            <Tag icon={<HeartOutlined />} color={liking > 0 ? 'magenta' : undefined}>
              {liking} 个赞
            </Tag>
            <Tag icon={s.icon} color={s.color}>
              {s.name}
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
          {comment.state === CommentState.Auditing && (
            <Button
              size='small'
              type='text'
              block={true}
              icon={<CheckOutlined />}
              onClick={() => handleStateChange({ id: comment.id, state: CommentState.Published })}
            >
              <Typography.Text type='success'>审核通过</Typography.Text>
            </Button>
          )}
          {comment.state === CommentState.Published && (
            <Button
              size='small'
              type='text'
              block={true}
              danger={true}
              icon={<StopOutlined />}
              onClick={() => handleStateChange({ id: comment.id, state: CommentState.Spam })}
            >
              标为垃圾
            </Button>
          )}
          {(comment.state === CommentState.Auditing ||
            comment.state === CommentState.Published) && (
            <Button
              size='small'
              type='text'
              block={true}
              danger={true}
              icon={<DeleteOutlined />}
              onClick={() => handleStateChange({ id: comment.id, state: CommentState.Deleted })}
            >
              移回收站
            </Button>
          )}
          {(comment.state === CommentState.Deleted || comment.state === CommentState.Spam) && (
            <>
              <Button
                size='small'
                type='text'
                block={true}
                icon={<EditOutlined />}
                onClick={() => handleStateChange({ id: comment.id, state: CommentState.Auditing })}
              >
                <Typography.Text type='warning'>退为草稿</Typography.Text>
              </Button>
              <Button
                size='small'
                type='text'
                danger={true}
                block={true}
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveComment(comment)}
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
            href={getBlogArticleUrl(comment.articleId)}
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
      loading={loading}
      beforeSearchSubmit={(target) => omitSelectAllValue(target)}
      request={async (search) => {
        setLoading(true)
        const { data } = await fetchComments({
          variables: {
            search,
          },
        })
        setLoading(false)
        return data?.comments!
      }}
    />
  )
})

export default CommentTable
