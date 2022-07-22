import { SiteSummaryResponse } from '@/services/ant-design-pro/siteinfo';
import { gql } from '@apollo/client';

export type QuerySiteSummaryResponse = {
  summary: SiteSummaryResponse;
};

export const SITE_SUMMARY = gql`
  query summary {
    summary {
      article
      tag
      comment
    }
  }
`;
