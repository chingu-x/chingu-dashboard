// replace with dashboard page when that's completed

import Link from "next/link";

import TempModalControls from "@/components/modals/TempModalControls";
import { Example3Modal } from "@/components/modals";

type Props = { searchParams: Record<string, string> | null | undefined };

export default function Home({ searchParams }: Props) {
  const showModal = searchParams?.modal;
  return (
    <>
      <TempModalControls />
      <Link className="border-none btn bg-primary" href="/?modal=true">
        Server Modal
      </Link>
      {showModal && <Example3Modal />}
    </>
  );
}
