import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-form';
import { Alert } from 'antd';
import React, { useState } from 'react';
import type { LoginParams } from '@/entities/admin';
import { useAdmin } from '@/context';

const LoginMessage: React.FC<{ content: string }> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type='error'
    showIcon
  />
);

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAdmin();
  const [state, setState] = useState('');

  const handleSubmit = async (input: LoginParams) => {
    setSubmitting(true);
    const data = await login?.(input);
    setState(data?.login?.state ?? 'NOT_OK');
    setSubmitting(false);
  };

  return (
    <LoginFormPage
      backgroundImageUrl='https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png'
      logo='https://static.itsuki.cn/logo.png'
      title='Itsuki Blog Admin'
      subTitle='Itsuki Blog 博客后台管理系统'
      initialValues={{
        autoLogin: true,
      }}
      submitter={{
        searchConfig: {
          submitText: '登录',
        },
        render: (_, dom) => dom.pop(),
        submitButtonProps: {
          loading: submitting,
          size: 'large',
          block: true,
        },
      }}
      message={state === 'NOT_OK' && <LoginMessage content='账户或密码错误' />}
      onFinish={handleSubmit}
    >
      <ProFormText
        name='username'
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined />,
        }}
        placeholder='用户名'
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]}
      />
      <ProFormText.Password
        name='password'
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined />,
        }}
        placeholder='密码'
        rules={[
          {
            required: true,
            message: '请输入密码！',
          },
        ]}
      />
    </LoginFormPage>
  );
};

export default Login;
