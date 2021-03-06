import { CommentAvatar, UniversalEditor } from '@/components/common'
import { CommentState, commentStates, COMMENT_GUESTBOOK_ID, cs } from '@/constants/comment'
import { omitSelectAllValue, SELECT_ALL_VALUE } from '@/constants/common'
import {
  useComments,
  useCreateAdminComment,
  useDeleteComment,
  useUpdateCommentState,
} from '@/hooks/comment'
import type { CommentPatchRequest } from '@/services/ant-design-pro/comment'
import type { API } from '@/services/ant-design-pro/typings'
import { formatDate } from '@/transforms/date'
import { markdownToHTML } from '@/transforms/markdown'
import { parserBrowser, parserOS } from '@/transforms/ua'
import { getBlogArticleUrl } from '@/transforms/url'
import {
  CheckOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartOutlined,
  LinkOutlined,
  MailOutlined,
  StopOutlined,
} from '@ant-design/icons'
import type { ProFormInstance } from '@ant-design/pro-form'
import { DrawerForm } from '@ant-design/pro-form'
import type { ActionType, ProColumns } from '@ant-design/pro-table'
import ProTable from '@ant-design/pro-table'
import { Button, Form, Input, message, Modal, Popover, Space, Tag, Tooltip, Typography } from 'antd'
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
  const [createAdminComment] = useCreateAdminComment()
  const formRef = useRef<ProFormInstance | undefined>()
  const actionRef = useRef<ActionType | undefined>()
  const commentRef = useRef<API.Comment | undefined>()
  const [loading, setLoading] = useState(false)
  const [commentVisible, setCommentVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    refresh: () => {
      actionRef.current?.reload()
    },
  }))

  const openAdminCommentModal = (comment: API.Comment) => {
    commentRef.current = comment
    setCommentVisible(true)
  }

  const handleStateChange = (input: CommentPatchRequest) => {
    Modal.confirm({
      title: `????????????????????????????????? [${cs(input.state).name}] ??????????`,
      content: '?????????????????????!!!',
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
          message.success('??????????????????')
          setLoading(false)
        })
      },
    })
  }

  const handleRemoveComment = ({ id }: API.Comment) => {
    Modal.confirm({
      title: `????????????????????????????????????`,
      content: '?????????????????????!!!',
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
          message.success('????????????')
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
          {articleId || '?????????'}
        </Button>
      ),
      valueType: 'select',
      valueEnum: {
        [SELECT_ALL_VALUE]: '????????????',
        [COMMENT_GUESTBOOK_ID]: '????????????',
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
      title: '??????',
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
      title: '?????????',
      dataIndex: 'keyword',
      hideInTable: true,
    },
    {
      title: '????????????',
      width: 240,
      key: 'profile',
      search: false,
      render: (_, { email, nickname, loginType, avatar }) => (
        <Space direction='vertical'>
          <Space>
            <CommentAvatar nickname={nickname} avatar={avatar} loginType={loginType} />
            {nickname}
          </Space>
          <Space>
            <MailOutlined />
            <Typography.Text copyable>{email || '-'}</Typography.Text>
          </Space>
          <Space>
            <LinkOutlined />
            {loginType === 'github' ? (
              <Tooltip overlay={loginType}>
                <Typography.Link
                  underline
                  target='_blank'
                  rel='noreferrer'
                  href={`https://github.com/${nickname}`}
                >
                  ????????????
                </Typography.Link>
              </Tooltip>
            ) : (
              '-'
            )}
          </Space>
        </Space>
      ),
    },
    {
      title: '?????????',
      key: 'time',
      width: 230,
      search: false,
      render: (_, { city, province, ip, createAt, agent }) => (
        <Space direction='vertical'>
          <span>
            IP???
            <Typography.Text copyable={true}>{ip || '-'}</Typography.Text>
          </span>
          <span>
            ?????????
            {city || '-'}
            <span> - </span>
            {province || '-'}
          </span>
          <span>
            ?????????
            <Popover
              title='????????????'
              placement='right'
              content={
                <div>
                  <p>????????????{parserBrowser(agent)}</p>
                  <div>?????????{parserOS(agent)}</div>
                </div>
              }
            >
              {parserBrowser(agent)}
            </Popover>
          </span>
          <span>
            ?????????
            {formatDate(createAt)}
          </span>
        </Space>
      ),
    },
    {
      title: '??????',
      width: 120,
      dataIndex: 'state',
      valueType: 'select',
      fieldProps: {
        options: [
          { label: '????????????', value: SELECT_ALL_VALUE },
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
              {liking} ??????
            </Tag>
            <Tag icon={s.icon} color={s.color}>
              {s.name}
            </Tag>
          </Space>
        )
      },
    },
    {
      title: '??????',
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
            ????????????
          </Button>
          <Button
            size='small'
            type='text'
            block
            icon={<CommentOutlined />}
            onClick={() => {
              openAdminCommentModal(comment)
            }}
          >
            ????????????
          </Button>
          {comment.state === CommentState.Auditing && (
            <Button
              size='small'
              type='text'
              block={true}
              icon={<CheckOutlined />}
              onClick={() => handleStateChange({ id: comment.id, state: CommentState.Published })}
            >
              <Typography.Text type='success'>????????????</Typography.Text>
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
              ????????????
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
              ????????????
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
                <Typography.Text type='warning'>????????????</Typography.Text>
              </Button>
              <Button
                size='small'
                type='text'
                danger={true}
                block={true}
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveComment(comment)}
              >
                ????????????
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
            ????????????
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <ProTable
        formRef={formRef}
        actionRef={actionRef}
        columnEmptyText='-'
        headerTitle='????????????'
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
          setTimeout(() => {
            setLoading(false)
          }, 200)
          return data?.comments!
        }}
      />

      <DrawerForm
        title={`??????:${commentRef.current?.nickname}`}
        visible={commentVisible}
        onVisibleChange={setCommentVisible}
        onFinish={async ({ content }) => {
          setLoading(true)
          if (commentRef.current) {
            const { data } = await createAdminComment({
              variables: {
                input: {
                  content,
                  parentId: commentRef.current.id,
                  articleId: commentRef.current.articleId,
                  agent: navigator.userAgent,
                },
              },
            })
            updateQuery(({ comments }) => {
              return {
                comments: {
                  ...comments,
                  data: comments.data.concat(data?.adminComment!),
                  total: comments.total + 1,
                },
              }
            })
            actionRef.current?.reload()
            message.success('????????????')
          }
          setLoading(false)
          return true
        }}
      >
        <Form.Item label='????????????'>
          <Typography.Paragraph>
            <blockquote
              dangerouslySetInnerHTML={{
                __html: markdownToHTML(commentRef.current?.content ?? ''),
              }}
            />
          </Typography.Paragraph>
        </Form.Item>
        <Form.Item
          name='content'
          label='????????????'
          rules={[{ required: true, message: '?????????????????????' }]}
        >
          <UniversalEditor disabledMinimap={true} disabledCacheDraft={true} maxRows={9} />
        </Form.Item>
      </DrawerForm>
    </>
  )
})

export default CommentTable
