export default function Sidebar() {
  return (
    <div className="fixed top-[75px] bottom-0 left-0 w-[93px] text-center bg-white border border-black">
      <div className="flex flex-col justify-between h-full">
        <ul className="flex flex-col items-center pt-[24px] h-">
          <li className="w-[24px] h-[24px] bg-black p-[24px] mb-[16px]"></li>
          <li className="w-[24px] h-[24px] bg-black p-[24px] mb-[16px]"></li>
          <li className="w-[24px] h-[24px] bg-black p-[24px] mb-[60px]"></li>
          <li className="w-[24px] h-[24px] bg-black p-[24px]"></li>
        </ul>
        <div className="flex flex-col items-center">
          <div className="bg-black h-[1px] w-full mb-[56px]"></div>
          <div className="w-[24px] h-[24px] bg-black p-[24px]"></div>
        </div>
      </div>
    </div>
  );
}
