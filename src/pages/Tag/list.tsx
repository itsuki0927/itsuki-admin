import { Container } from '@/components/common'
import { TagModal } from '@/components/tag'
import type { TagActionRequest } from '@/services/ant-design-pro/tag'
import { createTag, queryTagList, removeTag, updateTag } from '@/services/ant-design-pro/tag'
import type { API } from '@/services/ant-design-pro/typings'
import { DeleteOutlined, EditOutlined, LinkOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-table'
import ProTable from '@ant-design/pro-table'
import { Button, message, Modal, Table } from 'antd'
import { useRef, useState } from 'react'

const TagList = () => {
  const [visible, setVisible] = useState(false)
  const [temp, setTemp] = useState<API.Tag | undefined>()
  const actionRef = useRef<ActionType>()

  const handleRemove = (entity: API.Tag) => () => {
    Modal.confirm({
      title: `确定删除标签 '${entity.name}'嘛?`,
      content: '删除后不可恢复',
      onOk() {
        removeTag(entity.id!).then(() => {
          actionRef.current?.reload()
          message.success('删除成功')
        })
      },
    })
  }

  const handleCreate = () => {
    setVisible(true)
    setTemp(undefined)
  }

  const handleUpdate =
    ({ expand, ...rest }: API.Tag) =>
    () => {
      setVisible(true)
      if (expand) {
        // eslint-disable-next-line no-param-reassign
        expand = JSON.parse(expand)
      }
      setTemp({ ...rest, expand })
    }

  const confirmUpdate = (values: TagActionRequest) => {
    if (values.expand) {
      // eslint-disable-next-line no-param-reassign
      values.expand = JSON.stringify(values.expand)
    }
    return updateTag(temp?.id!, values).then(() => {
      message.success('更新成功')
      actionRef.current?.reload()
      setVisible(false)
    })
  }

  const confirmCreate = (values: TagActionRequest) => {
    return createTag(values).then(() => {
      message.success('创建成功')
      actionRef.current?.reload()
      setVisible(false)
    })
  }

  const columns: ProColumns<API.Tag>[] = [
    { title: 'id', dataIndex: 'id', align: 'center' },
    { title: '名称', dataIndex: 'name', align: 'center' },
    { title: '路径', dataIndex: 'path', align: 'center' },
    { title: '描述', dataIndex: 'description', align: 'center' },
    // TODO: 后端排序
    { title: '排序', dataIndex: 'sort', align: 'center', sorter: true },
    { title: '文章', dataIndex: 'count', align: 'center' },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      width: 250,
      render: (_, entity) => (
        <div>
          <Button type='text' icon={<EditOutlined />} size='small' onClick={handleUpdate(entity)}>
            编辑
          </Button>
          <Button type='link' icon={<LinkOutlined />} size='small'>
            查看
          </Button>
          <Button
            type='text'
            icon={<DeleteOutlined />}
            size='small'
            danger
            onClick={handleRemove(entity)}
          >
            删除
          </Button>
        </div>
      ),
    },
  ]

  return (
    <Container>
      <ProTable
        headerTitle='标签管理'
        columns={columns}
        search={false}
        rowKey='id'
        actionRef={actionRef}
        request={(params, sort) => queryTagList({ ...params, ...sort })}
        rowSelection={{
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => (
          <Button
            danger
            type='text'
            onClick={() => {
              // TODO: 批量删除
              console.log(selectedRowKeys)
              onCleanSelected()
            }}
          >
            批量删除
          </Button>
        )}
        options={{
          search: { name: 'name' },
          reload: false,
          density: false,
          setting: false,
        }}
        toolBarRender={() => [
          <Button key='3' type='primary' onClick={handleCreate}>
            <PlusOutlined />
            新建标签
          </Button>,
        ]}
      />
      <TagModal
        title={temp ? '编辑标签' : '添加标签'}
        tag={temp}
        visible={visible}
        onChange={setVisible}
        onFinish={(values) => (temp?.id ? confirmUpdate(values) : confirmCreate(values))}
      />
    </Container>
  )
}

export default TagList
