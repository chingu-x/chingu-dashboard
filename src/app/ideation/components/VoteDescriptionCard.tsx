function VoteDescriptionCard({ className }: { className?: string }) {
  return (
    <div className={`card min-w-[200px] w-[200px] h-32 bg-primary-content rounded-lg ${className}`}>
      <section className="flex flex-col items-start p-4 gap-y-4">
        <h2 className="text-xl font-semibold text-base-300">Votes</h2>
        <p className="text-base font-medium text-base-300 text-left">
          Vote for the projects you are interested in.
        </p>
      </section>
    </div>
  );
}

export default VoteDescriptionCard;
