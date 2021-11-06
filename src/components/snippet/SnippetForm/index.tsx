import UniversalEditor, { UEditorLanguage } from '@/components/MarkdownEditor'
import { publishStates } from '@/constants/publish'
import { ranksStates } from '@/constants/ranks'
import type { SnippetActionRequest } from '@/services/ant-design-pro/snippet'
import type { API } from '@/services/ant-design-pro/typings'
import { getSelectOptionsByState } from '@/transforms/option'
import ProCard from '@ant-design/pro-card'
import ProForm, { ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Form, Tag } from 'antd'

interface SnippetFormProps {
  onFinish: (data: SnippetActionRequest) => Promise<boolean>
  initialValues?: API.Snippet
}

const SnippetForm = ({ onFinish, initialValues }: SnippetFormProps) => {
  return (
    <ProForm<API.Snippet>
      initialValues={initialValues}
      onFinish={onFinish}
      submitter={{
        submitButtonProps: {
          style: { width: 150 },
        },
        render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
      }}
    >
      <ProCard gutter={24} ghost>
        <ProCard colSpan={16}>
          <ProFormText
            name='name'
            label='名称'
            rules={[{ required: true, message: '请输入名称' }]}
          />
          <ProFormTextArea
            name='description'
            label='描述'
            rules={[{ required: true, message: '请输入描述' }]}
          />
          <Form.Item
            name='code'
            label='code'
            rules={[{ required: true, message: '请输入code' }]}
            style={{ marginBottom: 0 }}
          >
            <UniversalEditor
              style={{ maxHeight: 610, overflow: 'hidden' }}
              formStatus
              language={UEditorLanguage.JavaScript}
            />
          </Form.Item>
        </ProCard>
        <ProCard colSpan={8}>
          <ProFormSelect
            name='ranks'
            label='难度'
            request={async () =>
              getSelectOptionsByState(ranksStates, (s) => (
                <Tag color={s.color} icon={s.icon}>
                  {s.name}
                </Tag>
              ))
            }
            placeholder='难度'
            rules={[{ required: true, message: '请选择难度' }]}
          />
          <ProFormSelect
            name='status'
            label='状态'
            request={async () => getSelectOptionsByState(publishStates)}
            placeholder='状态'
            rules={[{ required: true, message: '请选择状态' }]}
          />
          <Form.Item name='skill' label='技巧' rules={[{ required: true, message: '请输入技巧' }]}>
            <UniversalEditor
              formStatus
              style={{ maxHeight: 300, overflow: 'hidden' }}
              disabledMinimap
            />
          </Form.Item>
          <Form.Item
            name='example'
            label='示例'
            rules={[{ required: true, message: '请输入示例' }]}
            style={{ marginBottom: 0 }}
          >
            <UniversalEditor
              formStatus
              style={{ maxHeight: 300, overflow: 'hidden' }}
              disabledMinimap
            />
          </Form.Item>
        </ProCard>
      </ProCard>
    </ProForm>
  )
}

export default SnippetForm
