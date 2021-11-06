import SnippetForm from '@/components/snippet/SnippetForm'
import { deleteSnippet, querySnippetById, updateSnippet } from '@/services/ant-design-pro/snippet'
import { DeleteOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout'
import { Button, message, Modal, Space } from 'antd'
import { history, useParams, useRequest } from 'umi'

const SnippetEdit = () => {
  const { id } = useParams<{ id: string }>()
  const { loading, data: initialValues } = useRequest(() =>
    querySnippetById(id).then((data) => {
      return { data }
    })
  )

  const handleRemove = () => {
    Modal.confirm({
      title: `你确定要删除片段: ${initialValues?.name}嘛?`,
      content: '此操作不能撤销!!!',
      onOk() {
        deleteSnippet(id).then(() => {
          message.success('删除成功')
          history.replace('/snippet/list')
        })
      },
    })
  }

  return (
    <PageContainer
      loading={loading}
      extra={
        <Space>
          <Button
            danger
            type='dashed'
            size='small'
            onClick={handleRemove}
            icon={<DeleteOutlined />}
          >
            删除片段
          </Button>
        </Space>
      }
    >
      <SnippetForm
        key='editSnippet'
        initialValues={initialValues}
        onFinish={(values) => {
          return updateSnippet(id, values).then(() => {
            message.success('更新成功')
            return true
          })
        }}
      />
    </PageContainer>
  )
}

export default SnippetEdit