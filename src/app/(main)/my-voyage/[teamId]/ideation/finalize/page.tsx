import Alert from "@/components/Alert";

export default function page() {
  return (
    <div className="flex items-center w-full h-[200px] p-10 bg-base-200 rounded-2xl shadow-md">
      <div className="flex flex-col w-1/2 gap-y-4">
        <h2 className="font-semibold text-2xl text-base-300">
          Finalize your choices
        </h2>
        <p className="font-medium text-base text-base-300">
          Finalize the project idea that you and your team plan on creating for
          your Voyage!
        </p>
      </div>
      <div className="w-1/2">
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
