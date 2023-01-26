/* eslint-disable @typescript-eslint/no-unused-vars */
import { EditOutlined, HeartOutlined, ReloadOutlined } from '@ant-design/icons';
import {
  Button,
  // Comment,
  Divider,
  Drawer,
  Empty,
  Row,
  Spin,
  Tag,
  Typography,
} from 'antd';
import { useNavigate } from 'react-router-dom';
// import { CommentAvatar } from '@/components/common';
// import { cs } from '@/constants/comment';
import type { CommentTree } from '@/entities/comment';
// import { formatDate } from '@/transforms/date';
// import { parserBrowser, parserOS } from '@/transforms/ua';

interface BlogCommentProps {
  visible: boolean;
  onClose: () => void;
  comments?: CommentTree[];
  count?: number;
  loading?: boolean;
  onRefresh?: () => void;
}

const CommentTreeList = ({ comments }: Pick<BlogCommentProps, 'comments'>) => {
  return (
    <>
      {comments?.map(comment => {
        return (
          <div
            key={comment.id}
            // datetime={formatDate(comment.createAt)}
            // actions={[
            //   <Typography.Text key='time' type={comment.liking ? 'danger' : 'secondary'}>
            //     <HeartOutlined />
            //     &nbsp;
            //     {comment.liking} 喜欢
            //   </Typography.Text>,
            //   <Divider key='divider1' type='vertical' />,
            //   <span key='browser'>{parserBrowser(comment.agent!)}</span>,
            //   <Divider key='divider2' type='vertical' />,
            //   <span key='os'>{parserOS(comment.agent!)}</span>,
            //   <Divider key='divider3' type='vertical' />,
            //   <span key='ip'>{comment.ip || '-'}</span>,
            // ]}
            // author={
            //   <div>
            //     {comment.provider === 'github' ? (
            //       <a
            //         href={`https://github.com/${comment.nickname}`}
            //         title={comment.nickname}
            //         target='_blank'
            //         rel='noreferrer'
            //       >
            //         {comment.nickname}
            //       </a>
            //     ) : (
            //       comment.nickname
            //     )}
            //     <Divider type='vertical' />
            //     {comment.province || '-'} · {comment.city || '-'}
            //     <Divider type='vertical' />
            //     <Tag color={cs(comment.state).color} icon={cs(comment.state).icon}>
            //       {cs(comment.state).name}
            //     </Tag>
            //   </div>
            // }
            // avatar={
            //   <CommentAvatar
            //     nickname={comment.nickname}
            //     avatar={comment.avatar}
            //     provider={comment.provider}
            //     size='default'
            //   />
            // }
            // content={<Typography.Paragraph>{comment.content}</Typography.Paragraph>}
          >
            <Divider style={{ margin: '12px 0' }} />
            <CommentTreeList comments={comment.children} />
          </div>
        );
      })}
    </>
  );
};

const BlogComment = ({
  visible,
  onClose,
  count,
  comments,
  loading,
  onRefresh,
}: BlogCommentProps) => {
  const history = useNavigate();
  return (
    <Drawer
      width='60%'
      visible={visible}
      onClose={onClose}
      title={`文章评论 (${count ?? '-'})`}
      footer={
        <Row justify='space-between' align='middle'>
          <Button
            type='dashed'
            icon={<ReloadOutlined />}
            size='small'
            onClick={onRefresh}
          >
            刷新评论
          </Button>
          <Button
            type='primary'
            icon={<EditOutlined />}
            size='small'
            onClick={() => history('/comment')}
          >
            管理评论
          </Button>
        </Row>
      }
    >
      <Spin spinning={loading}>
        {!count ? (
          <Empty description='无数据' />
        ) : (
          <CommentTreeList comments={comments} />
        )}
      </Spin>
    </Drawer>
  );
};

export default BlogComment;
