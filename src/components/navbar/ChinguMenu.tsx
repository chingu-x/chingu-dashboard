import Image from "next/image";
import Link from "next/link";
import chinguLogo from "@/public/img/chingu_logo.png";
import routePaths from "@/utils/routePaths";

export default function ChinguMenu() {
  return (
    <Link href={routePaths.dashboardPage()}>
      <div className="flex flex-col items-center gap-2 cursor-pointer sm:flex-row">
        <Image
          src={chinguLogo}
          width={50}
          height={50}
          alt="Chingu Logo"
          priority={true}
        />
        <h2 className="font-semibold text-base-300 text-xs sm:text-lg">
          Chingu
        </h2>
      </div>
    </Link>
  );
}
