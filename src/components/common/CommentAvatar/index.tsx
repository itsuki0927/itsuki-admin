import type { BadgeProps } from 'antd';
import { Avatar, Badge, Popover } from 'antd';

interface CommentAvatarProps {
  nickname?: string;
  loginType?: string;
  avatar?: string;
  size?: BadgeProps['size'];
}

const CommentAvatar = ({
  nickname,
  avatar,
  loginType,
  size = 'small',
}: CommentAvatarProps) => {
  const icon = loginType === 'github' ? 'G' : 'Q';
  const color = loginType === 'github' ? '#000' : 'blue';

  return (
    <Popover placement='right' content={nickname}>
      <Badge count={icon} color={color} size={size} title={nickname}>
        <Avatar shape='square' src={avatar} />
      </Badge>
    </Popover>
  );
};

export default CommentAvatar;
