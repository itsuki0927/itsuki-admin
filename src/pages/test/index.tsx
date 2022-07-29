import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Form, Select } from 'antd';

export default () => {
  return (
    <ProForm
      onFinish={value => {
        console.log(value);
        return Promise.resolve(true);
      }}
    >
      <ProFormText name='input' />

      <Form.Item
        rules={[{ required: true, message: '请输入文章关键字' }]}
        name='keywords'
        // transform={(value) => ({ keywords: value.join('、') })}
        label='关键字'
      >
        <Select mode='tags' />
      </Form.Item>
    </ProForm>
  );
};
