import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

interface HamburgerProps {
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
}

const Hamburger = ({ collapsed, onCollapse }: HamburgerProps) => (
  <div
    onClick={() => onCollapse?.(!collapsed)}
    style={{
      cursor: 'pointer',
      fontSize: '16px',
      padding: '0 12px',
    }}
  >
    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
  </div>
)

export default Hamburger
