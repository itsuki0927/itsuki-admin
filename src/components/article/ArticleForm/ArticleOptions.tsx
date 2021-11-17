import { articleBanners } from '@/constants/article/banner'
import { articleOrigins } from '@/constants/article/origin'
import { ArticleOpen, articleOpens } from '@/constants/article/public'
import { publishStates } from '@/constants/publish'
import { getSelectOptionsByState } from '@/transforms/option'
import ProCard from '@ant-design/pro-card'
import { ProFormDependency, ProFormSelect, ProFormText } from '@ant-design/pro-form'

const ArticleOptions = () => {
  return (
    <ProCard title='发布选项' headerBordered>
      <ProFormSelect
        rules={[{ required: true, message: '请选择是否为轮播图' }]}
        options={getSelectOptionsByState(articleBanners)}
        labelAlign='left'
        label='轮播状态'
        name='banner'
      />
      <ProFormSelect
        fieldProps={{
          onChange: (value) => {
            console.log('value:', value)
          },
        }}
        rules={[{ required: true, message: '请选择发布状态' }]}
        options={getSelectOptionsByState(publishStates)}
        labelAlign='left'
        label='发布状态'
        name='publish'
      />
      <ProFormSelect
        rules={[{ required: true, message: '请选择文章来源' }]}
        options={getSelectOptionsByState(articleOrigins)}
        labelAlign='left'
        label='文章来源'
        name='origin'
      />
      <ProFormSelect
        rules={[{ required: true, message: '请选择公开类型' }]}
        options={getSelectOptionsByState(articleOpens)}
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
            rules={
              open === ArticleOpen.Password
                ? [{ required: true, message: '请输入文章密码' }]
                : undefined
            }
            disabled={open !== ArticleOpen.Password}
          />
        )}
      </ProFormDependency>
    </ProCard>
  )
}

export default ArticleOptions
