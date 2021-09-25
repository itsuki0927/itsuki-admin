import MarkdownEditor from '@/components/MarkdownEditor'
import ProCard from '@ant-design/pro-card'
import { ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form'
import { Form } from 'antd'
import TagSelect from './Tag'

const Main = () => {
  return (
    <ProCard ghost>
      <ProFormText
        rules={[{ required: true, message: '请输入文章标题' }]}
        name='title'
        label='文章标题'
        tooltip='最长为 24 位'
        placeholder='请输入文章标题'
      />
      <ProFormTextArea
        rules={[{ required: true, message: '请输入文章描述' }]}
        name='description'
        label='文章描述'
        placeholder='请输入文章描述'
      />
      <ProFormSelect
        rules={[{ required: true, message: '请输入文章关键字' }]}
        transform={(value) => ({ keywords: value.join('、') })}
        name='keywords'
        label='关键字'
        mode='tags'
      />
      <TagSelect />
      <Form.Item
        name='content'
        rules={[{ required: true, message: '请输入文章内容' }]}
        label='文章内容'
      >
        <MarkdownEditor />
      </Form.Item>
    </ProCard>
  )
}

export default Main
