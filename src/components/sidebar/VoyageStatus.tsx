interface VoyageStatusProps {
  isVoyageStarted: boolean;
  voyageData: {
    tier: string;
    team: string;
    voyage: string;
  };
}

export default function VoyageStatus({
  isVoyageStarted,
  voyageData,
}: VoyageStatusProps) {
  return (
    <div className="w-[13.4375rem] h-[9.6875rem] bg-secondary-content rounded-2xl mx-auto px-6 py-4 mb-16">
      <h3 className="text-base-300 text-xl font-semibold text-left">
        Voyage Status
      </h3>
      {isVoyageStarted ? (
        Object.values(voyageData).map((element) => (
          <p
            key={element}
            className="mt-[0.6875rem] h-[1.1875rem] text-base-300 text-base font-medium text-left"
          >
            {element}
          </p>
        ))
      ) : (
        <p className="mt-[0.6875rem] text-base-300 text-base font-medium text-left">
          Please join a voyage to see your status information.
        </p>
      )}
    </div>
  );
}
