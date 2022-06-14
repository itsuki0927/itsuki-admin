import { useBlackList, useUpdateBlackList } from '@/hooks/blacklist'
import type { API } from '@/services/ant-design-pro/typings'
import { CheckOutlined } from '@ant-design/icons'
import ProForm, { ProFormSelect } from '@ant-design/pro-form'
import { Col, message, Row, Spin } from 'antd'

const strToArray = (val: any) => (JSON.parse(val ?? undefined) ?? []) as string[]

const BlackListSettings = () => {
  const [fetchBlackList, { loading, updateQuery }] = useBlackList()
  const [updateBlackList] = useUpdateBlackList()

  const handleUpdateBlackList = async (params: API.Blacklist) => {
    const input = {
      ip: JSON.stringify(params.ip ?? []),
      email: JSON.stringify(params.email ?? []),
      keyword: JSON.stringify(params.keyword ?? []),
    }
    await updateBlackList({ variables: { input } })
    updateQuery(({ blacklist }) => ({
      blacklist: {
        ...blacklist,
        ...params,
      },
    }))
    message.success('保存成功')
    return true
  }

  return (
    <ProForm<API.Blacklist>
      request={async () => {
        const { data } = await fetchBlackList()
        const blacklist = data?.blacklist!
        return {
          ...blacklist,
          ip: strToArray(blacklist.ip),
          keyword: strToArray(blacklist.keyword),
          email: strToArray(blacklist.email),
        }
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
      onFinish={handleUpdateBlackList}
    >
      <Spin spinning={loading}>
        <ProFormSelect width='lg' mode='tags' label='IP 黑名单' name='ip' />
        <ProFormSelect width='lg' mode='tags' label='邮箱 黑名单' name='email' />
        <ProFormSelect width='lg' mode='tags' label='关键字 黑名单' name='keyword' />
      </Spin>
    </ProForm>
  )
}
export default BlackListSettings
