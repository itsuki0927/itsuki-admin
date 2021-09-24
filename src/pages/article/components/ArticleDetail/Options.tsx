import { articleOrigins } from '@/constants/article/origin'
import { ArticleOpen, articleOpens } from '@/constants/article/public'
import { publishStates } from '@/constants/publish'
import ProCard from '@ant-design/pro-card'
import { ProFormDependency, ProFormSelect, ProFormText } from '@ant-design/pro-form'
import { Space } from 'antd'

const buildOptions = (data: any[]) =>
  data.map((item) => ({
    value: item.id,
    label: (
      <Space>
        {item.icon}
        {item.name}
      </Space>
    ),
  }))

const Options = () => {
  return (
    <ProCard title='发布选项' headerBordered>
      <ProFormSelect
        rules={[{ required: true, message: '请选择发布状态' }]}
        options={buildOptions(publishStates)}
        labelAlign='left'
        label='发布状态'
        name='publish'
      />
      <ProFormSelect
        rules={[{ required: true, message: '请选择文章来源' }]}
        options={buildOptions(articleOrigins)}
        labelAlign='left'
        label='文章来源'
        name='origin'
      />
      <ProFormSelect
        rules={[{ required: true, message: '请选择公开类型' }]}
        options={buildOptions(articleOpens)}
        labelAlign='left'
        label='公开类型'
        name='open'
      />
      <ProFormDependency name={['open']}>
        {({ open }) => (
          <ProFormText.Password
            name='password'
            labelAlign='left'
            label='文章密码'
            disabled={open !== ArticleOpen.Password}
          />
        )}
      </ProFormDependency>
    </ProCard>
  )
}

export default Options
