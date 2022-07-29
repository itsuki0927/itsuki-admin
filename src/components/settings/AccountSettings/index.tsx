import { CheckOutlined } from '@ant-design/icons';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Col, Form, message, Row, Spin } from 'antd';
import { ImageUploader } from '@/components/common';
import type { AdminSaveRequest } from '@/entities/admin';
import { useAdmin } from '@/context';

const AccountSettings = () => {
  const { currentAdmin, updateAdmin } = useAdmin();

  const handleFinish = async (input: AdminSaveRequest) => {
    await updateAdmin?.(input);
    message.success('保存成功');
  };

  if (!currentAdmin) {
    return <Spin />;
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
      initialValues={currentAdmin}
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
  );
};
export default AccountSettings;
