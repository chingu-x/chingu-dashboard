"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useAppSelector } from "@/store/hooks";
import IdeationContainer from "./IdeationContainer";
import { fetchProjectIdeas } from "@/app/(main)/my-voyage/ideation/ideationService";
import {
  fetchIdeations,
  setLoading,
  IdeationData,
} from "@/store/features/ideation/ideationSlice";
import { useAppSelector } from "@/store/hooks";
// import IdeationContainer from "@/app/(main)/my-voyage/ideation/components/IdeationContainer";
// import { ideation } from "./fixtures/ideation";

function IdeationClientComponentWrapper() {
  const { projectIdeas, loading } = useAppSelector((state) => state.ideation);
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  const currentVoyageTeam = user.voyageTeamMembers.find(
    (voyage) => voyage.voyageTeam.voyage.status.name === "Active"
  );
  const teamId = currentVoyageTeam?.voyageTeamId;

  useEffect(() => {
    async function fetchData() {
      dispatch(setLoading(true));
      let data = [] as IdeationData[];

      if (teamId) {
        data = await fetchProjectIdeas({ teamId });
        dispatch(fetchIdeations(data));
      }

      dispatch(setLoading(false));
    }

    fetchData().catch((err) => console.log(err));
  }, [dispatch, teamId]);

  return (
    <>
      {loading && (
        <span className="loading loading-spinner text-primary"></span>
      )}
      {projectIdeas.map((projectIdea) => (
        <IdeationContainer
          key={projectIdea.id}
          title={projectIdea.title}
          project_idea={projectIdea.description}
          vision_statement={projectIdea.vision}
          users={projectIdea.projectIdeaVotes}
          contributed_by={projectIdea.contributedBy}
        />
      ))}
    </>
  );
}

export default IdeationClientComponentWrapper;
