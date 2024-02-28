
interface ModalSectionProps {
  heading:string;
  children:React.ReactNode;
};

export default function ModalSection ({ heading, children }:ModalSectionProps) {
  return(
    <div className="bg-base-200 p-1 mb-4 mt-4  rounded-lg">
      <p className="font-bold">{heading}</p>
      {children}
    </div>
  );
};
