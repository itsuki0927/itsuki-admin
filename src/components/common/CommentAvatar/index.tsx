import { GithubOutlined, QqOutlined } from '@ant-design/icons'
import { Avatar, Badge, Popover } from 'antd'

interface CommentAvatarProps {
  nickname: string
  loginType: string
  avatar: string
}

const CommentAvatar = ({ nickname, avatar, loginType }: CommentAvatarProps) => {
  const icon = loginType === 'github' ? <GithubOutlined /> : <QqOutlined />
  const color = loginType === 'github' ? '#000' : 'blue'

  return (
    <Popover placement='right' content={nickname}>
      <Badge count={icon} color={color} size='small' title={nickname}>
        <Avatar shape='square' src={avatar} />
      </Badge>
    </Popover>
  )
}

export default CommentAvatar
