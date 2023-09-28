import { TeamCardsContainer, TeamTable } from ".";

export default function TeamDirectory() {
  return (
    <>
      {/* For screens > 1920px */}
      <TeamTable />
      {/* For screens < 1920px */}
      <TeamCardsContainer />
    </>
  );
}
