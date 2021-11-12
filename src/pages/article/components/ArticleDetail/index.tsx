import { ArticleOpen } from '@/constants/article/public'
import { useInterval } from '@/hooks'
import type { ArticleActionRequest } from '@/services/ant-design-pro/article'
import type { API } from '@/services/ant-design-pro/typings'
import ProCard from '@ant-design/pro-card'
import type { ProFormInstance } from '@ant-design/pro-form'
import ProForm from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import { message } from 'antd'
import { useRef } from 'react'
import Category from './Category'
import Cover from './Cover'
import Main from './Main'
import Options from './Options'

type ArticleDetailProps = {
  onFinish: (values: ArticleActionRequest) => Promise<boolean>
  onSave?: (values: ArticleActionRequest) => Promise<API.Article>
  initialValues?: API.Article
}

const keys = [
  'title',
  'description',
  'keywords',
  'tagIds',
  'content',
  'categoryIds',
  'banner',
  'publish',
  'origin',
  'open',
] as const

const validateSecretArticle = (values: any) =>
  values.open === ArticleOpen.Password &&
  [...keys, 'password'].every((k) => values[k] !== undefined)

const validatePublicArticle = (values: any) => keys.every((k) => values[k] !== undefined)

const ArticleDetail = ({ onFinish, onSave, initialValues }: ArticleDetailProps) => {
  const formRef = useRef<ProFormInstance>()

  const handleAutoSave = () => {
    if (onSave) {
      const values = formRef.current?.getFieldsValue()
      if (validateSecretArticle(values) || validatePublicArticle(values)) {
        formRef.current?.validateFieldsReturnFormatValue!().then((val) => {
          onSave(val).then(() => {
            message.success('自动保存成功')
          })
        })
      }
    }
  }

  // 30秒自动保存
  useInterval(handleAutoSave, 30 * 1000)

  return (
    <ProForm<ArticleActionRequest>
      formRef={formRef}
      onFinish={onFinish}
      style={{ overflow: 'hidden' }}
      initialValues={initialValues}
      submitter={{
        submitButtonProps: {
          style: { width: 150 },
        },
        render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
      }}
    >
      <ProCard colSpan={{ md: 17 }} ghost gutter={24}>
        <ProCard title='基本信息' headerBordered>
          <Main />
        </ProCard>

        <ProCard colSpan={{ md: 7 }} ghost>
          <Category />
          <Cover />
          <Options />
        </ProCard>
      </ProCard>
    </ProForm>
  )
}

export default ArticleDetail
