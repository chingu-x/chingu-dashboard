interface SprintPageProps {
  params: {
    teamId: string;
    sprintNumber: string;
  };
}

export default function SprintPage({ params }: SprintPageProps) {
  return (
    <div>
      <h1>{params.teamId}</h1>
      <h2>{params.sprintNumber}</h2>
    </div>
  );
}
