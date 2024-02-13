import { AppError } from "@/types/types";

type AsyncFunction<T> = (args) => Promise<T>;

export async function handleAsync<T>(
  asyncFn: AsyncFunction<T>,
  args?,
): Promise<[T | null, AppError | null]> {
  try {
    const result = await asyncFn(args);
    return [result, null];
  } catch (error) {
    if (error instanceof Error) {
      return [null, { message: error.message }];
    } else {
      throw error;
    }
  }
}
