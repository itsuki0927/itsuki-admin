import { Container } from '@/components/common'
import { SnippetForm } from '@/components/snippet'
import { deleteSnippet, querySnippetById, updateSnippet } from '@/services/ant-design-pro/snippet'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, message, Modal, Space } from 'antd'
import { history, useParams, useRequest } from 'umi'

const SnippetEdit = () => {
  const { id } = useParams<{ id: string }>()
  const { loading, data, refresh } = useRequest(() =>
    querySnippetById(id).then((result) => {
      result.categoryIds = result.categories.map((item) => item.id)
      return { data: result }
    })
  )

  const handleRemove = () => {
    Modal.confirm({
      title: `你确定要删除片段: ${data?.name}嘛?`,
      content: '此操作不能撤销!!!',
      onOk() {
        deleteSnippet(id).then(() => {
          message.success('删除成功')
          history.replace('/snippet/list')
        })
      },
    })
  }

  if (!data || loading) {
    return <Container loading={!data || loading} />
  }

  return (
    <Container
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
        isEdit
        key='editSnippet'
        request={() => Promise.resolve(data)}
        onFinish={(values) => {
          return updateSnippet(id, values).then(() => {
            message.success('更新成功')
            refresh()
            return true
          })
        }}
      />
    </Container>
  )
}

export default SnippetEdit
