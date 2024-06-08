import FormBanner from "./FormBanner";

interface BaseFormPageProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function BaseFormPage({
  title,
  description,
  children,
}: BaseFormPageProps) {
  return (
    <div className="mx-auto flex w-full max-w-[871px] flex-col gap-y-10 px-10">
      <FormBanner title={title} description={description} />
      {children}
    </div>
  );
}
