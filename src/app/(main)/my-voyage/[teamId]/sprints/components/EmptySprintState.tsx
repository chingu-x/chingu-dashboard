import Image from "next/image";

export default function EmptySprintState() {
  return (
    <div className="w-full">
      <div
        data-hide-on-theme="dark"
        className="relative mx-auto h-[390px] w-11/12 3xl:w-9/12"
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
        className="relative mx-auto h-[390px] w-11/12 3xl:w-9/12"
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
