function VoteDescriptionCard() {
  return (
    <div className="card w-1/4 h-32 bg-base-content text-neutral-focus rounded-lg">
      <div className="flex flex-col items-start p-4 gap-y-4">
        <h2 className="text-xl font-semibold">Votes</h2>
        <div className="text-base font-medium text-neutral text-left">Vote for the projects you are interested in.</div>
      </div>
    </div>
  );
}

export default VoteDescriptionCard;
