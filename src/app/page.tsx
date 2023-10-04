// replace with dashboard page when that's completed

import Link from "next/link";

import TempModalControls from "@/components/modals/TempModalControls";
import { Example3Modal, Example4Modal } from "@/components/modals";

type Props = { searchParams: Record<string, string> | null | undefined };

export default function Home({ searchParams }: Props) {
  const showModal1 = searchParams?.modal1;
  const showModal2 = searchParams?.modal2;
  return (
    <>
      <TempModalControls />
      <Link className="border-none btn bg-primary" href="/?modal1=true">
        Server Modal
      </Link>
      <Link className="border-none btn bg-primary" href="/?modal2=true">
        Server Modal with client comp inside
      </Link>
      {showModal1 && <Example3Modal />}
      {showModal2 && <Example4Modal />}
    </>
  );
}
