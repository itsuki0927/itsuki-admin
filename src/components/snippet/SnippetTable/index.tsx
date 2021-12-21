import { CodeBlock } from '@/components/common'
import { PinnedState, getPinnedState } from '@/constants/pinned'
import { omitSelectAllValue, SELECT_ALL_VALUE } from '@/constants/common'
import { ps, PublishState, publishStates } from '@/constants/publish'
import { ranksStates, rs } from '@/constants/ranks'
import {
  patchSnippet,
  patchSnippetPinned,
  querySnippetList,
} from '@/services/ant-design-pro/snippet'
import type { API } from '@/services/ant-design-pro/typings'
import { formatDate } from '@/transforms/date'
import { genMarkdownString } from '@/transforms/markdown'
import { getSelectOptionsByState } from '@/transforms/option'
import { getBlogSnippetUrl } from '@/transforms/url'
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  LinkOutlined,
  PushpinOutlined,
  RollbackOutlined,
  TagOutlined,
  UngroupOutlined,
} from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-table'
import { TableDropdown } from '@ant-design/pro-table'
import ProTable from '@ant-design/pro-table'
import { Button, Card, message, Modal, Space, Table, Tag, Typography } from 'antd'
import { useRef, useState } from 'react'
import { history, Link } from 'umi'

const SnippetTable = () => {
  const [visible, setVisible] = useState(false)
  const [temp, setTemp] = useState<API.Snippet | undefined>()
  const actionRef = useRef<ActionType>()

  const handlePatchSnippet = (ids: number[], status: PublishState, cb?: () => void) => {
    Modal.confirm({
      title: `确定要将 状态变更为 [${ps(status).name}] 状态嘛?`,
      content: '此操作不能撤销!!!',
      centered: true,
      onOk() {
        patchSnippet({ ids, status }).then(() => {
          actionRef.current?.reload()
          message.success('更新成功')
          if (cb) {
            cb()
          }
        })
      },
    })
  }

  const handlePinnedChange = (ids: number[], pinned: PinnedState, cb?: () => void) => {
    Modal.confirm({
      title: `确定要将该文章 ${pinned === 1 ? 'Pinned' : 'UnPinned'} 吗?`,
      content: '此操作不能撤销!!!',
      centered: true,
      onOk() {
        patchSnippetPinned({ ids, pinned }).then(() => {
          actionRef.current?.reload()
          if (cb) {
            cb()
          }
        })
      },
    })
  }

  const columns: ProColumns<API.Snippet>[] = [
    { title: 'id', dataIndex: 'id', width: 50, search: false },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'keyword',
      width: 250,
      render: (_, { name, description }) => {
        return (
          <Card
            size='small'
            bordered={false}
            style={{ maxWidth: 250 }}
            bodyStyle={{
              minHeight: '100px',
              backdropFilter: 'blur(2px)',
            }}
          >
            <Card.Meta
              title={
                <Typography.Title style={{ marginTop: '5px' }} level={5}>
                  {name}
                </Typography.Title>
              }
              description={
                <Typography.Paragraph
                  type='secondary'
                  style={{ marginBottom: '5px' }}
                  ellipsis={{ rows: 2, expandable: true }}
                >
                  {description}
                </Typography.Paragraph>
              }
            />
          </Card>
        )
      },
    },
    {
      title: 'Pinned',
      dataIndex: 'pinned',
      hideInTable: true,
      valueEnum: {
        [SELECT_ALL_VALUE]: '全部',
        [PinnedState.YES]: 'Pinned',
        [PinnedState.NO]: 'UnPinned',
      },
    },
    {
      title: 'code',
      dataIndex: 'code',
      search: false,
      width: 360,
      render: (_, entity) => {
        return (
          <Typography>
            <Typography.Paragraph
              onClick={() => {
                setVisible(true)
                setTemp(entity)
              }}
            >
              {entity.code}
            </Typography.Paragraph>
          </Typography>
        )
      },
    },
    {
      title: '分类',
      search: false,
      width: 50,
      render: (_, entity) => {
        return (
          <Space direction='vertical'>
            {entity.categories.map((tag) => (
              <Tag icon={<TagOutlined />} key={tag.id}>
                {tag.name}
              </Tag>
            ))}
          </Space>
        )
      },
    },
    {
      title: '更新周期',
      width: 230,
      search: false,
      render: (_, { createAt, updateAt }) => {
        return (
          <Space direction='vertical'>
            <span>最早发布：{formatDate(createAt)}</span>
            <span>最后更新：{formatDate(updateAt)}</span>
          </Space>
        )
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 130,
      valueType: 'select',
      fieldProps: {
        options: [
          { label: '全部来源', value: SELECT_ALL_VALUE },
          ...getSelectOptionsByState(publishStates),
        ],
      },
      render: (_, { status: statusProp, ranks: ranksProp, pinned: pinnedProp }) => {
        const status = ps(statusProp!)
        const ranks = rs(ranksProp!)
        const pinned = getPinnedState(pinnedProp)

        return (
          <Space direction='vertical'>
            {[status, ranks, pinned].map((s) => (
              <Tag icon={s.icon} color={s.color} key={s.id}>
                {s.name}
              </Tag>
            ))}
          </Space>
        )
      },
    },
    {
      title: '难度',
      hideInTable: true,
      valueType: 'select',
      dataIndex: 'ranks',
      fieldProps: {
        options: [
          { label: '全部来源', value: SELECT_ALL_VALUE },
          ...getSelectOptionsByState(ranksStates, (item) => (
            <Tag color={item.color}>{item.name}</Tag>
          )),
        ],
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 110,
      render: (_, { id, status, pinned }) => (
        <Space direction='vertical'>
          <Link to={`/snippet/edit/${id}`}>
            <Button size='small' type='text' block icon={<EditOutlined />}>
              片段详情
            </Button>
          </Link>
          {status === PublishState.Draft && (
            <Button
              size='small'
              type='text'
              block
              icon={<CheckOutlined />}
              onClick={() => handlePatchSnippet([id], PublishState.Published)}
            >
              <Typography.Text type='success'>直接发布</Typography.Text>
            </Button>
          )}
          {status === PublishState.Published && (
            <Button
              size='small'
              type='text'
              block
              danger
              icon={<DeleteOutlined />}
              onClick={() => handlePatchSnippet([id], PublishState.Recycle)}
            >
              移回收站
            </Button>
          )}
          {status === PublishState.Recycle && (
            <Button
              size='small'
              type='text'
              block
              icon={<RollbackOutlined />}
              onClick={() => handlePatchSnippet([id], PublishState.Draft)}
            >
              <Typography.Text type='warning'>退至草稿</Typography.Text>
            </Button>
          )}
          <Button
            size='small'
            type='text'
            block
            icon={pinned === PinnedState.NO ? <UngroupOutlined /> : <PushpinOutlined />}
            onClick={() =>
              handlePinnedChange(
                [id],
                pinned === PinnedState.YES ? PinnedState.NO : PinnedState.YES
              )
            }
          >
            {pinned === 1 ? 'UnPinned' : 'Pinned'}
          </Button>
          <Button
            size='small'
            block
            type='link'
            target='_blank'
            icon={<LinkOutlined />}
            href={getBlogSnippetUrl(id)}
          >
            宿主页面
          </Button>
        </Space>
      ),
    },
  ]
  return (
    <>
      <ProTable
        actionRef={actionRef}
        headerTitle='片段列表'
        columns={columns}
        beforeSearchSubmit={omitSelectAllValue}
        request={(params) => querySnippetList(params)}
        toolBarRender={() => [
          <Button type='primary' onClick={() => history.push('/snippet/create')}>
            创建片段
          </Button>,
        ]}
        rowKey='id'
        rowSelection={{
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
          </Space>
        )}
        tableAlertOptionRender={({ selectedRowKeys, onCleanSelected }) => {
          return (
            <Space>
              <Button
                size='small'
                type='text'
                block
                icon={<CheckOutlined />}
                onClick={() => {
                  handlePatchSnippet(
                    selectedRowKeys as number[],
                    PublishState.Published,
                    onCleanSelected
                  )
                }}
              >
                <Typography.Text type='success'>直接发布</Typography.Text>
              </Button>
              <Button
                size='small'
                type='text'
                block
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  handlePatchSnippet(
                    selectedRowKeys as number[],
                    PublishState.Recycle,
                    onCleanSelected
                  )
                }}
              >
                移回收站
              </Button>

              <Button
                size='small'
                type='text'
                block
                icon={<RollbackOutlined />}
                onClick={() => {
                  handlePatchSnippet(
                    selectedRowKeys as number[],
                    PublishState.Draft,
                    onCleanSelected
                  )
                }}
              >
                <Typography.Text type='warning'>退至草稿</Typography.Text>
              </Button>

              <TableDropdown
                onSelect={(key) => {
                  handlePinnedChange(
                    selectedRowKeys as number[],
                    key === 'Pinned' ? PinnedState.YES : PinnedState.NO,
                    onCleanSelected
                  )
                }}
                menus={[
                  { name: 'Pinned', key: 'Pinned' },
                  {
                    name: 'UnPinned',
                    key: 'UnPinned',
                  },
                ]}
              />
            </Space>
          )
        }}
      />

      <Modal
        title={
          <span>
            Code: <strong>{temp?.name}</strong>
          </span>
        }
        footer={false}
        width={1200}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <Typography>
          <Typography.Paragraph>
            <CodeBlock value={genMarkdownString(temp?.code)} />
          </Typography.Paragraph>
        </Typography>
      </Modal>
    </>
  )
}

export default SnippetTable
