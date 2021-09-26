import type { API } from '@/services/ant-design-pro/typings'
import type { ProFormInstance } from '@ant-design/pro-form'
import ProForm, {
  ModalForm,
  ProFormDigit,
  ProFormList,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form'
import { Form, TreeSelect, Typography } from 'antd'
import { useRef } from 'react'

type CategoryModalProps = {
  visible: boolean
  onChange: (visible: boolean) => void
  onFinish: (values: API.Category) => Promise<boolean | void>
  category?: API.Category
  title: string
  tree: any[]
}

const CategoryModal = ({
  title,
  visible,
  onChange,
  category,
  onFinish,
  tree,
}: CategoryModalProps) => {
  const restFormRef = useRef<ProFormInstance>()
  return (
    <ModalForm<API.Category>
      // TODO: 先拿any顶一会
      formRef={restFormRef as any}
      visible={visible}
      title={title}
      onVisibleChange={onChange}
      layout='horizontal'
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      initialValues={category}
      key={category?.id}
      onFinish={(values) =>
        onFinish({ ...category, ...values }).then(() => restFormRef.current?.resetFields())
      }
      modalProps={{
        onCancel: () => restFormRef.current?.resetFields(),
      }}
    >
      {category?.id && (
        <>
          <Form.Item label='ID'>
            <Typography.Text copyable>{category.id}</Typography.Text>
          </Form.Item>
          <Form.Item label='发布于'>{category.createAt}</Form.Item>
          <Form.Item label='最后修改于'>{category.updateAt}</Form.Item>
        </>
      )}
      <ProFormText
        rules={[{ required: true, message: '请输入分类名称' }]}
        label='分类名称'
        name='name'
        placeholder='请输入分类名称'
        extra='这将是它在站点上显示的名字'
      />
      <ProFormText
        rules={[{ required: true, message: '请输入分类路径' }]}
        label='分类路径'
        name='path'
        placeholder='请输入分类路径'
        extra='“别名” 是在 URL 中使用的别称，建议小写，字母、数字、连字符（-）'
      />
      <Form.Item
        rules={[{ required: true, message: '请选择父类' }]}
        name='parentId'
        label='父类'
        extra='可以选择父级名称'
      >
        <TreeSelect
          treeLine
          allowClear
          treeDefaultExpandAll
          placeholder='请选择父类'
          treeData={[
            {
              label: '无',
              key: 'null',
              value: -1,
            },
            ...tree,
          ]}
        />
      </Form.Item>
      <ProFormTextArea
        rules={[{ required: true, message: '请输入分类描述' }]}
        label='分类描述'
        placeholder='请输入分类描述'
        name='description'
      />
      <ProFormDigit
        label='排序'
        extra='在站点中分类出现的顺序'
        name='sort'
        min={0}
        max={100}
        fieldProps={{ precision: 0 }}
      />
      <ProFormList
        copyIconProps={false}
        name='expand'
        label='扩展属性'
        creatorButtonProps={{ creatorButtonText: '增加扩展' }}
      >
        <ProForm.Group>
          <ProFormText name='name' placeholder='name' />
          <ProFormText name='value' placeholder='value' />
        </ProForm.Group>
      </ProFormList>
    </ModalForm>
  )
}

export default CategoryModal
