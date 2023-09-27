import Image from "next/image";

export default function ChinguMenu() {
  return (
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
  );
}
