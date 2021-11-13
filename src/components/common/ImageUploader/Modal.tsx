import { FileImageOutlined } from '@ant-design/icons'
import { Button, Modal, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import ImageUploader from './index'

export interface ImageUploaderModalProps {
  initValue?: string
  visible?: boolean
  onClose?: (value: string) => void
  prefix: string
}
export const ImageUploaderModal: React.FC<ImageUploaderModalProps> = ({
  initValue,
  visible,
  onClose,
  prefix,
}) => {
  const [value, setValue] = useState(initValue || '')

  useEffect(() => {
    if (!visible) {
      setValue('')
    }
  }, [visible])

  return (
    <Modal
      centered
      closable={false}
      visible={visible}
      title={
        <Space>
          <FileImageOutlined />
          上传图片
        </Space>
      }
      footer={
        <Button block={true} type='link' onClick={() => onClose?.(value)}>
          OK
        </Button>
      }
    >
      <ImageUploader
        prefix={prefix}
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}
      />
    </Modal>
  )
}

export default ImageUploaderModal
