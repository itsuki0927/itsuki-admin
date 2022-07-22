import { IdentifiableEntity } from '@/helper/http.interface';

export type Blacklist = IdentifiableEntity<{
  ip: string[];
  email: string[];
  keyword: string[];
}>;
