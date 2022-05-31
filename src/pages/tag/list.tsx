import { Container } from '@/components/common'
import { TagModal } from '@/components/tag'
import { SYNC_TAG_COUNT } from '@/graphql/tag'
import { useCreateTag, useDeleteTag, useTag, useUpdateTag } from '@/hooks/tag'
import type { TagActionRequest } from '@/services/ant-design-pro/tag'
import type { API } from '@/services/ant-design-pro/typings'
import { getBlogTagUrl } from '@/transforms/url'
import {
  DeleteOutlined,
  EditOutlined,
  LinkOutlined,
  PlusOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-table'
import ProTable from '@ant-design/pro-table'
import { useMutation } from '@apollo/client'
import { Button, message, Modal, Space, Table } from 'antd'
import { useRef, useState } from 'react'

const TagList = () => {
  const [visible, setVisible] = useState(false)
  const [temp, setTemp] = useState<API.Tag | undefined>()
  const [fetchTags, { updateQuery, refetch, loading }] = useTag()
  const [createTag] = useCreateTag()
  const [deleteTag] = useDeleteTag()
  const [updateTag] = useUpdateTag()
  const [syncTagCount] = useMutation(SYNC_TAG_COUNT)
  const actionRef = useRef<ActionType>()

  const handleRemove = (entity: API.Tag) => () => {
    Modal.confirm({
      title: `确定删除标签 '${entity.name}'嘛?`,
      content: '删除后不可恢复',
      onOk() {
        deleteTag({ variables: { id: entity.id } }).then(() => {
          updateQuery((prevData) => {
            return {
              tags: {
                ...prevData.tags,
                data: prevData.tags.data.filter((item) => item.id !== entity.id!),
                total: prevData.tags.total - 1,
              },
            }
          })
          message.success('删除成功')
          actionRef.current?.reload()
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

  const confirmUpdate = async (input: TagActionRequest) => {
    if (input.expand) {
      // eslint-disable-next-line no-param-reassign
      input.expand = JSON.stringify(input.expand)
    }
    await updateTag({
      variables: {
        id: temp?.id!,
        input,
      },
    })
    updateQuery(({ tags }) => ({
      tags: {
        ...tags,
        data: tags.data.map((item) => {
          if (item.id === temp?.id) {
            return { ...item, ...input }
          }
          return item
        }),
      },
    }))
    setVisible(false)
    actionRef.current?.reload()
    message.success('更新成功')
  }

  const confirmCreate = async (input: TagActionRequest) => {
    console.log('input', input)
    const { data: newData } = await createTag({
      variables: {
        input,
      },
    })
    updateQuery(({ tags }) => ({
      tags: {
        ...tags,
        data: tags.data.concat(newData?.createTag!),
        total: tags.total + 1,
      },
    }))
    setVisible(false)
    actionRef.current?.reload()
    message.success('创建成功')
  }

  const columns: ProColumns<API.Tag>[] = [
    { title: 'id', dataIndex: 'id', align: 'center' },
    { title: '名称', dataIndex: 'name', align: 'center' },
    { title: '路径', dataIndex: 'path', align: 'center' },
    { title: '描述', dataIndex: 'description', align: 'center' },
    { title: '排序', dataIndex: 'sort', align: 'center', sorter: true },
    { title: '文章数', dataIndex: 'count', align: 'center' },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      width: 250,
      render: (_, entity) => (
        <Space>
          <Button type='text' icon={<EditOutlined />} size='small' onClick={handleUpdate(entity)}>
            编辑
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
          <Button
            type='link'
            href={getBlogTagUrl(entity.path)}
            icon={<LinkOutlined />}
            size='small'
          >
            查看
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Container>
      <ProTable
        headerTitle='标签管理'
        columns={columns}
        search={false}
        loading={loading}
        actionRef={actionRef}
        rowKey='id'
        request={async (search) => {
          const { data } = await fetchTags({
            variables: {
              search,
            },
          })
          console.log('data', data?.tags)
          return data?.tags!
        }}
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
          search: {
            size: 'small',
            name: 'name',
            onSearch: (name) => {
              fetchTags({
                variables: {
                  search: {
                    name,
                  },
                },
              })
              return true
            },
          },
          reload: false,
          density: false,
          setting: false,
        }}
        toolBarRender={() => [
          <Button
            key='sync'
            size='small'
            icon={<SyncOutlined />}
            onClick={() => {
              syncTagCount().then(async () => {
                await refetch()
                actionRef.current?.reload()
                message.success('同步成功')
              })
            }}
          >
            同步数量
          </Button>,
          <Button size='small' key='create' type='primary' onClick={handleCreate}>
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
