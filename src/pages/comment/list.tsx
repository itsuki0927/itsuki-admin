import { CommentDrawer, CommentTable } from '@/components/comment'
import type { CommentTableRef } from '@/components/comment/CommentTable'
import { Container } from '@/components/common'
import { useComment, useUpdateComment } from '@/hooks/comment'
import type { API } from '@/entities/typings'
import { message } from 'antd'
import { useRef, useState } from 'react'

const CommentList = () => {
  const [detail, setDetail] = useState<API.Comment | undefined>()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fetchComment] = useComment()
  const [updateComment] = useUpdateComment()
  const actionRef = useRef<CommentTableRef>(null)

  return (
    <Container>
      <CommentTable
        ref={actionRef}
        onDetail={async ({ id }) => {
          setVisible(true)
          setLoading(true)
          const { data } = await fetchComment({ variables: { id } })
          setDetail(data?.comment)
          setLoading(false)
        }}
      />

      <CommentDrawer
        loading={loading}
        comment={detail}
        visible={visible}
        onVisibleChange={setVisible}
        onFinish={async (input) => {
          if (!detail) {
            return Promise.resolve(true)
          }
          setLoading(true)
          await updateComment({
            variables: {
              id: detail.id,
              input,
            },
          })
          actionRef.current?.refresh()
          message.success('更新成功')
          setLoading(false)
          setVisible(false)
          return true
        }}
      />
    </Container>
  )
}

export default CommentList
