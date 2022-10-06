import ProCard from '@ant-design/pro-card';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { FooterToolbar } from '@ant-design/pro-layout';
import { Form, Space } from 'antd';
import { ImageUploader, UniversalEditor } from '@/components/common';
import { UEditorLanguage } from '@/components/common/UniversalEditor';
import { blogBanners } from '@/constants/blog/banner';
import { publishStates } from '@/constants/publish';
import type { BlogActionRequest, BlogDetailResponse } from '@/entities/blog';
import { getSelectOptionsByState } from '@/transforms/option';
import BlogTagSelect from './BlogTagSelect';
import { cardStyles } from '@/constants/cardStyle';

type BlogFormProps = {
  onFinish: (values: BlogActionRequest) => Promise<boolean>;
  request?: () => Promise<BlogDetailResponse>;
  cacheID?: string;
};

const BlogForm = ({ onFinish, request, cacheID }: BlogFormProps) => {
  const [form] = Form.useForm<BlogActionRequest>();
  const getUploadPrefix = () => `/blog/${form.getFieldValue('path')}`;
  return (
    <ProForm
      form={form}
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
              fieldProps={{
                addonBefore: 'https://itsuki.cn/blog/',
              }}
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
              transform={value => ({ keywords: value.join('、') })}
              name='keywords'
              label='关键字'
              mode='tags'
            />
            <ProFormSelect
              rules={[{ required: true, message: '请选择是否为轮播图' }]}
              options={getSelectOptionsByState(blogBanners)}
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
            <ProFormSelect
              options={getSelectOptionsByState(cardStyles)}
              labelAlign='left'
              label='卡片风格'
              name='cardStyle'
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
                  <BlogTagSelect />
                </Form.Item>
              </ProCard>
              <ProCard>
                <Form.Item
                  label='缩略图'
                  name='cover'
                  rules={[{ message: '请上传封面', required: true }]}
                >
                  <ImageUploader getPrefix={getUploadPrefix} />
                </Form.Item>
              </ProCard>
            </Space>
          </ProCard>
        </ProCard>

        <ProCard>
          <Form.Item
            name='content'
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <UniversalEditor
              getUploadPrefix={getUploadPrefix}
              formStatus
              cacheID={cacheID}
              language={UEditorLanguage.Markdown}
            />
          </Form.Item>
        </ProCard>
      </Space>
    </ProForm>
  );
};

export default BlogForm;
