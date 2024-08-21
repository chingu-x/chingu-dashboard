import type { InjectionToken } from "tsyringe";

import container from "./config";

export const resolve =
  <T>(token: InjectionToken<T>) =>
  // eslint-disable-next-line indent
  () =>
    // eslint-disable-next-line indent
    container.resolve(token);
