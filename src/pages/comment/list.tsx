import { CommentDrawer, CommentTable } from '@/components/comment'
import type { CommentTableRef } from '@/components/comment/CommentTable'
import { Container } from '@/components/common'
import { patchComment, removeComment, updateComment } from '@/services/ant-design-pro/comment'
import type { API } from '@/services/ant-design-pro/typings'
import { message } from 'antd'
import { useRef, useState } from 'react'

const CommentList = () => {
  const [detail, setDetail] = useState<API.Comment | undefined>()
  const [visible, setVisible] = useState(false)
  const actionRef = useRef<CommentTableRef>(null)

  return (
    <Container>
      <CommentTable
        ref={actionRef}
        onDetail={(comment) => {
          setDetail(comment)
          setVisible(true)
        }}
        onStateChange={(data) =>
          patchComment(data).then((res) => {
            message.success('状态变更成功')
            return res
          })
        }
        onRemove={(id) =>
          removeComment(id).then((res) => {
            message.success('删除成功')
            return res
          })
        }
      />

      <CommentDrawer
        comment={detail}
        visible={visible}
        onVisibleChange={setVisible}
        onFinish={(comment) => {
          if (!detail) {
            return Promise.resolve(true)
          }
          return updateComment(detail.id, comment).then(() => {
            actionRef.current?.refresh()
            setVisible(false)
            message.success('更新成功')
            return true
          })
        }}
      />
    </Container>
  )
}

export default CommentList
