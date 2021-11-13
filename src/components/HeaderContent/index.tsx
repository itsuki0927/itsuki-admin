import { ProBreadcrumb } from '@ant-design/pro-layout'
import type { HeaderViewProps } from '@ant-design/pro-layout/lib/Header'
import { Space } from 'antd'
import Hamburger from '../Hamburger'

type HeaderContentProps = HeaderViewProps

const HeaderContent = ({ onCollapse, collapsed }: HeaderContentProps) => {
  return (
    <Space size={12}>
      <Hamburger onCollapse={onCollapse} collapsed={collapsed} />
      <ProBreadcrumb />
    </Space>
  )
}

export default HeaderContent
