interface VoyagePageBannerContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function VoyagePageBannerContainer({
  title,
  description,
  children,
}: VoyagePageBannerContainerProps) {
  return (
    <div className="card w-full max-h-[320px] flex flex-row justify-between px-20 box-border gap-x-10 lg:gap-x-20">
      {children}
      <div className="flex flex-col max-w-[700px] 2xl:max-w-none justify-center gap-y-3.5">
        <h3 className="text-3xl font-bold text-base-300">{title}</h3>
        <p className="text-lg font-medium text-base-300">{description}</p>
      </div>
    </div>
  );
}
