import type { InjectionToken } from "tsyringe";

import container from "./config";

export const resolve =
  <T>(token: InjectionToken<T>) => () => container.resolve(token);
