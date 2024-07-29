import Alert from "@/components/Alert";

export default function FinalizeTechBanner() {
  return (
    <div className="flex h-[266px] w-[871px] flex-1 flex-col justify-center gap-y-4 rounded-2xl bg-base-200 p-10 shadow-md">
      <h2 className="text-2xl font-semibold text-base-300">
        Finalize your choices
      </h2>
      <p className="text-base font-medium text-base-300">
        Finalize the tech stack that you and your team plan on creating for your
        Voyage!
      </p>
      <div className="w-full">
        <Alert
          context="info"
          message="Important: It's advisable to collaborate as a team and 
          ensure everyone agrees before finalizing your tech stack. You will be able to make changes to your tech stack later."
        />
      </div>
    </div>
  );
}
