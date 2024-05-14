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
    <div className="flex flex-col w-full gap-y-10 max-w-[871px] px-10 mx-auto">
      <FormBanner title={title} description={description} />
      {children}
    </div>
  );
}
