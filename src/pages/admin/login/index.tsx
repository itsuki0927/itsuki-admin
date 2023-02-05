import { GithubOutlined, GoogleCircleFilled } from '@ant-design/icons';
import { LoginFormPage } from '@ant-design/pro-form';
import { Alert, Button, Col, Row } from 'antd';
import React, { useState } from 'react';
import { useAdmin } from '@/context';
import { LoginType } from '@/entities/admin';

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
  const [state, setState] = useState(false);

  const handleSubmit = async (type: LoginType) => {
    setSubmitting(true);
    const data = await login?.(type);
    setState(data?.isLogin ?? false);
    setSubmitting(false);
  };

  return (
    <LoginFormPage
      backgroundImageUrl='https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png'
      logo='https://static.itsuki.cn/logo.png'
      title='Itsuki Blog Admin'
      subTitle='Itsuki Blog 博客后台管理系统'
      submitter={false}
      actions={
        <Row gutter={24}>
          <Col span={12}>
            <Button
              style={{ width: '100%' }}
              disabled={submitting}
              icon={<GoogleCircleFilled />}
              onClick={() => handleSubmit('google')}
            />
          </Col>
          <Col span={12}>
            <Button
              style={{ width: '100%' }}
              disabled={submitting}
              icon={<GithubOutlined />}
              onClick={() => handleSubmit('github')}
            />
          </Col>
        </Row>
      }
      message={state && <LoginMessage content='账户或密码错误' />}
    />
  );
};

export default Login;
