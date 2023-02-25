import { Input, InputRef, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useAdmin } from '@/context';

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAdmin();
  const [password, setPassword] = useState('');
  const inputRef = useRef<InputRef>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    await login?.(password);
    setSubmitting(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Modal open footer={false} closable={false} centered>
      <Input.Password
        ref={inputRef}
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
