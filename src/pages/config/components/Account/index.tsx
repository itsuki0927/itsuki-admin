import ImageUploader from '@/components/ImageUploader'
import type { AdminSaveRequest } from '@/services/ant-design-pro/admin'
import { saveAdminInfo } from '@/services/ant-design-pro/admin'
import { removeToken } from '@/utils/auth'
import { CheckOutlined } from '@ant-design/icons'
import type { ProFormInstance } from '@ant-design/pro-form'
import ProForm, { ProFormText } from '@ant-design/pro-form'
import { Col, Divider, Form, message, notification, Row } from 'antd'
import { useRef } from 'react'
import { history, useModel } from 'umi'

const BasicView = () => {
  const { initialState } = useModel('@@initialState')
  const formRef = useRef<ProFormInstance<AdminSaveRequest>>()

  // 验证重复输入密码
  const validatePassword = async () => {
    const password = formRef.current?.getFieldValue('password')
    const newPassword = formRef.current?.getFieldValue('newPassword')
    const confirm = formRef.current?.getFieldValue('confirm')
    if (!password && !newPassword && !confirm) {
      return
    }
    if (newPassword !== confirm || password === newPassword) {
      throw new Error()
    }
  }

  const handleFinish = (values: AdminSaveRequest) => {
    return saveAdminInfo({ ...initialState?.currentUser, ...values }).then(() => {
      if (values.newPassword && values.password && values.confirm) {
        notification.info({
          message: '修改了新密码，即将跳转到登录页...',
        })
        setTimeout(() => {
          removeToken()
          history.push('/user/login')
          location.reload()
        }, 1680)
      } else {
        initialState?.fetchUserInfo?.().then(() => {
          message.success('保存成功')
        })
      }
    })
  }

  return (
    <ProForm<AdminSaveRequest>
      formRef={formRef}
      layout='horizontal'
      submitter={{
        searchConfig: {
          submitText: '保存',
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
        <ImageUploader disabledMarkdown />
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

      <Divider />

      <ProFormText.Password
        width='lg'
        label='密码'
        name='password'
        rules={[{ message: '确认新旧密码一致且有效', validator: validatePassword }]}
      />
      <ProFormText.Password
        width='lg'
        label='新密码'
        name='newPassword'
        rules={[{ message: '确认新旧密码一致且有效', validator: validatePassword }]}
      />
      <ProFormText.Password
        width='lg'
        label='确认新密码'
        name='confirm'
        rules={[{ message: '确认新旧密码一致且有效', validator: validatePassword }]}
      />
    </ProForm>
  )
}
export default BasicView
