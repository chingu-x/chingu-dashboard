import Link from "next/link";
import TeamDirectory from "./components/TeamDirectory";
import Banner from "@/components/banner/Banner";

export default function DirectoryPage() {
  return (
    <>
      <Banner
        imageLight="/img/directory_banner_light.png"
        imageDark="/img/directory_banner_dark.png"
        alt="directory_banner"
        title="Directory"
        description="Behold, your mighty band of teammates! If you want them to plan with precision and prowess, make sure your deets are up to date, or else prepare for some serious spreadsheet confusion!"
      />
      <Link
        href="/my-voyage/directory/edit-hours"
        className="w-full p-4 text-white bg-slate-800"
      >
        Open modal
      </Link>
      <TeamDirectory />
    </>
  );
}
