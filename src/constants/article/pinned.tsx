import { PushpinOutlined, UngroupOutlined } from '@ant-design/icons'

/** 文章Pinned */
export enum ArticlePinned {
  NO = 0, // 不显示
  YES = 1, // 显示
}

const articlePinnedMap = new Map(
  [
    {
      id: ArticlePinned.NO,
      name: 'UnPinned',
      icon: <UngroupOutlined />,
      color: 'geekblue',
    },
    {
      id: ArticlePinned.YES,
      name: 'Pinned',
      icon: <PushpinOutlined />,
      color: 'cyan',
    },
  ].map((item) => [item.id, item])
)

export const getArticlePinnedByMap = (state: ArticlePinned) => articlePinnedMap.get(state)!

export const articlePins = [...articlePinnedMap.values()]
