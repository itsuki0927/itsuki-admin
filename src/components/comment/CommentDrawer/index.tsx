import { CommentAvatar, UniversalEditor } from '@/components/common'
import { CommentState, commentStates, COMMENT_GUESTBOOK_ID } from '@/constants/comment'
import type { CommentUpdateRequest } from '@/services/ant-design-pro/comment'
import type { API } from '@/services/ant-design-pro/typings'
import { formatDate } from '@/transforms/date'
import { getSelectOptionsByState } from '@/transforms/option'
import { parserBrowser, parserOS } from '@/transforms/ua'
import { getBlogArticleUrl, getBlogGuestbookUrl } from '@/transforms/url'
import {
  CheckOutlined,
  LinkOutlined,
  MailOutlined,
  SendOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  DrawerForm,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-form'
import { Button, Divider, Form, Spin, Typography } from 'antd'

type CommentDrawerProps = {
  comment?: API.Comment
  loading?: boolean
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
  onFinish: (comment: CommentUpdateRequest) => Promise<boolean>
}

const CommentDrawer = ({ comment, loading, onFinish, ...rest }: CommentDrawerProps) => {
  return (
    <DrawerForm<CommentUpdateRequest>
      key={comment?.id}
      initialValues={comment}
      layout='horizontal'
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 21 }}
      width='40%'
      title='评论详情'
      onFinish={onFinish}
      {...rest}
      submitter={{
        searchConfig: {
          submitText: '提交更新',
        },
        submitButtonProps: {
          loading,
          icon: <CheckOutlined />,
        },
        render: (_, defaultDoms) => defaultDoms.pop(),
      }}
    >
      <Spin spinning={loading}>
        <Form.Item label='ID'>
          <Typography.Text copyable={true}>{comment?.id}</Typography.Text>
        </Form.Item>
        <Form.Item label='发布于'>{formatDate(comment?.createAt!)}</Form.Item>
        <Form.Item label='最后修改于'>{formatDate(comment?.updateAt!)}</Form.Item>
        <ProFormSwitch
          name='fix'
          label='置顶评论'
          disabled={comment?.state !== CommentState.Published}
        />
        <Form.Item label='用户头像'>
          <CommentAvatar
            size='default'
            nickname={comment?.nickname}
            avatar={comment?.avatar}
            loginType={comment?.loginType}
          />
        </Form.Item>
        <ProFormText
          fieldProps={{
            prefix: <UserOutlined />,
          }}
          label='用户昵称'
          name='nickname'
          rules={[{ required: true, message: '请输入用户昵称' }]}
        />
        <ProFormText
          fieldProps={{
            prefix: <MailOutlined />,
          }}
          label='用户邮箱'
          name='email'
          rules={[
            { required: true, message: '请输入用户邮箱' },
            { type: 'email', message: '请输入正确的邮箱' },
          ]}
        />
        <ProFormText
          label='用户网址'
          name='website'
          rules={[{ required: true, message: '请输入用户网址' }]}
          fieldProps={{
            prefix: <LinkOutlined />,
            suffix: (
              <SendOutlined
                onClick={() => {
                  const url = comment?.loginType
                  if (url) {
                    window.open(url)
                  }
                }}
              />
            ),
          }}
        />
        <Form.Item label='IP / 地址'>
          <Typography.Text copyable={true}>{comment?.ip || '-'}</Typography.Text>
          <Divider type='vertical' />
          {comment?.city || '-'}
          <span> - </span>
          {comment?.province || '-'}
        </Form.Item>
        <Form.Item label='终端'>
          {parserBrowser(comment?.agent!)}
          <Divider type='vertical' />
          {parserOS(comment?.agent!)}
        </Form.Item>
        <ProFormDigit
          fieldProps={{
            width: '100px',
          }}
          name='liking'
          label='喜欢'
          rules={[
            {
              required: true,
              message: '请输入喜欢数',
            },
          ]}
        />
        <Form.Item name='articleId' label='宿主文章'>
          <Button
            type='link'
            target='_blank'
            icon={<LinkOutlined />}
            href={
              comment?.articleId === COMMENT_GUESTBOOK_ID
                ? getBlogGuestbookUrl()
                : getBlogArticleUrl(comment?.articleId!)
            }
          >
            {comment?.articleId === COMMENT_GUESTBOOK_ID
              ? '留言板'
              : `${comment?.articleTitle || '-'}`}
            <Divider type='vertical' />#{comment?.id}
          </Button>
        </Form.Item>
        {!!Number(comment?.parentId) && (
          <Form.Item label='父级评论'>
            <p style={{ marginBottom: 0 }}>#{comment?.parentId}</p>
            <Typography.Paragraph>
              <blockquote>{comment?.parentNickName}</blockquote>
            </Typography.Paragraph>
          </Form.Item>
        )}
        <ProFormSelect
          name='state'
          label='评论状态'
          rules={[{ required: true, message: '请选择评论状态' }]}
          options={getSelectOptionsByState(commentStates)}
        />
        <Form.Item
          name='content'
          label='评论内容'
          rules={[{ required: true, message: '请输入评论内容' }]}
        >
          <UniversalEditor
            disabledMinimap={true}
            disabledCacheDraft={true}
            minRows={14}
            maxRows={18}
          />
        </Form.Item>
      </Spin>
    </DrawerForm>
  )
}

export default CommentDrawer
