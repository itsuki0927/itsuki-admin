import { CheckOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

export enum RanksState {
  Easy = 0, // 简单
  Medium = 1, // 中等
  Hard = 2, // 困难
}

const ranksStateMap = new Map(
  [
    { id: RanksState.Easy, name: '简单', icon: <EditOutlined />, color: '#78c02a' },
    { id: RanksState.Medium, name: '中等', icon: <CheckOutlined />, color: '#ffb300' },
    { id: RanksState.Hard, name: '困难', icon: <DeleteOutlined />, color: '#ee423f' },
  ].map((item) => [item.id, item])
)

export const rs = (state: RanksState) => ranksStateMap.get(state)!

export const ranksStates = [...ranksStateMap.values()]
