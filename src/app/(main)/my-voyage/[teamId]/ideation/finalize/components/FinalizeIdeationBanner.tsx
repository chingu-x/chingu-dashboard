import Alert from "@/components/Alert";

export default function FinalizeIdeationBanner() {
  return (
    <div className="flex flex-col flex-1 gap-y-4 justify-center max-w-[871px] w-full p-10 bg-base-200 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-base-300">
        Finalize your choices
      </h2>
      <p className="text-base font-medium text-base-300">
        Finalize the project idea that you and your team plan on creating for
        your Voyage!
      </p>
      <div className="w-full">
        <Alert
          context="info"
          message="Important: Your project idea will last your entire Voyage! If changes are needed, 
        you will need admin assistance. It's advisable to collaborate as a team and ensure everyone 
        agrees before finalizing your project idea."
        />
      </div>
    </div>
  );
}
