import "reflect-metadata";

import { injectables } from "./injectables";

const resolveInjection = () => ({
  ...injectables,
});

export default resolveInjection;
