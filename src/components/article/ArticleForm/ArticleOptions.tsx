import { articleBanners } from '@/constants/article/banner'
import { publishStates } from '@/constants/publish'
import { getSelectOptionsByState } from '@/transforms/option'
import ProCard from '@ant-design/pro-card'
import { ProFormSelect } from '@ant-design/pro-form'

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
    </ProCard>
  )
}

export default ArticleOptions
