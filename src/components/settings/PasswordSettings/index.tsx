import { CheckOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Col, notification, Row } from 'antd';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '@/utils/auth';
import type { AdminUpdatePasswordRequest } from '@/entities/admin';
import { useUpdateAdminPassword } from '@/hooks/admin';

const PasswordSettings = () => {
  const formRef = useRef<ProFormInstance<AdminUpdatePasswordRequest>>();
  const history = useNavigate();
  const updateAdminPassword = useUpdateAdminPassword();

  // 验证重复输入密码
  const validatePassword = async () => {
    const password = formRef.current?.getFieldValue('password');
    const newPassword = formRef.current?.getFieldValue('newPassword');
    const confirm = formRef.current?.getFieldValue('confirm');
    if (!password && !newPassword && !confirm) {
      return;
    }
    if (newPassword !== confirm || password === newPassword) {
      throw new Error();
    }
  };

  const handleUpdatePassword = async (input: AdminUpdatePasswordRequest) => {
    await updateAdminPassword({ variables: { input } });
    notification.info({
      message: '修改了新密码，即将跳转到登录页...',
    });
    setTimeout(() => {
      removeToken();
      history('/user/login');
      window.location.reload();
    }, 1680);
  };

  return (
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
  );
};
export default PasswordSettings;
