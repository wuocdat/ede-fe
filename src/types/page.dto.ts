import { Order } from "./enums";

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}

export type PageOptionsDto = {
  order?: Order;
  page?: number;
  take?: number;
};

export type PageMetaDto = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type PageDto<T> = {
  data: T[];
  meta: PageMetaDto;
};
