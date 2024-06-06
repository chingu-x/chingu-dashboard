interface FormItemProps {
  children: React.ReactNode;
}

export default function FormItem({ children }: FormItemProps) {
  return (
    <div className="flex w-full flex-col items-center rounded-2xl bg-base-100 p-10 pb-4">
      <div className="flex w-full max-w-[650px] flex-col gap-y-10">
        {children}
      </div>
    </div>
  );
}
