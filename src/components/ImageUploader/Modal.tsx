import React, { useEffect, useRef } from 'react'
import { Modal, Space, Button } from 'antd'
import { FileImageOutlined } from '@ant-design/icons'
import ImageUploader from './index'

export interface ImageUploaderModalProps {
  initValue?: string
  visible?: boolean
  onClose?: () => void
  onOk?: (value: string) => void
  prefix: string
}
export const ImageUploaderModal: React.FC<ImageUploaderModalProps> = ({
  initValue,
  visible,
  onClose,
  prefix,
}) => {
  const value = useRef(initValue || '')

  useEffect(() => {
    if (!visible) {
      value.current = ''
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
        <Button block={true} type='link' onClick={onClose}>
          OK
        </Button>
      }
    >
      <ImageUploader
        prefix={prefix}
        value={value.current}
        onChange={(newValue) => {
          value.current = newValue
        }}
      />
    </Modal>
  )
}

export default ImageUploaderModal
