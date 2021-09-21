import ProForm, {
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form'

import { LinkOutlined, ReloadOutlined } from '@ant-design/icons'
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout'
import ProCard from '@ant-design/pro-card'
import { Button, Divider } from 'antd'

type ArticleDetailProps = {
  onFinish: (values: any) => Promise<boolean>
}

const ArticleDetail = ({ onFinish }: ArticleDetailProps) => {
  return (
    <PageContainer>
      <ProForm<API.Article>
        onFinish={onFinish}
        initialValues={{
          status: 1,
        }}
        submitter={{
          submitButtonProps: {
            style: { width: 150 },
          },
          render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
        }}
      >
        <ProCard ghost gutter={8}>
          <ProCard title='创建文章' headerBordered>
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
              name='keywords'
              label='关键字'
              mode='tags'
            />
            <ProFormTextArea
              rules={[{ required: true, message: '请输入文章内容' }]}
              name='content'
              label='文章内容'
              placeholder='请输入文章内容'
            />
          </ProCard>

          <ProCard colSpan='30%' ghost direction='column' gutter={16}>
            <ProCard title='分类目录' headerBordered>
              分类目录
              <Divider style={{ margin: '12px 0' }} />
              <Button icon={<ReloadOutlined />} type='dashed' size='small'>
                刷新列表
              </Button>
            </ProCard>
            <ProCard title='文章封面' headerBordered style={{ margin: '16px 0' }}>
              <ProFormUploadButton
                name='cover'
                style={{ width: '100%' }}
                max={1}
                fieldProps={{
                  name: 'file',
                  listType: 'picture-card',
                  style: {
                    width: '100%',
                  },
                }}
              />
              <ProFormText
                placeholder='可以直接输入地址'
                fieldProps={{
                  prefix: <LinkOutlined />,
                }}
              />
            </ProCard>
            <ProCard title='发布选项' headerBordered>
              <ProFormSelect
                rules={[{ required: true, message: '请选择发布状态' }]}
                options={[
                  { label: '草稿', value: 0 },
                  { label: '发布', value: 1 },
                  { label: '回收站', value: 2 },
                ]}
                labelAlign='left'
                label='发布状态'
                name='publishType'
              />
              <ProFormSelect
                rules={[{ required: true, message: '请选择文章来源' }]}
                options={[
                  { label: '原创', value: 0 },
                  { label: '装载', value: 1 },
                  { label: '混合', value: 2 },
                ]}
                labelAlign='left'
                label='文章来源'
                name='resourceType'
              />
              <ProFormSelect
                rules={[{ required: true, message: '请选择公开类型' }]}
                options={[
                  { label: '公开', value: 0 },
                  { label: '私密', value: 1 },
                  { label: '需密码', value: 2 },
                ]}
                labelAlign='left'
                label='公开类型'
                name='publicType'
              />
              <ProFormDependency name={['publicType']}>
                {({ publicType }) => (
                  <ProFormText.Password
                    labelAlign='left'
                    label='文章密码'
                    disabled={publicType !== 2}
                  />
                )}
              </ProFormDependency>
            </ProCard>
          </ProCard>
        </ProCard>
      </ProForm>
    </PageContainer>
  )
}

export default ArticleDetail
