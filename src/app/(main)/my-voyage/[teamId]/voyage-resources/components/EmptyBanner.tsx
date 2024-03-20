import Banner from "@/components/banner/Banner";

export default function EmptyBanner() {
  return (
    <div className="flex items-center w-5/6 m-6">
      <div className="text-lg font-medium text-base-300 w-1/2 m-2">
        <h1 className="text-lg">Be The First to Share!</h1>
        <p className="text-sm">
          It looks like no one has posted anything yet, but don&apos;t worry,
          you can be the first to share your favorite and most valuable resource
          with your fellow Chingus!
          <br></br>
          <br></br>
          Click on the Add Resource button at the top to get started!
        </p>
      </div>
      <Banner
        imageLight="/img/empty_resources_light.png"
        imageDark="/img/empty_resources_dark.png"
        alt="desk"
        height="h-[500px]"
        width="w-[500px]"
      />
    </div>
  );
}
