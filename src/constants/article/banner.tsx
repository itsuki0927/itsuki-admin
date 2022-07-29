import { RetweetOutlined, SwapOutlined } from '@ant-design/icons';

/** 文章轮播 */
export enum ArticleBanner {
  NO = 0, // 原创
  YES = 1, // 转载
}

const articleBannerMap = new Map(
  [
    {
      id: ArticleBanner.NO,
      name: '无轮播',
      icon: <SwapOutlined />,
      color: 'yellow',
    },
    {
      id: ArticleBanner.YES,
      name: '有轮播',
      icon: <RetweetOutlined />,
      color: 'pink',
    },
  ].map(item => [item.id, item])
);

export const ab = (state: ArticleBanner) => articleBannerMap.get(state)!;

export const articleBanners = [...articleBannerMap.values()];
