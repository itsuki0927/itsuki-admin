import { useLazyQuery } from '@apollo/client';
import { QuerySiteSummaryResponse, SITE_SUMMARY } from '@/graphql/summary';

export const useSummary = () => {
  return useLazyQuery<QuerySiteSummaryResponse>(SITE_SUMMARY);
};
