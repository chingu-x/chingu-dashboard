// counter page is just a test, remove later. Don't remove the provider

import { ReduxProvider } from "@/components";
import { CounterPage } from "@/app/counter";

export default function Home() {
  return (
    <main>
      <ReduxProvider>
        <CounterPage />
      </ReduxProvider>
    </main>
  );
}
