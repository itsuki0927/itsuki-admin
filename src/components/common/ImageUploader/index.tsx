import {
  CheckOutlined,
  CopyOutlined,
  FileMarkdownOutlined,
  LinkOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Input, message, notification, Space, Tooltip, Upload } from 'antd';
import { useState } from 'react';
import { copy } from '@/utils/copy';
import { STATIC_URL } from '@/config';
import styles from './index.module.less';

const request = () => {
  return Promise.resolve(222);
};

const UPLOAD_FILE_SIZE_LIMIT = 3000000;

type ImageUploaderProps = {
  value?: string;
  onChange?: (value: string) => void;
  disabledInput?: boolean;
  disabledMarkdown?: boolean;
  prefix: string;
};

const ImageUploader = ({
  value,
  onChange,
  disabledInput,
  disabledMarkdown,
  prefix,
}: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);

  const beforeUpload = (file: File) => {
    return new Promise<any>((resolve, reject) => {
      const isImg = ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type);

      if (!isImg) {
        message.warn('请上传 png、jpeg、jpg 格式的图片');
        return reject();
      }

      const isMaxLimit = file.size > UPLOAD_FILE_SIZE_LIMIT;

      if (isMaxLimit) {
        message.warn('图片大小过大, 请进行压缩');
        return reject();
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = document.createElement('img');
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = 'red';
          ctx.textBaseline = 'middle';
          ctx.font = '33px Arial';
          ctx.fillText('itsuki.cn', 20, 20);
          canvas.toBlob(resolve);
        };
      };
    });
  };

  const getMarkdown = (url: string) => `![](${url})`;

  const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('prefix', prefix);
    setUploading(true);
    request('/upload/file', {
      method: 'POST',
      data: formData,
    }).then(data => {
      const imageUrl = `${STATIC_URL}/${data}`;
      onChange?.(imageUrl);
      setUploading(false);
      notification.success({
        message: '上传成功',
        description: imageUrl,
      });
    });
  };

  const handleRemove = () => onChange?.('');

  const handleCopy = () => {
    copy(getMarkdown(value ?? ''));
    message.success('复制成功');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

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
        customRequest={options => {
          if (options.file) {
            uploadFile(options.file as File);
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
          onChange={e => onChange?.(e.target.value)}
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
  );
};

export default ImageUploader;
