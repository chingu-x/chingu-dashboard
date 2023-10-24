export type CardType =
  | "Frontend"
  | "CSS Library"
  | "Backend"
  | "Project Management"
  | "Cloud Provider"
  | "Hosting";

export interface TechStack {
  id: number;
  name: string;
  description: string;
  teamTechStackItems: TeamTechStackItems[];
}

export interface TeamTechStackItems {
  id: number;
  name: string;
  teamTechStackItemVotes: TeamTechStackItemVotes[];
}

export interface TeamTechStackItemVotes {
  votedBy: User;
}

export interface User {
  member: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
}

export type TechsResponse = TechStack[];
