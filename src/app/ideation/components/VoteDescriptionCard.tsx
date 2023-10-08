interface VoteDescriptionCardProps {
  className?: string
}

function VoteDescriptionCard({ className }: VoteDescriptionCardProps) {
  return (
    <div className={`card max-w-[200px] w-full max-[1919px]:max-w-[160px] h-28 max-[1919px]:h-32 bg-primary-content rounded-lg ${className}`}>
      <section className="flex flex-col items-start p-4 gap-y-4">
        <h2 className="text-xl font-semibold text-base-300 leading-[24px]">Votes</h2>
        <p className="text-base font-medium text-base-300 text-left leading-[19px]">
          Vote for the projects you are interested in.
        </p>
      </section>
    </div>
  );
}

export default VoteDescriptionCard;
