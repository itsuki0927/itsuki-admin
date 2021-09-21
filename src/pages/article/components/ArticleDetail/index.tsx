import { articleOrigins } from '@/constants/article/origin'
import { ArticleOpen, articleOpens } from '@/constants/article/public'
import { publishStates } from '@/constants/publish'
import { LinkOutlined, ReloadOutlined } from '@ant-design/icons'
import ProCard from '@ant-design/pro-card'
import ProForm, {
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-form'
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout'
import { Button, Divider, Space } from 'antd'

const buildOptions = (data: any[]) =>
  data.map((item) => ({
    value: item.id,
    label: (
      <Space>
        {item.icon}
        {item.name}
      </Space>
    ),
  }))

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
              transform={(value) => ({ keywords: value.join('、') })}
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
              <ProFormUploadDragger
                name='cover'
                style={{ width: '100%' }}
                max={1}
                fieldProps={{ name: 'file' }}
              />
              <ProFormText
                placeholder='可以直接输入地址'
                name='coverUrl'
                fieldProps={{ prefix: <LinkOutlined /> }}
              />
            </ProCard>
            <ProCard title='发布选项' headerBordered>
              <ProFormSelect
                rules={[{ required: true, message: '请选择发布状态' }]}
                options={buildOptions(publishStates)}
                labelAlign='left'
                label='发布状态'
                name='publish'
              />
              <ProFormSelect
                rules={[{ required: true, message: '请选择文章来源' }]}
                options={buildOptions(articleOrigins)}
                labelAlign='left'
                label='文章来源'
                name='origin'
              />
              <ProFormSelect
                rules={[{ required: true, message: '请选择公开类型' }]}
                options={buildOptions(articleOpens)}
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
                    disabled={open !== ArticleOpen.Password}
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
