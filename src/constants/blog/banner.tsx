import { RetweetOutlined, SwapOutlined } from '@ant-design/icons';

/** 文章轮播 */
export enum BlogBanner {
  NO = 0, // 原创
  YES = 1, // 转载
}

const blogBannerMap = new Map(
  [
    {
      id: BlogBanner.NO,
      name: '无轮播',
      icon: <SwapOutlined />,
      color: 'yellow',
    },
    {
      id: BlogBanner.YES,
      name: '有轮播',
      icon: <RetweetOutlined />,
      color: 'pink',
    },
  ].map(item => [item.id, item])
);

export const ab = (state: BlogBanner) => blogBannerMap.get(state)!;

export const blogBanners = [...blogBannerMap.values()];
