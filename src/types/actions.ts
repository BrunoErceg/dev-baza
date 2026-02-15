export type ActionResponse<T> = {
  data: T | null;
  success: string | null;
  error: string | null;
};

export type DataResponse<T> = {
  data: T;
  error: string | null;
};
