import { useBlackList, useUpdateBlackList } from '@/hooks/blacklist'
import type { API } from '@/services/ant-design-pro/typings'
import { CheckOutlined } from '@ant-design/icons'
import ProForm, { ProFormSelect } from '@ant-design/pro-form'
import { Col, message, Row, Spin } from 'antd'

const convertValue = (value: any) => {
  if (Array.isArray(value)) return value
  return typeof value === 'string' ? JSON.parse(value) : undefined
}

const BaseSettings = () => {
  const [fetchBlackList, { loading, updateQuery }] = useBlackList()
  const [updateBlackList] = useUpdateBlackList()

  return (
    <ProForm<API.Blacklist>
      request={async () => {
        const { data } = await fetchBlackList()
        return data?.blacklist!
      }}
      submitter={{
        searchConfig: {
          submitText: '更新黑名单',
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
      onFinish={async (input) => {
        await updateBlackList({ variables: { input } })
        updateQuery(({ blacklist }) => ({
          blacklist: {
            ...blacklist,
            ...input,
          },
        }))
        message.success('保存成功')
        return true
      }}
    >
      <Spin spinning={loading}>
        <ProFormSelect
          transform={(value) => ({ ip: JSON.stringify(value) })}
          convertValue={convertValue}
          width='lg'
          mode='tags'
          label='IP 黑名单'
          name='ip'
        />
        <ProFormSelect
          transform={(value) => ({ email: JSON.stringify(value) })}
          convertValue={convertValue}
          width='lg'
          mode='tags'
          label='邮箱 黑名单'
          name='email'
        />
        <ProFormSelect
          transform={(value) => ({ keyword: JSON.stringify(value) })}
          convertValue={convertValue}
          width='lg'
          mode='tags'
          label='关键字 黑名单'
          name='keyword'
        />
      </Spin>
    </ProForm>
  )
}
export default BaseSettings
