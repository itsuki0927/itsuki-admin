import { CategoryModal } from '@/components/category'
import { Container } from '@/components/common'
import type { CategoryActionInput } from '@/graphql/category'
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useSyncCategoryCount,
  useUpdateCategory,
} from '@/hooks/category'
import type { API } from '@/services/ant-design-pro/typings'
import { getBlogCategoryUrl } from '@/transforms/url'
import {
  DeleteOutlined,
  EditOutlined,
  LinkOutlined,
  ReloadOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import ProCard from '@ant-design/pro-card'
import { Button, Divider, Empty, message, Modal, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import styles from './index.less'

const ArticleCategoryList = () => {
  const [visible, setVisible] = useState(false)
  const [temp, setTemp] = useState<API.Category | undefined>()
  const [loading, setLoading] = useState(false)
  const { fetchCategory, updateQuery, refetch, data } = useCategories()
  const createCategory = useCreateCategory()
  const deleteCategory = useDeleteCategory()
  const syncCategoryCount = useSyncCategoryCount()
  const updateCategory = useUpdateCategory()

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      await fetchCategory()
      setLoading(false)
    }
    fetch()
  }, [fetchCategory])

  const handleRemove = (entity: API.Category) => () => {
    Modal.confirm({
      title: (
        <p>
          确定删除分类: <strong style={{ color: '#ff4d4f' }}>{entity.name}</strong> 嘛?
        </p>
      ),
      content: '请不要轻易删除分类!!!',
      okType: 'danger',
      onOk() {
        setLoading(true)
        deleteCategory({
          variables: {
            id: entity.id,
          },
        }).then(() => {
          updateQuery((prevData) => ({
            categories: prevData.categories.filter((v) => v.id !== entity.id),
          }))
          message.success('删除成功')
          setLoading(false)
        })
      },
    })
  }

  const handleCreate = () => {
    setVisible(true)
    setTemp(undefined)
  }

  const reset = (msg: string) => {
    setTemp(undefined)
    setVisible(false)
    message.success(msg)
  }

  const handleUpdate =
    ({ expand, ...rest }: API.Category) =>
    () => {
      setVisible(true)
      if (expand) {
        // eslint-disable-next-line no-param-reassign
        expand = JSON.parse(expand)
      }
      setTemp({ ...rest, expand })
    }

  const confirmUpdate = async (input: CategoryActionInput) => {
    if (input.expand) {
      // eslint-disable-next-line no-param-reassign
      input.expand = JSON.stringify(input.expand)
    }
    if (temp?.id) {
      // 有ID 表示更新
      await updateCategory({
        variables: {
          id: temp.id,
          input,
        },
      })
      updateQuery((prevData) => ({
        categories: prevData.categories.map((item) => {
          if (item.id === temp.id) {
            return { ...item, ...input }
          }
          return item
        }),
      }))
      reset('更新成功')
    }
  }

  const confirmCreate = async (input: CategoryActionInput) => {
    if (input.expand) {
      // eslint-disable-next-line no-param-reassign
      input.expand = JSON.stringify(input.expand)
    }

    await createCategory({
      variables: {
        input,
      },
    })
    reset('创建成功')
  }

  const handleSyncCount = () => {
    setLoading(true)
    syncCategoryCount().then(async () => {
      await refetch()
      setLoading(false)
      message.success('同步成功')
    })
  }

  return (
    <Container>
      <ProCard
        loading={loading}
        className={styles.category}
        title='分类管理'
        headerBordered
        extra={
          <Space>
            <Button size='small' key='sync' icon={<SyncOutlined />} onClick={handleSyncCount}>
              同步数量
            </Button>
            <Button
              size='small'
              key='refresh'
              icon={<ReloadOutlined />}
              onClick={async () => {
                setLoading(true)
                await refetch()
                setLoading(false)
              }}
            >
              刷新分类
            </Button>
            <Button
              size='small'
              key='create'
              type='primary'
              icon={<EditOutlined />}
              onClick={handleCreate}
            >
              创建分类
            </Button>
          </Space>
        }
      >
        {!data?.categories.length ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <ProCard ghost loading={loading}>
            {data.categories.map((category) => (
              <div key={category.id} className={styles.categoryNode}>
                <div className={styles.content}>
                  <Space className={styles.title}>
                    <Typography.Text strong={true}>{category.name}</Typography.Text>
                    <Divider type='vertical' />
                    <Typography.Text type='secondary'>{category.path}</Typography.Text>
                    <Divider type='vertical' />
                    <Typography.Text type='secondary'>{category.count} 篇</Typography.Text>
                  </Space>
                  <div>
                    <Typography.Text type='secondary'>
                      {category.description || '-'}
                    </Typography.Text>
                  </div>
                </div>
                <div>
                  <Button
                    size='small'
                    type='text'
                    icon={<EditOutlined />}
                    onClick={handleUpdate(category)}
                  >
                    编辑
                  </Button>
                  <Divider type='vertical' />
                  <Button
                    size='small'
                    type='text'
                    danger={true}
                    icon={<DeleteOutlined />}
                    onClick={handleRemove(category)}
                  >
                    删除
                  </Button>
                  <Divider type='vertical' />
                  <Button
                    size='small'
                    icon={<LinkOutlined />}
                    href={getBlogCategoryUrl(category.path)}
                    type='link'
                    target='_blank'
                  >
                    查看
                  </Button>
                </div>
              </div>
            ))}
          </ProCard>
        )}
        <CategoryModal
          title={temp ? '编辑分类' : '添加分类'}
          category={temp}
          visible={visible}
          onChange={setVisible}
          onFinish={(values) => (temp?.id ? confirmUpdate(values) : confirmCreate(values))}
        />
      </ProCard>
    </Container>
  )
}

export default ArticleCategoryList
