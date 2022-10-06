import { CompressOutlined, FontSizeOutlined, PictureOutlined } from '@ant-design/icons';

export enum BlogCardStyle {
  Image,
  Text,
  Mixin,
}

const cardStyleMap = new Map(
  [
    {
      id: BlogCardStyle.Image,
      name: '图片',
      icon: <PictureOutlined />,
      color: 'orange',
    },
    {
      id: BlogCardStyle.Text,
      name: '文字',
      icon: <FontSizeOutlined />,
      color: 'green',
    },
    { id: BlogCardStyle.Mixin, name: '混合', icon: <CompressOutlined />, color: 'red' },
  ].map(item => [item.id, item])
);

export const cs = (state: BlogCardStyle) => cardStyleMap.get(state)!;

export const cardStyles = [...cardStyleMap.values()];
