interface FormBannerProps {
  title: string;
  description: string;
}

export default function FormBanner({ title, description }: FormBannerProps) {
  return (
    <div className="flex w-full flex-col items-center rounded-2xl bg-base-200 p-10 shadow-md">
      <div className="flex w-full max-w-[650px] flex-col gap-y-4">
        <h2 className="text-[30px] font-bold">{title}</h2>
        <p className="text-lg font-medium">{description}</p>
      </div>
    </div>
  );
}
