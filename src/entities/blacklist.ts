import { IdentifiableEntity } from '@/helper/basicType';

export type Blacklist = IdentifiableEntity<{
  ip: string[];
  email: string[];
  keyword: string[];
}>;
