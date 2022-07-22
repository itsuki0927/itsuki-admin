/* eslint-disable */

export type SiteSummaryResponse = {
  article: number;
  tag: number;
  comment: number;
};

/** 查询统计 GET /site-info/summary */
export const querySiteSummary = () => fetch('/site-info/summary');
