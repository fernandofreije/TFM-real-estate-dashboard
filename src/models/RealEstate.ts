import { Operation } from './Operation';

export interface RealEstate {
  price: number;
  location: string;
  description: string;
  rooms: number;
  baths: number;
  imageLink: string;
  link: string;
  real_estate_agent: boolean;
  remote_id: string;
  operation: Operation;
  size: number;
  floor: number;
  category: string;
  created_at: Date;
  updated_at: Date;
  province: string;
  'page-position': string;
}
