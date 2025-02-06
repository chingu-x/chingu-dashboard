import Button from "@/components/Button";

export default function AssessmentPage() {
  return (
    <div className="left-[250px] mt-[76px] flex h-[547px] w-[1478px] flex-col items-center justify-center gap-[75px] px-[40px] opacity-0">
      <div>
        <p className="h-[40px] w-[700px]">Hey there tech Wizard!</p>
      </div>
      <div className="flex flex-row">
        <div className="h-[192px] w-[439.33px] gap-[24px] px-[24px]">
          Front End Development
          <Button className="w-full bg-[#217A56] py-[10px] text-black">
            Take Assessment
          </Button>
        </div>
        <div className="h-[192px] w-[439.33px] gap-[24px] px-[24px]">
          Back End Development
          <Button className="w-full bg-[#217A56] py-[10px] text-black">
            Take Assessment
          </Button>
        </div>
        <div className="h-[192px] w-[439.33px] gap-[24px] px-[24px]">
          UX Design
          <Button className="w-full bg-[#217A56] py-[10px] text-black">
            Coming Soon
          </Button>
        </div>
      </div>
    </div>
  );
}

// import Button from "@/components/Button";

// export default function AssessmentPage() {
//   return (
//     <div className="flex h-screen items-center justify-center">
//       <div className="flex h-[547px] w-[1478px] flex-col items-center justify-center gap-[75px] px-[40px] opacity-0">
//         <div>
//           <p className="h-[40px] w-[700px] text-center">
//             Hey there tech Wizard!
//           </p>
//         </div>
//         <div className="flex flex-col items-center gap-[24px]">
//           <div className="flex flex-col items-center">
//             <p>Front End Development</p>
//             <Button className="w-full bg-[#217A56] py-[10px] text-black">
//               Take Assessment
//             </Button>
//           </div>
//           <div className="flex flex-col items-center">
//             <p>Back End Development</p>
//             <Button className="w-full bg-[#217A56] py-[10px] text-black">
//               Take Assessment
//             </Button>
//           </div>
//           <div className="flex flex-col items-center">
//             <p>UX Design</p>
//             <Button className="w-full bg-[#217A56] py-[10px] text-black">
//               Coming Soon
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
