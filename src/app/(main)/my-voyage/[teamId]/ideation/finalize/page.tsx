import FinalizeIdeationBanner from "./components/FinalizeIdeationBanner";
import FinalizeIdeationList from "./components/FinalizeIdeationList";

export default function page() {
  return (
    <div className="flex flex-col items-center w-full gap-y-10">
      <FinalizeIdeationBanner />
      <FinalizeIdeationList />
    </div>
  );
}
