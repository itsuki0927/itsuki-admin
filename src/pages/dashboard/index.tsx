import { CoffeeOutlined, CommentOutlined, EyeOutlined, TagOutlined } from '@ant-design/icons'
import { StatisticCard } from '@ant-design/pro-card'
import { PageContainer } from '@ant-design/pro-layout'
import { Space } from 'antd'
import React from 'react'
import styles from './index.less'

export default (): React.ReactNode => {
  return (
    <PageContainer>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <StatisticCard.Group direction={'row'}>
          <StatisticCard
            statistic={{
              title: '今日阅读',
              value: 2176,
              icon: <EyeOutlined className={styles.icon} />,
            }}
          />
          <StatisticCard.Divider />
          <StatisticCard
            statistic={{
              title: '全站文章',
              value: 475,
              icon: <CoffeeOutlined className={styles.icon} />,
            }}
          />
          <StatisticCard.Divider />
          <StatisticCard
            statistic={{
              title: '全站标签',
              value: 87,
              icon: <TagOutlined className={styles.icon} />,
            }}
          />
          <StatisticCard.Divider />
          <StatisticCard
            statistic={{
              title: '全站评论',
              value: 1754,
              icon: <CommentOutlined className={styles.icon} />,
            }}
          />
        </StatisticCard.Group>

        <StatisticCard.Group direction='row'>
          <StatisticCard
            statistic={{
              title: '全部',
              tip: '帮助文字',
              value: 10,
              status: 'default',
            }}
          />
          <StatisticCard
            statistic={{
              title: '草稿',
              value: 3,
              status: 'processing',
            }}
          />
          <StatisticCard
            statistic={{
              title: '回收站',
              value: 2,
              status: 'error',
            }}
          />
          <StatisticCard
            statistic={{
              title: '已发布',
              value: 4,
              status: 'success',
            }}
          />
        </StatisticCard.Group>
      </Space>
    </PageContainer>
  )
}
