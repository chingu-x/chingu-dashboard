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
    <div className="mx-auto mb-16 h-[9.6875rem] w-[13.4375rem] rounded-2xl bg-secondary-content px-6 py-4">
      <h3 className="text-left text-xl font-semibold text-base-300">
        Voyage Status
      </h3>
      {isVoyageStarted ? (
        Object.values(voyageData).map((element) => (
          <p
            key={element}
            className="mt-[0.6875rem] h-[1.1875rem] text-left text-base font-medium text-base-300"
          >
            {element}
          </p>
        ))
      ) : (
        <p className="mt-[0.6875rem] text-left text-base font-medium text-base-300">
          Please join a voyage to see your status information.
        </p>
      )}
    </div>
  );
}
