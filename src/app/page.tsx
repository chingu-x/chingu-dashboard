// replace with dashboard page when that's completed

import Alert from "@/components/Alert";
import TempModalControls from "@/components/modals/TempModalControls";

export default function Home() {
  return (
    <>
      <TempModalControls />
      <Alert context="warning" message={"Your resource has been deleted"} />
      <Alert context="error" message={"Your resource could not be shared"} />
    </>
  );
}
