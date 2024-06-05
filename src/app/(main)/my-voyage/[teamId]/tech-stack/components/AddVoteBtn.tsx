import Button from "@/components/Button";

export default function AddVoteBtn() {
  return (
    <div className="col-span-3 flex justify-end">
      <Button variant="primary" size="xs" className="rounded-3xl font-semibold">
        Add Vote
      </Button>
    </div>
  );
}
