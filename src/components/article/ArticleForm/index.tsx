import { ImageUploader, UniversalEditor } from '@/components/common'
import { UEditorLanguage } from '@/components/common/UniversalEditor'
import { articleBanners } from '@/constants/article/banner'
import { publishStates } from '@/constants/publish'
import type { ArticleActionRequest, ArticleDetailResponse } from '@/services/ant-design-pro/article'
import { getSelectOptionsByState } from '@/transforms/option'
import ProCard from '@ant-design/pro-card'
import ProForm, { ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { Form, Space } from 'antd'
import ArticleTagSelect from './ArticleTagSelect'

type ArticleFormProps = {
  onFinish: (values: ArticleActionRequest) => Promise<boolean>
  request?: () => Promise<ArticleDetailResponse>
  cacheID?: string
}

const ArticleForm = ({ onFinish, request, cacheID }: ArticleFormProps) => {
  return (
    <ProForm
      onFinish={onFinish}
      request={request}
      submitter={{
        submitButtonProps: {
          style: { width: 150 },
        },
        render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
      }}
    >
      <Space size={24} direction='vertical' style={{ width: '100%' }}>
        <ProCard ghost gutter={24}>
          <ProCard colSpan={16}>
            <ProFormText
              rules={[{ required: true, message: '请输入文章标题' }]}
              name='title'
              label='文章标题'
              tooltip='最长为 24 位'
              placeholder='请输入文章标题'
            />
            <ProFormText
              rules={[{ required: true, message: '请输入文章路径' }]}
              name='path'
              label='文章路径'
              placeholder='请输入文章路径'
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
            <ProFormSelect
              rules={[{ required: true, message: '请选择是否为轮播图' }]}
              options={getSelectOptionsByState(articleBanners)}
              labelAlign='left'
              label='轮播状态'
              name='banner'
            />
            <ProFormSelect
              rules={[{ required: true, message: '请选择发布状态' }]}
              options={getSelectOptionsByState(publishStates)}
              labelAlign='left'
              label='发布状态'
              name='publish'
            />
          </ProCard>

          <ProCard colSpan={8} ghost>
            <Space size={24} direction='vertical'>
              <ProCard>
                <Form.Item
                  name='tagIds'
                  label='标签'
                  rules={[{ required: true, message: '至少选择一个标签' }]}
                >
                  <ArticleTagSelect />
                </Form.Item>
              </ProCard>
              <ProCard>
                <Form.Item
                  label='缩略图'
                  name='cover'
                  rules={[{ message: '请上传封面', required: true }]}
                >
                  <ImageUploader prefix='article-cover' />
                </Form.Item>
              </ProCard>
            </Space>
          </ProCard>
        </ProCard>

        <ProCard>
          <Form.Item name='content' rules={[{ required: true, message: '请输入文章内容' }]}>
            <UniversalEditor formStatus cacheID={cacheID} language={UEditorLanguage.Markdown} />
          </Form.Item>
        </ProCard>
      </Space>
    </ProForm>
  )
}

export default ArticleForm
