function VoteDescriptionCard() {
  return (
    <div className="card w-1/3 h-32 bg-primary-content rounded-lg">
      <section className="flex flex-col items-start p-4 gap-y-4">
        <h2 className="text-xl font-semibold text-neutral-focus">Votes</h2>
        <p className="text-base font-medium text-neutral text-left">
          Vote for the projects you are interested in.
        </p>
      </section>
    </div>
  );
}

export default VoteDescriptionCard;
