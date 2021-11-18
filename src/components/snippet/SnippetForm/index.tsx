import UniversalEditor, { UEditorLanguage } from '@/components/common/UniversalEditor'
import { publishStates } from '@/constants/publish'
import { ranksStates } from '@/constants/ranks'
import type { SnippetActionRequest } from '@/services/ant-design-pro/snippet'
import type { API } from '@/services/ant-design-pro/typings'
import { getSelectOptionsByState } from '@/transforms/option'
import { EyeOutlined } from '@ant-design/icons'
import ProCard from '@ant-design/pro-card'
import type { ProFormInstance } from '@ant-design/pro-form'
import { ProFormSelect, ProFormText, ProFormTextArea, StepsForm } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Button, Form, message, Tag } from 'antd'
import { useEffect, useRef, useState } from 'react'
import SnippetDrawer from './SnippetDrawer'
import SnippetTagSelect from './SnippetTagSelect'

interface SnippetFormProps {
  onFinish: (data: SnippetActionRequest) => Promise<boolean>
  initialValues?: API.Snippet
}

const SnippetForm = ({ onFinish, initialValues }: SnippetFormProps) => {
  const formMapRef = useRef<React.MutableRefObject<ProFormInstance<any> | undefined>[]>([])
  const [visible, setVisible] = useState(false)
  const [temp, setTemp] = useState<API.Snippet>()
  const formRef = useRef<ProFormInstance>()

  useEffect(() => {
    formMapRef.current.forEach((formInstanceRef) => {
      formInstanceRef.current?.setFieldsValue(initialValues)
    })
  }, [initialValues])

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
      <StepsForm
        formMapRef={formMapRef}
        formRef={formRef}
        onFinish={onFinish}
        containerStyle={{ width: '100%' }}
        submitter={{
          submitButtonProps: {
            style: { width: 150 },
          },
          render: ({ step }, dom) => (
            <FooterToolbar>
              {step === 3 && (
                <Button type='ghost' onClick={handlePreview} icon={<EyeOutlined />}>
                  预览片段
                </Button>
              )}
              {dom}
            </FooterToolbar>
          ),
        }}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
      >
        <StepsForm.StepForm title='基本信息'>
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
          </ProCard>
        </StepsForm.StepForm>

        <StepsForm.StepForm title='内容'>
          <ProCard title='内容' headerBordered>
            <Form.Item name='code' rules={[{ required: true, message: '请输入code' }]}>
              <UniversalEditor key='code' formStatus language={UEditorLanguage.JavaScript} />
            </Form.Item>
          </ProCard>
        </StepsForm.StepForm>

        <StepsForm.StepForm title='分类'>
          <ProCard ghost>
            <Form.Item name='categoryIds'>
              <SnippetTagSelect />
            </Form.Item>
          </ProCard>
        </StepsForm.StepForm>

        <StepsForm.StepForm title='其他设置'>
          <ProCard title='技巧' headerBordered style={{ marginBottom: 24 }}>
            <Form.Item name='skill' rules={[{ required: true, message: '请输入技巧' }]}>
              <UniversalEditor
                formStatus
                style={{ maxHeight: 400, overflow: 'hidden' }}
                key='skill'
                disabledMinimap
              />
            </Form.Item>
          </ProCard>
          <ProCard title='示例' headerBordered>
            <Form.Item name='example' rules={[{ required: true, message: '请输入示例' }]}>
              <UniversalEditor
                formStatus
                style={{ maxHeight: 400, overflow: 'hidden' }}
                disabledMinimap
                key='example'
                language={UEditorLanguage.JavaScript}
              />
            </Form.Item>
          </ProCard>
        </StepsForm.StepForm>
      </StepsForm>

      <SnippetDrawer visible={visible} onClose={() => setVisible(false)} data={temp} />
    </>
  )
}

export default SnippetForm
