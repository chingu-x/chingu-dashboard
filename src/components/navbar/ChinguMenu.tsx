import Image from "next/image";
import Link from "next/link";
import chinguLogo from "@/public/img/chingu_logo.png";
import routePaths from "@/utils/routePaths";

export default function ChinguMenu() {
  return (
    <Link
      href={routePaths.dashboardPage()}
      className="flex cursor-pointer flex-col flex-wrap items-center gap-2 sm:flex-row"
    >
      <Image
        src={chinguLogo}
        width={50}
        height={50}
        alt="Chingu Logo"
        priority={true}
      />
      <h2 className="hidden text-xs font-semibold text-base-300 sm:flex sm:text-lg">
        Chingu
      </h2>
    </Link>
  );
}
