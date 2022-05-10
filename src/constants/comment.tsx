import { DeleteOutlined, EditOutlined, CheckOutlined, StopOutlined } from '@ant-design/icons'

/** 留言板 */
export const COMMENT_GUESTBOOK_ID = 0

/** 评论状态 */
export enum CommentState {
  Auditing = 0, // 待审核
  Published = 1, // 通过正常
  Deleted = -1, // 已删除
  Spam = -2, // 垃圾评论
}

const commentStateMap = new Map(
  [
    {
      id: CommentState.Auditing,
      name: '待审核',
      icon: <EditOutlined />,
      color: 'gray',
    },
    {
      id: CommentState.Published,
      name: '已发布',
      icon: <CheckOutlined />,
      color: 'green',
    },
    {
      id: CommentState.Spam,
      name: '垃圾评论',
      icon: <StopOutlined />,
      color: 'red',
    },
    {
      id: CommentState.Deleted,
      name: '回收站',
      icon: <DeleteOutlined />,
      color: 'orange',
    },
  ].map((item) => [item.id, item])
)

export const cs = (state: CommentState) => {
  return commentStateMap.get(state)!
}

export const commentStates = [...commentStateMap.values()]
