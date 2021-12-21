import { UniversalEditor } from '@/components/common'
import { UEditorLanguage } from '@/components/common/UniversalEditor'
import { pinnedStates } from '@/constants/pinned'
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
import { Button, Form, message, Space, Tag } from 'antd'
import { useRef, useState } from 'react'
import SnippetDrawer from './SnippetDrawer'
import SnippetTagSelect from './SnippetTagSelect'

interface SnippetFormProps {
  onFinish: (data: SnippetActionRequest) => Promise<boolean>
  request?: () => Promise<API.Snippet>
}

const SnippetForm = ({ onFinish, request }: SnippetFormProps) => {
  const [visible, setVisible] = useState(false)
  const [previewData, setPreviewData] = useState<API.Snippet>()
  const formRef = useRef<ProFormInstance<API.Snippet>>()

  const handlePreview = async () => {
    try {
      const data = await formRef.current?.validateFieldsReturnFormatValue!()
      setVisible(true)
      setPreviewData(data)
    } catch (e) {
      message.warn('请输入必填字段')
    }
  }

  const renderSubmitter = (dom: JSX.Element[]) => {
    return (
      <FooterToolbar>
        <Button type='ghost' onClick={handlePreview} icon={<EyeOutlined />}>
          预览片段
        </Button>
        {dom}
      </FooterToolbar>
    )
  }

  return (
    <>
      <ProForm
        formRef={formRef}
        onFinish={onFinish}
        submitter={{
          submitButtonProps: {
            style: { width: 150 },
          },
          render: (_, dom) => renderSubmitter(dom),
        }}
        validateMessages={{
          required: '此项为必填项',
        }}
        request={request}
      >
        <Space direction='vertical' style={{ width: '100%' }} size={24}>
          <ProCard ghost gutter={24}>
            <ProCard title='基本信息' headerBordered>
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
              <ProFormSelect
                name='pinned'
                label='Pinned'
                request={async () => getSelectOptionsByState(pinnedStates)}
                placeholder='固定'
                rules={[{ required: true, message: '请选择是否固定' }]}
              />
            </ProCard>

            <ProCard ghost>
              <Form.Item name='categoryIds' rules={[{ required: true, message: '请选择标签' }]}>
                <SnippetTagSelect />
              </Form.Item>
            </ProCard>
          </ProCard>

          <ProCard title='内容' headerBordered>
            <Form.Item name='code' rules={[{ required: true, message: '请输入code' }]}>
              <UniversalEditor formStatus key='code' height={500} />
            </Form.Item>
          </ProCard>

          <ProCard title='技巧' headerBordered>
            <Form.Item name='skill' rules={[{ required: true, message: '请输入技巧' }]}>
              <UniversalEditor
                formStatus
                key='skill'
                height={300}
                language={UEditorLanguage.Markdown}
              />
            </Form.Item>
          </ProCard>

          <ProCard title='示例' headerBordered>
            <Form.Item name='example' rules={[{ required: true, message: '请输入示例' }]}>
              <UniversalEditor formStatus key='example' maxRows={20} height={300} />
            </Form.Item>
          </ProCard>
        </Space>
      </ProForm>

      <SnippetDrawer visible={visible} onClose={() => setVisible(false)} data={previewData} />
    </>
  )
}

export default SnippetForm
