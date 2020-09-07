import { Operation } from './Operation';

export interface Summary {
  id: string;
  created_at_date: Date;
  operation: Operation;
  province: string;
  avg_price: number;
  avg_size: number;
  total: number;
}
