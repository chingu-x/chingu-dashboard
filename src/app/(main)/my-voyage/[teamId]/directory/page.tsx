import DirectoryComponentWrapper from "./components/DirectoryComponentWrapper";

interface DirectoryPageProps {
  params: {
    teamId: string;
  };
}

export default function DirectoryPage({ params }: DirectoryPageProps) {
  return (
    <>
      <DirectoryComponentWrapper params={params} />
    </>
  );
}
