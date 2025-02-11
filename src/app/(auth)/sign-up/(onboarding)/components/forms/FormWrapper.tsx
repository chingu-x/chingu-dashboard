interface FormWrapperProps {
  children: React.ReactNode;
}

export default function FormWrapper({ children }: FormWrapperProps) {
  return <div className="flex flex-col gap-1 py-10">{children}</div>;
}
