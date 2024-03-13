interface SprintsPageProps {
  params: {
    teamId: string;
  };
}

export default function SprintsPage({ params }: SprintsPageProps) {
  return <h1>{params.teamId}</h1>;
}
