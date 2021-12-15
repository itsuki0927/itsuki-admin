import { querySystemSettings, saveSystemSettings } from '@/services/ant-design-pro/settings'
import type { API } from '@/services/ant-design-pro/typings'
import { CheckOutlined, HeartOutlined } from '@ant-design/icons'
import ProCard from '@ant-design/pro-card'
import ProForm, { ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form'
import { Col, Form, message, Row, Spin } from 'antd'
import { useRequest } from 'umi'

const BaseSettings = () => {
  const { data, loading } = useRequest(() =>
    querySystemSettings().then((temp) => {
      temp.keywordsList = temp.keywords.split(',')
      return { data: temp }
    })
  )

  if (loading) {
    return (
      <ProCard>
        <Spin />
      </ProCard>
    )
  }

  return (
    <ProForm<API.SystemSettings>
      initialValues={data}
      submitter={{
        searchConfig: {
          submitText: '保存设置',
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
      layout='horizontal'
      onFinish={(values) => {
        const params = { ...data, ...values }
        params.keywords = params.keywordsList.join(',')
        return saveSystemSettings(params).then(() => {
          message.success('保存成功')
          return true
        })
      }}
    >
      <Form.Item label={<HeartOutlined />} name='liking'>
        {data?.liking ?? '-'} 次
      </Form.Item>
      <ProFormText
        width='lg'
        label='站点标题'
        name='title'
        rules={[{ required: true, message: '请输入站点标题' }]}
      />
      <ProFormText
        width='lg'
        label='副标题'
        name='subtitle'
        rules={[{ required: true, message: '请输入副标题' }]}
      />
      <ProFormTextArea
        width='lg'
        label='站点描述'
        name='description'
        rules={[{ required: true, message: '请输入站点描述' }]}
      />
      <ProFormSelect
        width='lg'
        mode='tags'
        label='关键词'
        name='keywordsList'
        rules={[{ required: true, message: '请输入关键词' }]}
      />
      <ProFormText
        width='lg'
        label='站点地址'
        name='domain'
        rules={[{ required: true, message: '请输入站点地址' }]}
      />
      <ProFormText
        width='lg'
        label='站点邮箱'
        name='email'
        rules={[{ required: true, message: '请输入站点邮箱' }]}
      />
      <ProFormText width='lg' label='ICP 备案号' name='record' />
      <ProFormSelect width='lg' mode='tags' label='IP 黑名单' name='ipBlackList' />
      <ProFormSelect width='lg' mode='tags' label='邮箱 黑名单' name='emailBlackList' />
      <ProFormSelect width='lg' mode='tags' label='关键字 黑名单' name='keywordBlackList' />
    </ProForm>
  )
}
export default BaseSettings
