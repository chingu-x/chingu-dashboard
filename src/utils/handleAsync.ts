import { AppError } from "@/types/types";

type AsyncFunction<X, Y> = (args?: X) => Promise<Y>;

export async function handleAsync<X, Y>(
  asyncFn: AsyncFunction<X, Y>,
  args?: X
): Promise<[Y | null, AppError | null]> {
  try {
    const result = await asyncFn(args);
    return [result, null];
  } catch (error) {
    if (error instanceof Error) {
      return [null, { message: error.message }];
    } else {
      return [null, { message: "Something went wrong" }];
    }
  }
}
