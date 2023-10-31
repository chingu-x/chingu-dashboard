export type CardType =
  | "Frontend"
  | "CSS Library"
  | "Backend"
  | "Project Management"
  | "Cloud Provider"
  | "Hosting";

export interface PostTechBody {
  votedBy: string;
  techName: string;
  techCategoryId: number;
}

export interface PostTechResponse {
  id: number;
  teamTechId: number;
  teamMemberId: number;
  createdAt: string;
  updatedAt: string;
}

export interface VoteTechResponse {
  id: number;
  teamTechId: number;
  teamMemberId: number;
  createdAt: string;
  updatedAt: string;
}
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
