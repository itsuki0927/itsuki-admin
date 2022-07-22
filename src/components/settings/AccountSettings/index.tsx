import { ImageUploader } from '@/components/common'
import { useUpdateAdmin } from '@/hooks/admin'
import type { AdminSaveRequest } from '@/entities/admin'
import { CheckOutlined } from '@ant-design/icons'
import ProForm, { ProFormText } from '@ant-design/pro-form'
import { Col, Form, message, Row } from 'antd'
import { useModel } from 'umi'

const AccountSettings = () => {
  const { initialState, setInitialState } = useModel('@@initialState')
  const updateAdmin = useUpdateAdmin()

  const handleFinish = async (input: AdminSaveRequest) => {
    await updateAdmin({
      variables: {
        input,
      },
    })
    setInitialState((s) => ({
      ...s,
      currentUser: {
        ...s?.currentUser!,
        ...input,
      },
    }))
    message.success('保存成功')
  }

  return (
    <ProForm<AdminSaveRequest>
      layout='horizontal'
      submitter={{
        searchConfig: {
          submitText: '保存信息',
        },
        submitButtonProps: {
          icon: <CheckOutlined />,
        },
        render: (_, dom) => (
          <Row>
            <Col push={4}>{dom.pop()}</Col>
          </Row>
        ),
      }}
      labelCol={{ span: 4 }}
      initialValues={initialState?.currentUser}
      onFinish={handleFinish}
    >
      <Form.Item
        label='头像'
        name='avatar'
        wrapperCol={{ span: 6 }}
        rules={[{ required: true, message: '请输入昵称' }]}
      >
        <ImageUploader prefix='avatar' disabledMarkdown />
      </Form.Item>
      <ProFormText
        width='lg'
        label='昵称'
        name='nickname'
        rules={[{ required: true, message: '请输入昵称' }]}
      />
      <ProFormText
        width='lg'
        label='签名'
        name='description'
        rules={[{ required: true, message: '请输入签名' }]}
      />
    </ProForm>
  )
}
export default AccountSettings
