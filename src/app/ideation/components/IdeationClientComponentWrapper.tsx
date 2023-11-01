"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import IdeationContainer from "./IdeationContainer";
import { useAppSelector } from "@/store/hooks";
import { fetchProjectIdeas } from "@/api/ideationService";
import { fetchIdeations, setLoading } from "@/store/features/ideation/ideationSlice";
// import { ideation } from "./fixtures/ideation";

const TEAMID = 1;

function IdeationClientComponentWrapper() {
  const { projectIdeas, loading } = useAppSelector((state) => state.ideation);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const data =  await fetchProjectIdeas({ teamId: TEAMID });
      dispatch(fetchIdeations(data));
    }

    dispatch(setLoading(true));

    fetchData().catch((err) => console.log(err));

    dispatch(setLoading(false));
  }, [dispatch]);

  return (
    <>
      {loading && <span className="loading loading-spinner text-primary"></span>}
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
