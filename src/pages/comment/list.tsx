import { CommentDrawer, CommentTable } from '@/components/comment'
import { patchComment, removeComment, updateComment } from '@/services/ant-design-pro/comment'
import type { API } from '@/services/ant-design-pro/typings'
import { PageContainer } from '@ant-design/pro-layout'
import { message } from 'antd'
import { useState } from 'react'

const CommentList = () => {
  const [detail, setDetail] = useState<API.Comment | undefined>()
  const [visible, setVisible] = useState(false)
  const [refresh, setRefresh] = useState(false)

  return (
    <PageContainer>
      <CommentTable
        refresh={refresh}
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
          return updateComment(detail?.id!, comment).then(() => {
            setRefresh((r) => !r)
            setVisible(false)
            message.success('更新成功')
            return true
          })
        }}
      />
    </PageContainer>
  )
}

export default CommentList
