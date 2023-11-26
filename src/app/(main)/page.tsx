// replace with dashboard page when that's completed

import Alert from "@/components/Alert";
import { Button } from "@/components/ButtonCVA";
import TempModalControls from "@/components/modals/TempModalControls";
import {
  EnvelopeIcon,
  ArrowRightIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <>
      <TempModalControls />
      <Alert context="warning" message={"Your resource has been deleted"} />
      <Alert context="error" message={"Your resource could not be shared"} />
      <>
        <h2>Buttons</h2>
        <div className="flex flex-col items-start gap-2">
          <Button variant="primary" size="xxl">
            primary
          </Button>
          <Button variant="secondary" size="xl">
            secondary
          </Button>
          <Button variant="accent" size="lg">
            accent
          </Button>
          <Button variant="neutral" size="md">
            neutral
          </Button>
          <Button variant="error" size="sm">
            error
          </Button>
          <Button variant="error" size="sm" disabled={true}>
            error-disabled
          </Button>
          <Button variant="error" size="sm">
            <EnvelopeIcon className="h-[18px] w-[18px]" />
            error-icon
          </Button>
          <Button variant="error" size="sm">
            error-icon
            <ArrowRightIcon className="h-[18px] w-[18px]" />
          </Button>
          <Button variant="link" size="sm">
            <EnvelopeIcon className="h-[18px] w-[18px] text-base-300" />
            link
            <ArrowRightIcon className="h-[18px] w-[18px] text-base-300" />
          </Button>
          <div className="w-[300px] flex flex-col gap-2">
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="justify-start"
            >
              <PlusCircleIcon className="h-[18px] w-[18px] text-base-300" />
              Add Tech Stack
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="justify-end"
            >
              Next page
              <ArrowRightIcon className="h-[18px] w-[18px] text-base-300" />
            </Button>
          </div>
        </div>
      </>
    </>
  );
}
