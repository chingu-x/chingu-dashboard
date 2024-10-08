import "reflect-metadata";

import { useMemo } from "react";

import { injectables } from "@/di/injectables";

const useInjection = () => {
  const injection = useMemo(
    () => ({
      ...injectables,
    }),
    [],
  );

  return injection;
};

export default useInjection;
