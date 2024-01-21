import TeamCardsContainer from "./TeamCardsContainer";
import TeamTable from "./TeamTable";

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
