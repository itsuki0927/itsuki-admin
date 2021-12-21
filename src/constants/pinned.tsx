import { PushpinOutlined, UngroupOutlined } from '@ant-design/icons'

/** 文章Pinned */
export enum PinnedState {
  NO = 0, // 不显示
  YES = 1, // 显示
}

const pinnedStateMap = new Map(
  [
    {
      id: PinnedState.NO,
      name: 'UnPinned',
      icon: <UngroupOutlined />,
      color: 'geekblue',
    },
    {
      id: PinnedState.YES,
      name: 'Pinned',
      icon: <PushpinOutlined />,
      color: 'cyan',
    },
  ].map((item) => [item.id, item])
)

export const getPinnedState = (state: PinnedState) => pinnedStateMap.get(state)!

export const pinnedStates = [...pinnedStateMap.values()]
