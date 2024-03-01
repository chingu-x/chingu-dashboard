interface FormItemProps {
  children: React.ReactNode;
}

export default function FormItem({ children }: FormItemProps) {
  return (
    <div className="flex flex-col items-center w-full p-10 pb-4 bg-base-100 rounded-2xl">
      <div className="max-w-[650px] w-full flex flex-col gap-y-10">
        {children}
      </div>
    </div>
  );
}
