import { IdentifiableEntity } from '@/helper/basicType';

export type Tag = IdentifiableEntity<{
  name: string;
  description: string;
  path: string;
  count: number;
  sort: number;
  expand?: string;
}>;

/**
 * 标签创建、更新请求类
 */
export type TagActionRequest = Omit<Tag, 'createAt' | 'updateAt' | 'id'>;
