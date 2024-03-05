interface ModalSectionProps {
  heading: string;
  children: React.ReactNode;
}

export default function ModalSection({ heading, children }: ModalSectionProps) {
  return (
    <div className="px-2 py-1 my-4 rounded-lg bg-base-200">
      <p className="font-bold">{heading}</p>
      {children}
    </div>
  );
}
