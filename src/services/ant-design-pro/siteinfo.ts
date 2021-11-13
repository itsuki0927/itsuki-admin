// @ts-ignore
/* eslint-disable */
import { request } from 'umi'

export type SiteSummaryResponse = {
  article: number
  tag: number
  comment: number
}

/** 查询统计 GET /site-info/summary */
export const querySiteSummary = () => request<SiteSummaryResponse>('/site-info/summary')
