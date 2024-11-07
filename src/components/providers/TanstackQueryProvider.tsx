"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface TanstackQueryProviderProps {
  children: React.ReactNode;
}

export function TanstackQueryProvider({
  children,
}: TanstackQueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
