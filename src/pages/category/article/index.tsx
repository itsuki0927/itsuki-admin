import { CategoryModal } from '@/components/category'
import { Container } from '@/components/common'
import type {
  QueryCategoryResponse,
  CreateCategoryResponse,
  CategoryActionInput,
  UpdateCategoryResponse,
  CreateCategoryInput,
  UpdateCategoryInput,
} from '@/graphql/category'
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  QUERY_CATEGORY,
  UPDATE_CATEGORY,
} from '@/graphql/category'
import type { ID } from '@/helper/http.interface'
import type { API } from '@/services/ant-design-pro/typings'
import { DeleteOutlined, EditOutlined, LinkOutlined, ReloadOutlined } from '@ant-design/icons'
import ProCard from '@ant-design/pro-card'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Divider, Empty, message, Modal, Space, Typography } from 'antd'
import { useState } from 'react'
import styles from './index.less'

const ArticleCategoryList = () => {
  const [visible, setVisible] = useState(false)
  const [temp, setTemp] = useState<API.Category | undefined>()
  const { data, loading, updateQuery, refetch } = useQuery<QueryCategoryResponse>(QUERY_CATEGORY)
  const [createCategory] = useMutation<CreateCategoryResponse, CreateCategoryInput>(CREATE_CATEGORY)
  const [updateCategory] = useMutation<UpdateCategoryResponse, UpdateCategoryInput>(UPDATE_CATEGORY)
  const [deleteCategory] = useMutation<number, ID>(DELETE_CATEGORY)

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
        deleteCategory({
          variables: {
            id: entity.id,
          },
        }).then(() => {
          updateQuery((prevData) => ({
            categories: prevData.categories.filter((v) => v.id !== entity.id),
          }))
          message.success('删除成功')
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
    // 有ID 表示更新
    await updateCategory({
      variables: {
        id: temp?.id!,
        input,
      },
    })
    updateQuery((prevData) => ({
      categories: prevData.categories.map((item) => {
        if (item.id === temp?.id) {
          return { ...item, ...input }
        }
        return item
      }),
    }))
    reset('更新成功')
  }

  const confirmCreate = async (input: CategoryActionInput) => {
    if (input.expand) {
      // eslint-disable-next-line no-param-reassign
      input.expand = JSON.stringify(input.expand)
    }
    console.log('input', input)

    const { data: newData } = await createCategory({
      variables: {
        input,
      },
    })
    updateQuery((prevData) => ({
      categories: prevData.categories.concat(newData?.createCategory!),
    }))
    reset('创建成功')
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
            <Button key='create' type='primary' icon={<EditOutlined />} onClick={handleCreate}>
              创建分类
            </Button>
            <Button key='refresh' icon={<ReloadOutlined />} onClick={() => refetch()}>
              刷新分类
            </Button>
          </Space>
        }
      >
        {!data?.categories.length ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <div>
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
                  <Button size='small' icon={<LinkOutlined />} type='link' target='_blank'>
                    查看
                  </Button>
                </div>
              </div>
            ))}
          </div>
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
