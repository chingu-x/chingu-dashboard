import {
  type AsyncActionResponse,
  type AsyncFunction,
} from "@/modules/shared/types";

export async function handleAsync<X>(
  asyncFn: AsyncFunction<X>,
): Promise<AsyncActionResponse<X>> {
  try {
    const result = await asyncFn();

    return [result, null];
  } catch (error) {
    if (error instanceof Error) {
      return [null, { message: error.message }];
    } else {
      throw error;
    }
  }
}
