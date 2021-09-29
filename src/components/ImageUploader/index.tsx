import { STATIC_URL } from '@/config'
import { copy } from '@/utils/copy'
import {
  CheckOutlined,
  CopyOutlined,
  FileMarkdownOutlined,
  LinkOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Button, Input, message, notification, Space, Tooltip, Upload } from 'antd'
import { useState } from 'react'
import { request } from 'umi'
import styles from './style.module.less'

const UPLOAD_FILE_SIZE_LIMIT = 3000000

type ImageUploaderProps = {
  value?: string
  onChange?: (value: string) => void
  disabledInput?: boolean
  disabledMarkdown?: boolean
}

const ImageUploader = ({
  value,
  onChange,
  disabledInput,
  disabledMarkdown,
}: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied] = useState(false)

  const beforeUpload = (file: File) => {
    const isImg = ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)

    if (!isImg) {
      message.success('请上传 png、jpeg、jpg 格式的图片')
      return false
    }

    const isLimit = file.size < UPLOAD_FILE_SIZE_LIMIT

    if (!isLimit) {
      message.success('图片大小过大, 请进行压缩')
      return false
    }

    if (file.size <= 1000 * 8) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageBase64 = (e as any).target.result
        onChange?.(imageBase64)
      }
      reader.readAsDataURL(file)
      return false
    }

    return true
  }

  const getMarkdown = (url: string) => `![](${url})`

  const uploadFile = (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    setUploading(true)
    request('/upload/file', {
      method: 'POST',
      data: formData,
    }).then((data) => {
      const imageUrl = `${STATIC_URL}/${data}`
      onChange?.(imageUrl)
      setUploading(false)
      notification.success({
        message: '上传成功',
        description: imageUrl,
      })
    })
  }

  const handleRemove = () => onChange?.('')

  const handleCopy = () => {
    copy(getMarkdown(value ?? ''))
    message.success('复制成功')
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 5000)
  }

  return (
    <Space direction='vertical' className={styles.imageUploader} size={12}>
      <Upload
        name='file'
        listType='picture-card'
        className={styles.uploader}
        maxCount={1}
        beforeUpload={beforeUpload}
        onRemove={handleRemove}
        showUploadList={false}
        disabled={uploading}
        customRequest={(options) => {
          if (options.file) {
            uploadFile(options.file as File)
          }
        }}
      >
        {value ? (
          <img src={value} className={styles.image} />
        ) : (
          <div className={styles.trigger}>
            {uploading ? <LoadingOutlined /> : <PlusOutlined />}
            <p className={styles.uploadText}>{uploading ? 'Uploading' : 'Upload'}</p>
          </div>
        )}
      </Upload>
      {!disabledInput && (
        <Input
          allowClear
          placeholder='可以直接输入地址'
          prefix={<LinkOutlined />}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
      {!disabledMarkdown && value && (
        <Input.Group compact>
          <Input
            readOnly
            style={{ width: 'calc(100% - 32px - 1px)' }}
            placeholder='Markdown image'
            prefix={<FileMarkdownOutlined />}
            value={getMarkdown(value)}
          />
          <Tooltip title='Copy Markdown'>
            <Button
              icon={copied ? <CheckOutlined /> : <CopyOutlined />}
              disabled={copied}
              onClick={handleCopy}
            />
          </Tooltip>
        </Input.Group>
      )}
    </Space>
  )
}

export default ImageUploader
