// replace with dashboard page when that's completed

import InformationCircleIcon from "@heroicons/react/24/solid/InformationCircleIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/solid/ExclamationTriangleIcon";
import Alert from "@/components/Alert";
import TempModalControls from "@/components/modals/TempModalControls";

export default function Home() {
  return (
    <>
      <TempModalControls />
      <Alert
        icon={<InformationCircleIcon />}
        backgroundColor="bg-info-content"
        borderColor="border-info"
        message={"Your resource has been deleted"}
      />
      <Alert
        icon={<ExclamationTriangleIcon />}
        backgroundColor="bg-error-content"
        borderColor="border-error"
        message={"Your resource could not be shared"}
      />
    </>
  );
}
