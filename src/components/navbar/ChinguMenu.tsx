import Image from "next/image";
import Link from "next/link";

export default function ChinguMenu() {
  return (
    <Link href="/">
      <div className="flex items-center gap-2 cursor-pointer">
        <Image
          src="/img/chingu_logo.png"
          width={50}
          height={50}
          alt="Chingu Logo"
          priority={false}
        />
        <h2 className=" font-semibold text-lg text-base-300">Chingu</h2>
      </div>
    </Link>
  );
}
