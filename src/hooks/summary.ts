import { QuerySiteSummaryResponse, SITE_SUMMARY } from '@/graphql/summary';
import { useLazyQuery } from '@apollo/client';

export const useSummary = () => {
  return useLazyQuery<QuerySiteSummaryResponse, void>(SITE_SUMMARY);
};
