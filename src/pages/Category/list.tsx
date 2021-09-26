import {
  createCategory,
  queryCategoryList,
  removeCategory,
  updateCategory,
} from '@/services/ant-design-pro/category'
import type { API } from '@/services/ant-design-pro/typings'
import { convertToTreeData, getAntdTreeByTree } from '@/transforms/tree.transform'
import compose from '@/utils/compose'
import { DeleteOutlined, EditOutlined, LinkOutlined, ReloadOutlined } from '@ant-design/icons'
import ProCard from '@ant-design/pro-card'
import { PageContainer } from '@ant-design/pro-layout'
import { Button, Divider, Empty, message, Modal, Space, Tree, Typography } from 'antd'
import { useEffect, useState } from 'react'
import CategoryModal from './components/Modal'
import styles from './style.module.less'

const convertToAntdData = compose(getAntdTreeByTree, convertToTreeData)

const CategoryList = () => {
  const [visible, setVisible] = useState(false)
  const [categoryList, setCategoryList] = useState<API.Category[]>([])
  const [loading, setLoading] = useState(false)
  const [temp, setTemp] = useState<API.Category | undefined>()

  const handleReload = () => {
    setLoading(true)
    queryCategoryList().then(({ data }) => {
      setTimeout(() => {
        setLoading(false)
        setCategoryList(data)
      }, 500)
    })
  }

  const handleRemove = (entity: API.Category) => () => {
    Modal.confirm({
      title: `确定删除标签 '${entity.name}'嘛?`,
      content: '删除后不可恢复',
      onOk() {
        removeCategory(entity.id!).then(() => {
          message.success('删除成功')
          handleReload()
        })
      },
    })
  }

  const handleCreate = () => {
    setVisible(true)
    setTemp(undefined)
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

  const handleFinish = (values: API.Category) => {
    return new Promise<string>((resolve) => {
      if (values.expand) {
        // eslint-disable-next-line no-param-reassign
        values.expand = JSON.stringify(values.expand)
      }
      // 有ID 表示更新
      if (values?.id) {
        return updateCategory(values).then(() => resolve('更新成功'))
      }
      return createCategory(values).then(() => resolve('创建成功'))
    }).then((msg) => {
      handleReload()
      message.success(msg)
      setVisible(false)
    })
  }

  useEffect(() => {
    handleReload()
  }, [])

  return (
    <PageContainer>
      <ProCard
        loading={loading}
        className={styles.category}
        title='分类管理'
        headerBordered
        extra={
          <Space>
            <Button type='primary' icon={<EditOutlined />} onClick={handleCreate}>
              创建分类
            </Button>
            <Button icon={<ReloadOutlined />} onClick={handleReload}>
              刷新分类
            </Button>
          </Space>
        }
      >
        {!categoryList.length ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <Tree
            className={styles.tree}
            blockNode
            autoExpandParent
            defaultExpandAll
            showLine
            showIcon={false}
            selectable={false}
            checkable={false}
            treeData={convertToAntdData(categoryList)}
            titleRender={(nodeData) => {
              const category = (nodeData as any).data
              return (
                <div className={styles.categoryNode}>
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
              )
            }}
          />
        )}
        <CategoryModal
          title={temp ? '编辑分类' : '添加分类'}
          category={temp}
          tree={getAntdTreeByTree(convertToTreeData(categoryList), temp?.id)}
          visible={visible}
          onChange={setVisible}
          onFinish={handleFinish}
        />
      </ProCard>
    </PageContainer>
  )
}

export default CategoryList
