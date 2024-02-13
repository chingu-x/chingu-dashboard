type AsyncFunction<T> = () => Promise<T>;

export async function handleAsync<T>(
  asyncFn: AsyncFunction<T>,
): Promise<[T | null, Error | null]> {
  try {
    const result = await asyncFn();
    return [result, null];
  } catch (error) {
    if (error instanceof Error) {
      return [null, error];
    } else {
      throw error;
    }
  }
}
