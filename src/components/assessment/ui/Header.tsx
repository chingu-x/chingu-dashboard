import Button from "@/components/Button";

export default function Header() {
  return (
    <div className="absolute left-[250px] top-[75px] h-[136px] w-[1478px] gap-[124px] px-[24px] pt-[24px]">
      <Button className="h-[40px] w-[163px] gap-[8px] rounded-tl-[8px] border-t border-gray-400 bg-[#F5F5F5] px-[20px] py-[12px] text-black">
        Exit Assessment
      </Button>
    </div>
  );
}
