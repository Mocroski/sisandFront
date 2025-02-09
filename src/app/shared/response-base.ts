export type ResponseBase<T> = {
    code: string;
    message: string;
    data: T;
    totalCount: number;
  };