import { login } from '@/services/ant-design-pro/admin'
import { setToken } from '@/utils/auth'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import ProForm, { ProFormText } from '@ant-design/pro-form'
import { Alert, message } from 'antd'
import React, { useState } from 'react'
import { history, Link, useModel } from 'umi'
import styles from './index.less'

const LoginMessage: React.FC<{ content: string }> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type='error'
    showIcon
  />
)

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false)
  const [state, setState] = useState('')
  const { initialState, setInitialState } = useModel('@@initialState')

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.()
    console.log('userInfo:', userInfo)
    if (userInfo) {
      await setInitialState((s: any) => ({
        ...s,
        currentUser: userInfo,
      }))
    }
  }

  const handleSubmit = async (values: any) => {
    setSubmitting(true)
    try {
      // 登录
      const { status, token } = await login({ ...values })
      if (status === 'OK') {
        message.success('登陆成功')
        setToken(token)
        await fetchUserInfo()
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return
        const { query } = history.location
        const { redirect } = query as { redirect: string }
        history.push(redirect || '/')
        return
      }
      setState(status)
    } catch (error) {
      console.log('error:', error)
      // 如果失败去设置用户错误信息
      message.error('登陆失败, 请重试! ')
    }
    setSubmitting(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to='/'>
              <img alt='logo' className={styles.logo} src='/logo.svg' />
              <span className={styles.title}>博客后台管理系统</span>
            </Link>
          </div>
          <div className={styles.desc}>博客后台管理系统</div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: '登录',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                block: true,
              },
            }}
            onFinish={async (values) => {
              await handleSubmit(values as any)
            }}
          >
            {state === 'NOT_OK' && <LoginMessage content={'账户或密码错误(admin/ant.design)'} />}
            <ProFormText
              name='username'
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              initialValue='itsuki'
              placeholder='用户名'
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name='password'
              initialValue='123456'
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder='密码'
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </ProForm>
        </div>
      </div>
    </div>
  )
}

export default Login
