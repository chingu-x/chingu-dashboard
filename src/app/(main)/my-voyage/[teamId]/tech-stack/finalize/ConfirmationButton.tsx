import Spinner from "@/components/Spinner";
import Button from "@/components/Button";

export default function ConfirmationButton() {
  const spinning = false;

  function renderButtonContent() {
    if (spinning) {
      return <Spinner />;
    }
    return "Finalize Tech Stack Selection.";
  }

  return (
    <Button
      variant="secondary"
      disabled={spinning}
      className="mb-4 mt-10 w-full"
      onClick={undefined}
    >
      {renderButtonContent()}
    </Button>
  );
}
