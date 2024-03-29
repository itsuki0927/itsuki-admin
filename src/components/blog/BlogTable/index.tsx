import {
  CheckOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  HeartOutlined,
  LinkOutlined,
  RollbackOutlined,
  SyncOutlined,
  TagOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { AlertRenderType } from '@ant-design/pro-table/lib/components/Alert';
import { Button, Card, message, Modal, Space, Table, Tag, Typography } from 'antd';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { omitSelectAllValue } from '@/constants/common';
import { ps, PublishState } from '@/constants/publish';
import type { Blog, SearchBlogInput } from '@/entities/blog';
import { useBlogs, useSyncBlogCommentCount, useUpdateBlogState } from '@/hooks/blog';
import { formatDate } from '@/transforms/date';
import { getBlogBlogUrl } from '@/transforms/url';

type BlogTableProps = {
  query?: SearchBlogInput;
};

const BlogTable = ({ query }: BlogTableProps) => {
  const [fetchBlogs, { refetch }] = useBlogs();
  const [updateState] = useUpdateBlogState();
  const [syncBlogCommentCount] = useSyncBlogCommentCount();
  const [loading, setLoading] = useState(false);
  const actionRef = useRef<ActionType>();
  const history = useNavigate();

  const handleStateChange = (ids: number[], state: PublishState, cb?: () => void) => {
    Modal.confirm({
      title: `确定要将 状态变更为 [${ps(state).name}] 状态嘛?`,
      content: '此操作不能撤销!!!',
      centered: true,
      async onOk() {
        setLoading(true);
        await updateState({
          variables: {
            ids,
            state,
          },
        });
        await refetch();
        message.success('变更成功');
        actionRef.current?.reload();
        setLoading(false);
        cb?.();
      },
    });
  };

  const columns: ProColumns<Blog>[] = [
    { title: 'id', width: 40, dataIndex: 'id' },
    {
      title: '文章',
      width: 360,
      render: (_, { title, description, cover }) => (
        <Card
          size='small'
          bordered={false}
          bodyStyle={{
            minHeight: '100px',
            backdropFilter: 'blur(2px)',
          }}
          style={{
            margin: '1rem 0',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            minHeight: '100px',
            backgroundImage: `url(${cover})`,
          }}
        >
          <Card.Meta
            title={
              <Typography.Title style={{ marginTop: '5px' }} level={5}>
                {title}
              </Typography.Title>
            }
            description={
              <Typography.Paragraph
                type='secondary'
                style={{ marginBottom: '5px' }}
                ellipsis={{ rows: 2, expandable: true }}
              >
                {description}
              </Typography.Paragraph>
            }
          />
        </Card>
      ),
    },
    {
      title: '归类',
      width: 130,
      render: (_, { tags }) => (
        <Space size='small' wrap key='tag'>
          {tags?.map(tag => (
            <Tag icon={<TagOutlined />} key={tag.id}>
              {tag.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '被关注',
      width: 150,
      render: (_, { reading, liking, commenting }) => (
        <Space direction='vertical'>
          <Space key='reading' size='small'>
            <EyeOutlined />
            浏览 {reading} 次
          </Space>
          <Space key='liking' size='small'>
            <HeartOutlined />
            喜欢 {liking} 次
          </Space>
          <Space key='commenting' size='small'>
            <CommentOutlined />
            评论 {commenting} 条
          </Space>
        </Space>
      ),
    },
    {
      title: '更新周期',
      width: 230,
      render: (_, { createAt, updateAt }) => (
        <Space direction='vertical'>
          <span key='createAt'>最早发布：{formatDate(createAt)}</span>
          <span key='updateAt'>最后更新：{formatDate(updateAt)}</span>
        </Space>
      ),
    },
    {
      title: '状态',
      width: 120,
      render: (_, { publish: propPublish }) => {
        const publish = ps(propPublish!);
        const list = [publish];

        return (
          <Space direction='vertical'>
            {list.map(s => (
              <Tag icon={s.icon} color={s.color} key={`${s.name}-${s.id}`}>
                {s.name}
              </Tag>
            ))}
          </Space>
        );
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 110,
      render: (_, blog) => (
        <Space direction='vertical'>
          <Link key='blog-edit' to={`/blog/edit/${blog.path}`}>
            <Button size='small' type='text' block icon={<EditOutlined />}>
              文章详情
            </Button>
          </Link>
          {blog.publish === PublishState.Draft && (
            <Button
              size='small'
              type='text'
              block
              icon={<CheckOutlined />}
              onClick={() => handleStateChange([blog.id], PublishState.Published)}
            >
              <Typography.Text type='success'>直接发布</Typography.Text>
            </Button>
          )}
          {blog.publish === PublishState.Published && (
            <Button
              size='small'
              type='text'
              block
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleStateChange([blog.id], PublishState.Recycle)}
            >
              移回收站
            </Button>
          )}
          {blog.publish === PublishState.Recycle && (
            <Button
              size='small'
              type='text'
              block
              icon={<RollbackOutlined />}
              onClick={() => handleStateChange([blog.id], PublishState.Draft)}
            >
              <Typography.Text type='warning'>退至草稿</Typography.Text>
            </Button>
          )}
          <Button
            size='small'
            block
            type='link'
            target='_blank'
            href={getBlogBlogUrl(blog.path)}
            icon={<LinkOutlined />}
          >
            宿主页面
          </Button>
        </Space>
      ),
    },
  ];

  const renderAlert: AlertRenderType<Blog> = ({ selectedRowKeys, onCleanSelected }) => (
    <Space size={24}>
      <span>
        已选 {selectedRowKeys.length} 项
        <a style={{ marginLeft: 8 }} onClick={onCleanSelected} role='button' tabIndex={0}>
          取消选择
        </a>
      </span>
    </Space>
  );

  const renderAlertOption: AlertRenderType<Blog> = ({
    selectedRowKeys,
    onCleanSelected,
  }) => (
    <Space>
      <Button
        key='publish'
        size='small'
        type='text'
        block
        icon={<CheckOutlined />}
        onClick={() => {
          handleStateChange(
            selectedRowKeys as number[],
            PublishState.Published,
            onCleanSelected
          );
        }}
      >
        <Typography.Text type='success'>直接发布</Typography.Text>
      </Button>
      <Button
        key='recycle'
        size='small'
        type='text'
        block
        danger
        icon={<DeleteOutlined />}
        onClick={() => {
          handleStateChange(
            selectedRowKeys as number[],
            PublishState.Recycle,
            onCleanSelected
          );
        }}
      >
        移回收站
      </Button>
      <Button
        key='draft'
        size='small'
        type='text'
        block
        icon={<RollbackOutlined />}
        onClick={() => {
          handleStateChange(
            selectedRowKeys as number[],
            PublishState.Draft,
            onCleanSelected
          );
        }}
      >
        <Typography.Text type='warning'>退至草稿</Typography.Text>
      </Button>
      <Button
        key='sync'
        size='small'
        type='text'
        onClick={async () => {
          setLoading(true);
          await syncBlogCommentCount({
            variables: {
              ids: selectedRowKeys as any[],
            },
          });
          await refetch();
          actionRef.current?.reload();
          message.success('同步成功');
          setLoading(false);
          onCleanSelected();
        }}
      >
        <SyncOutlined />
        同步评论
      </Button>
    </Space>
  );

  return (
    <ProTable
      headerTitle='文章列表'
      actionRef={actionRef}
      loading={loading}
      search={false}
      params={omitSelectAllValue(query)}
      columns={columns}
      rowKey='id'
      request={async search => {
        setLoading(true);
        const { data } = await fetchBlogs({
          variables: {
            search,
          },
        });
        setLoading(false);
        if (!data?.blogs) {
          message.error('找不到文章');
          return {};
        }
        return data.blogs;
      }}
      rowSelection={{
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
      }}
      tableAlertRender={renderAlert}
      tableAlertOptionRender={renderAlertOption}
      toolBarRender={() => [
        <Button
          size='small'
          key='create'
          type='primary'
          onClick={() => history('/blog/create')}
          icon={<EditOutlined />}
        >
          撰写文章
        </Button>,
      ]}
    />
  );
};

export default BlogTable;
