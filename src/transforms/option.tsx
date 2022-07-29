/**
 * 将 option 进行转换
 */

import { Space } from 'antd';

type StateType = {
  id: number;
  name: string;
  icon: JSX.Element;
  color: string;
};

const defaultRenderLabel = (s: StateType) => (
  <Space>
    {s.icon}
    {s.name}
  </Space>
);

export const getSelectOptionsByState = (
  state: StateType[],
  renderLabel = defaultRenderLabel
) =>
  state.map(s => {
    return {
      value: s.id,
      label: renderLabel(s),
    };
  });
