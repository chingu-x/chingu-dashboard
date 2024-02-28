import Image from "next/image";

export default function EmptyState() {
  return (
    <div className="w-full">
      <div
        data-hide-on-theme="dark"
        className="relative h-[390px] 3xl:w-9/12 w-11/12 mx-auto"
      >
        <Image
          src="/img/sprints_empty_light.png"
          alt="Empty sprint image"
          fill={true}
          style={{ objectFit: "contain" }}
          priority={true}
        />
      </div>
      <div
        data-hide-on-theme="light"
        className="relative 3xl:w-9/12 w-11/12 h-[390px] mx-auto"
      >
        <Image
          src="/img/sprints_empty_light.png"
          alt="Empty sprint image"
          fill={true}
          style={{ objectFit: "contain" }}
          priority={true}
        />
      </div>
    </div>
  );
}
