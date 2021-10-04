import { patchComment, removeComment, updateComment } from '@/services/ant-design-pro/comment'
import type { API } from '@/services/ant-design-pro/typings'
import { PageContainer } from '@ant-design/pro-layout'
import { useState } from 'react'
import CommentDrawer from './components/Drawer'
import CommentTable from './components/Table'

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
        onStateChange={(data) => patchComment(data)}
        onRemove={removeComment}
      />

      <CommentDrawer
        comment={detail}
        visible={visible}
        onVisibleChange={setVisible}
        onFinish={(comment) => {
          return updateComment(detail?.id!, comment).then(() => {
            setRefresh((r) => !r)
            setVisible(false)
            return true
          })
        }}
      />
    </PageContainer>
  )
}

export default CommentList
