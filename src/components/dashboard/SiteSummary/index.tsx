import {
  CoffeeOutlined,
  CommentOutlined,
  EyeOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-card';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import type { SiteSummaryResponse } from '@/entities/siteinfo';
import styles from './index.module.less';

const list = [
  {
    key: 'read',
    title: '今日阅读',
    icon: <EyeOutlined className={classNames(styles.icon, styles.read)} />,
  },
  {
    key: 'article',
    title: '全站文章',
    icon: <CoffeeOutlined className={classNames(styles.icon, styles.article)} />,
  },
  {
    key: 'tag',
    title: '全站标签',
    icon: <TagOutlined className={classNames(styles.icon, styles.tag)} />,
  },
  {
    key: 'comment',
    title: '全站评论',
    icon: <CommentOutlined className={classNames(styles.icon, styles.comment)} />,
  },
] as const;

interface SiteSummaryProps {
  summary?: SiteSummaryResponse;
}

const SiteSummary = ({ summary }: SiteSummaryProps) => {
  if (!summary) {
    return <StatisticCard.Group loading />;
  }

  const dom: ReactNode[] = [];
  list.forEach((item, index) => {
    dom.push(
      <StatisticCard
        statistic={{
          title: item.title,
          value: summary[item.key as keyof typeof summary] ?? ~~(Math.random() * 10000),
          icon: item.icon,
        }}
      />
    );

    if (index < list.length - 1) {
      dom.push(<StatisticCard.Divider />);
    }
  });

  return (
    <StatisticCard.Group ghost direction='row'>
      {dom}
    </StatisticCard.Group>
  );
};

export default SiteSummary;
