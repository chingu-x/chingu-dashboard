export type CardType =
  | "Frontend"
  | "CSS Library"
  | "Backend"
  | "Project Management"
  | "Cloud Provider"
  | "Hosting";

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface TeamTechStackItemVote {
  votedBy: {
    member: Member;
  };
}

export interface TeamTechStackItem {
  id: number;
  name: string;
  teamTechStackItemVotes: TeamTechStackItemVote[];
}

export interface TechGroup {
  id: number;
  name: string;
  description: string;
  teamTechStackItems: TeamTechStackItem[];
}

export type TechsResponse = TechGroup[];
