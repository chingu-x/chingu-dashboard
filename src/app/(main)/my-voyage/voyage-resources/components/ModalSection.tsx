
export default function ModalSection ({ heading, children }:{ heading:string, children:React.ReactNode }) {
  return(
    <div className="bg-base-200 p-1 mb-4">
      <p className="font-bold">{heading}</p>
      {children}
    </div>
  );
};
