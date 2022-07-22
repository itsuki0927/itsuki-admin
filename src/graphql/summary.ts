import { gql } from '@apollo/client';
import { SiteSummaryResponse } from '@/entities/siteinfo';

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
