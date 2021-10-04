/**
 * 将 option 进行转换
 */

import { Space } from 'antd'

type StateType = {
  id: number
  name: string
  icon: JSX.Element
  color: string
}
export const getSelectOptionsByState = (state: StateType[]) =>
  state.map((s) => {
    return {
      value: s.id,
      label: (
        <Space>
          {s.icon}
          {s.name}
        </Space>
      ),
    }
  })
