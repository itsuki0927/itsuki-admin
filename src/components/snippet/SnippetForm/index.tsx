import UniversalEditor, { UEditorLanguage } from '@/components/MarkdownEditor'
import { publishStates } from '@/constants/publish'
import { ranksStates } from '@/constants/ranks'
import type { SnippetActionRequest } from '@/services/ant-design-pro/snippet'
import type { API } from '@/services/ant-design-pro/typings'
import { getSelectOptionsByState } from '@/transforms/option'
import { EyeOutlined } from '@ant-design/icons'
import ProCard from '@ant-design/pro-card'
import type { ProFormInstance } from '@ant-design/pro-form'
import ProForm, { ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, Form, message, Tag } from 'antd'
import { useRef, useState } from 'react'
import SnippetDrawer from './SnippetDrawer'

interface SnippetFormProps {
  onFinish: (data: SnippetActionRequest) => Promise<boolean>
  initialValues?: API.Snippet
}

const SnippetForm = ({ onFinish, initialValues }: SnippetFormProps) => {
  const [visible, setVisible] = useState(false)
  const [temp, setTemp] = useState<API.Snippet>()
  const formRef = useRef<ProFormInstance>()

  const handlePreview = async () => {
    try {
      const data = await formRef.current?.validateFieldsReturnFormatValue!()
      setVisible(true)
      setTemp({ ...initialValues, ...data } as any)
    } catch (e) {
      message.warn('请输入必填字段')
    }
  }

  return (
    <>
      <ProForm<API.Snippet>
        formRef={formRef}
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
          <ProCard
            colSpan={16}
            title='基本信息'
            headerBordered
            extra={
              <Button type='ghost' size='small' onClick={handlePreview} icon={<EyeOutlined />}>
                预览片段
              </Button>
            }
          >
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
              <UniversalEditor formStatus language={UEditorLanguage.JavaScript} />
            </Form.Item>
          </ProCard>

          <ProCard direction='column' colSpan={8} ghost>
            <ProCard title='设置' headerBordered>
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
                formItemProps={{
                  style: {
                    marginBottom: 0,
                  },
                }}
              />
            </ProCard>

            <ProCard title='技巧' headerBordered style={{ margin: '24px 0' }}>
              <Form.Item
                name='skill'
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: '请输入技巧' }]}
              >
                <UniversalEditor
                  formStatus
                  style={{ maxHeight: 350, overflow: 'hidden' }}
                  disabledMinimap
                />
              </Form.Item>
            </ProCard>

            <ProCard title='示例' headerBordered>
              <Form.Item
                name='example'
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: '请输入示例' }]}
              >
                <UniversalEditor
                  formStatus
                  style={{ maxHeight: 350, overflow: 'hidden' }}
                  disabledMinimap
                  language={UEditorLanguage.JavaScript}
                />
              </Form.Item>
            </ProCard>
          </ProCard>
        </ProCard>
      </ProForm>

      <SnippetDrawer visible={visible} onClose={() => setVisible(false)} data={temp} />
    </>
  )
}

export default SnippetForm
