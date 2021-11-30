import type { TagActionRequest } from '@/services/ant-design-pro/tag'
import type { API } from '@/services/ant-design-pro/typings'
import type { ProFormInstance } from '@ant-design/pro-form'
import ProForm, {
  ModalForm,
  ProFormDigit,
  ProFormList,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form'
import { Form, Typography } from 'antd'
import { useRef } from 'react'

type TagModalProps = {
  visible: boolean
  onChange: (visible: boolean) => void
  onFinish: (values: TagActionRequest) => Promise<boolean | void>
  tag?: API.Tag
  title: string
}

const TagModal = ({ title, visible, onChange, tag, onFinish }: TagModalProps) => {
  const restFormRef = useRef<ProFormInstance<TagActionRequest>>()
  return (
    <ModalForm<TagActionRequest>
      formRef={restFormRef}
      visible={visible}
      title={title}
      onVisibleChange={onChange}
      layout='horizontal'
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      initialValues={tag}
      key={tag?.id}
      onFinish={(values) => onFinish(values).then(() => restFormRef.current?.resetFields())}
      modalProps={{
        onCancel: () => restFormRef.current?.resetFields(),
      }}
    >
      {tag?.id && (
        <>
          <Form.Item label='ID'>
            <Typography.Text copyable>{tag.id}</Typography.Text>
          </Form.Item>
          <Form.Item label='发布于'>{tag.createAt}</Form.Item>
          <Form.Item label='最后修改于'>{tag.updateAt}</Form.Item>
        </>
      )}
      <ProFormText
        rules={[{ required: true, message: '请输入标签名称' }]}
        label='标签名称'
        name='name'
        placeholder='请输入标签名称'
        extra='这将是它在站点上显示的名字'
      />
      <ProFormText
        rules={[{ required: true, message: '请输入标签路径' }]}
        label='标签路径'
        name='path'
        placeholder='请输入标签路径'
        extra='“别名” 是在 URL 中使用的别称，建议小写，字母、数字、连字符（-）'
      />
      <ProFormTextArea
        rules={[{ required: true, message: '请输入标签描述' }]}
        label='标签描述'
        placeholder='请输入标签描述'
        name='description'
      />
      <ProFormDigit
        label='排序'
        extra='在站点中标签出现的顺序'
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

export default TagModal
