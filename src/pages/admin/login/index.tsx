import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-form';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLogin } from '@/hooks/admin';
import type { LoginParams } from '@/entities/admin';
import { setToken } from '@/utils/auth';

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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [state, setState] = useState('');
  const login = useLogin();
  // const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    // const userInfo = await initialState?.fetchUserInfo?.();
    // if (userInfo) {
    //   await setInitialState((s: any) => ({
    //     ...s,
    //     currentUser: userInfo,
    //   }));
    // }
  };

  const handleSubmit = async (input: LoginParams) => {
    setSubmitting(true);
    try {
      // 登录
      const { data } = await login({
        variables: {
          input,
        },
      });
      if (data?.login.state === 'OK') {
        message.success('登陆成功');
        setToken(data.login.token);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        // if (!history) return
        // const { query } = history.location
        // const { redirect } = query as { redirect: string }
        // history.push(redirect || '/')
        console.log('searchParams', searchParams);
        navigate(searchParams.get('redirect') || '/');
        return;
      }
      setState(state);
    } catch (error) {
      console.log('error:', error);
      // 如果失败去设置用户错误信息
      message.error('登陆失败, 请重试! ');
    }
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
