import Image from "next/image";
import Link from "next/link";
import chinguLogo from "@/public/img/chingu_logo.png";
import routePaths from "@/utils/routePaths";

export default function ChinguMenu() {
  return (
    <Link href={routePaths.dashboardPage()}>
      <div className="flex cursor-pointer flex-col items-center gap-2 sm:flex-row">
        <Image
          src={chinguLogo}
          width={50}
          height={50}
          alt="Chingu Logo"
          priority={true}
        />
        <h2 className="text-xs font-semibold text-base-300 sm:text-lg">
          Chingu
        </h2>
      </div>
    </Link>
  );
}
