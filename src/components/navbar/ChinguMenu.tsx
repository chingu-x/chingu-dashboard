import Image from "next/image";
import Link from "next/link";

export default function ChinguMenu() {
  return (
    <Link href="/">
      <div className="flex flex-col items-center gap-2 cursor-pointer sm:flex-row">
        <Image
          src="/img/chingu_logo.png"
          width={50}
          height={50}
          alt="Chingu Logo"
          priority={false}
        />
        <h2 className="font-semibold text-base-300 text-xs sm:text-lg">Chingu</h2>
      </div>
    </Link>
  );
}
