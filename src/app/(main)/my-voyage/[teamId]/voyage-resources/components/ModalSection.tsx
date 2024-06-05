interface ModalSectionProps {
  heading: string;
  children: React.ReactNode;
}

export default function ModalSection({ heading, children }: ModalSectionProps) {
  return (
    <div className="my-4 rounded-lg bg-base-200 px-2 py-1">
      <p className="font-bold">{heading}</p>
      {children}
    </div>
  );
}
