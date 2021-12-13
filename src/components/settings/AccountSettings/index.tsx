import { ImageUploader } from '@/components/common'
import type { AdminSaveRequest, AdminUpdatePasswordRequest } from '@/services/ant-design-pro/admin'
import { saveAdminInfo, updateAdminPassword } from '@/services/ant-design-pro/admin'
import { removeToken } from '@/utils/auth'
import { CheckOutlined } from '@ant-design/icons'
import type { ProFormInstance } from '@ant-design/pro-form'
import ProForm, { ProFormText } from '@ant-design/pro-form'
import { Col, Divider, Form, message, notification, Row } from 'antd'
import { useRef } from 'react'
import { history, useModel } from 'umi'

const AccountSettings = () => {
  const { initialState, setInitialState } = useModel('@@initialState')
  const formRef = useRef<ProFormInstance<AdminUpdatePasswordRequest>>()

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
      initialState?.fetchUserInfo?.().then((currentUser) => {
        setInitialState((s) => ({ ...s, currentUser }))
        message.success('保存成功')
      })
    })
  }

  const handleUpdatePassword = (values: AdminUpdatePasswordRequest) => {
    return updateAdminPassword({ ...initialState?.currentUser, ...values }).then(() => {
      notification.info({
        message: '修改了新密码，即将跳转到登录页...',
      })
      setTimeout(() => {
        removeToken()
        history.push('/user/login')
        location.reload()
      }, 1680)
    })
  }

  return (
    <div>
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
      <Divider />
      <ProForm<AdminUpdatePasswordRequest>
        formRef={formRef}
        layout='horizontal'
        submitter={{
          searchConfig: {
            submitText: '更新密码',
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
        onFinish={handleUpdatePassword}
      >
        <ProFormText.Password
          width='lg'
          label='密码'
          name='password'
          rules={[
            { message: '确认新旧密码一致且有效', validator: validatePassword },
            { message: '请输入密码', required: true },
          ]}
        />
        <ProFormText.Password
          width='lg'
          label='新密码'
          name='newPassword'
          rules={[
            { message: '确认新旧密码一致且有效', validator: validatePassword },
            { message: '请输入新密码', required: true },
          ]}
        />
        <ProFormText.Password
          width='lg'
          label='确认新密码'
          name='confirm'
          rules={[
            { message: '确认新旧密码一致且有效', validator: validatePassword },
            { message: '请确认新密码', required: true },
          ]}
        />
      </ProForm>
    </div>
  )
}
export default AccountSettings
