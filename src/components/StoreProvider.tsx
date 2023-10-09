"use client";

import { Provider } from "react-redux";
import { ReactNode } from "react";
import { store } from "@/store/store";

function StoreProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
