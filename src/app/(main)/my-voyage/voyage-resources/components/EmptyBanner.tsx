import Image from "next/image";

export default function EmptyBanner () {
  return(
    <div className="flex items-center justify-between">
      <div className="text-lg font-medium text-base-300">
        <h1 className="text-lg">Be The First to Share!</h1>
        <p className="text-sm">It looks like no one has posted anything yet, but don&apos;t worry, you can be the first to share your favorite and most valuable resource with your fellow Chingus! 
          <br></br>
          <br></br> 
          Click on the Add Resource button at the top to get started!
        </p>
      </div>
      <div
        data-hide-on-theme="dark"
        className="h-[200px] w-[400px] relative shrink-0"
      >
        <Image
          src="/img/empty_resources_light.png"
          height={500}
          width={500}
          alt="desk"
          priority={true}
        />
      </div>
      <div
        data-hide-on-theme="light"
        className="h-[200px] w-[400px] relative shrink-0"
      >
        <Image
          src="/img/empty_resources_dark.png"
          height={500}
          width={500}
          alt="desk"
          priority={true}
        />
      </div>
    </div>
  );
};
