interface FormBannerProps {
  title: string;
  description: string;
}

export default function FormBanner({ title, description }: FormBannerProps) {
  return (
    <div className="flex flex-col items-center w-full p-10 shadow-md bg-base-200 rounded-2xl">
      <div className="flex flex-col gap-y-4 max-w-[650px] w-full">
        <h2 className="text-[30px] font-bold">{title}</h2>
        <p className="text-lg font-medium">{description}</p>
      </div>
    </div>
  );
}
