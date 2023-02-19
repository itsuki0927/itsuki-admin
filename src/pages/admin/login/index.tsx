import { Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useAdmin } from '@/context';

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAdmin();
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    setSubmitting(true);
    await login?.(password);
    setSubmitting(false);
  };

  return (
    <Modal open title='请输入密码' footer={false} closable={false} centered>
      <Input.Password
        style={{ marginTop: 24 }}
        disabled={submitting}
        value={password}
        onChange={e => setPassword(e.target.value)}
        size='large'
        onPressEnter={() => {
          console.log('handle enter');
          handleSubmit();
        }}
      />
    </Modal>
  );
};

export default Login;
