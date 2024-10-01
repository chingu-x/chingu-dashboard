export interface AppError {
  message: string;
}

export type AsyncFunction<X> = () => Promise<X>;
export type AsyncActionResponse<X> = [X | null, AppError | null];
