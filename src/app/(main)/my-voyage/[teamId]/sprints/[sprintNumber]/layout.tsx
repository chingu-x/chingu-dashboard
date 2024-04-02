import Banner from "@/components/banner/Banner";
import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col w-full gap-y-10">
      <VoyagePageBannerContainer
        title="Sprints"
        description="A sprint agenda helps the team stay on track, communicate well, and improve. Basically, it's like speed dating for developers. Except we're not looking for a soulmate, we're just trying to get some quality work done."
      >
        <Banner
          imageLight="/img/sprints_banner_light.png"
          imageDark="/img/sprints_banner_dark.png"
          alt="sprints_banner"
          height="h-[200px]"
          width="w-[276px]"
        />
      </VoyagePageBannerContainer>
      {children}
    </div>
  );
}