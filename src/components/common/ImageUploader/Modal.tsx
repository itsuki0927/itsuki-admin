import { FileImageOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import ImageUploader from './index';

export interface ImageUploaderModalProps {
  initValue?: string;
  visible?: boolean;
  onClose?: (value: string) => void;
  getPrefix?: () => string;
}
const ImageUploaderModal: React.FC<ImageUploaderModalProps> = ({
  initValue,
  visible,
  onClose,
  ...rest
}) => {
  const [value, setValue] = useState(initValue || '');

  useEffect(() => {
    if (!visible) {
      setValue('');
    }
  }, [visible]);

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
        <Button block type='link' onClick={() => onClose?.(value)}>
          OK
        </Button>
      }
    >
      <ImageUploader {...rest} value={value} onChange={setValue} />
    </Modal>
  );
};

export default ImageUploaderModal;
