type CardType =
  | "Frontend"
  | "CSS Library"
  | "Backend"
  | "Project Management"
  | "Cloud Provider"
  | "Hosting";

export interface TechItem {
  id: number;
  value: string;
  users: string[];
}

export const techStack: Record<CardType, TechItem[]> = {
  Frontend: [
    { id: 1, value: "JavaScript", users: ["Tim", "John"] },
    { id: 2, value: "React", users: ["John"] },
    { id: 3, value: "Vue", users: ["Myke", "Josh", "Jack"] },
    { id: 4, value: "Angular", users: ["John"] },
    { id: 5, value: "TypeScript", users: ["Jack", "John"] },
  ],
  "CSS Library": [
    { id: 1, value: "Tailwind", users: ["Tim", "John"] },
    { id: 2, value: "Bootstrap", users: ["John"] },
    { id: 3, value: "Daisy UI", users: ["Myke", "Josh", "Jack"] },
    { id: 4, value: "Vanilla CSS", users: ["John"] },
    { id: 5, value: "Materialize", users: ["Jack", "John"] },
  ],
  Backend: [
    { id: 1, value: "Node", users: ["Tim", "John"] },
    { id: 2, value: "NET", users: ["John"] },
    { id: 3, value: "Ruby", users: ["Myke", "Josh", "Jack"] },
    { id: 4, value: "Java", users: ["John"] },
    { id: 5, value: "Python", users: ["Jack", "John"] },
  ],
  "Project Management": [
    { id: 1, value: "Jira", users: ["Tim", "John"] },
    { id: 2, value: "GitLab", users: ["John"] },
    { id: 3, value: "Trello", users: ["Myke", "Josh", "Jack"] },
    { id: 4, value: "Notion", users: ["John"] },
    { id: 5, value: "Obsidian", users: ["Jack", "John"] },
  ],
  "Cloud Provider": [
    { id: 1, value: "AWS", users: ["Tim", "John"] },
    { id: 2, value: "Azure", users: ["John"] },
    { id: 3, value: "Firebase", users: ["Myke", "Josh", "Jack"] },
    { id: 4, value: "Linode", users: ["John"] },
    { id: 5, value: "Google Cloud", users: ["Jack", "John"] },
  ],
  Hosting: [
    { id: 1, value: "Heroku", users: ["Tim", "John"] },
    { id: 2, value: "Netlify", users: ["John"] },
    { id: 3, value: "Github", users: ["Myke", "Josh", "Jack"] },
    { id: 4, value: "Render", users: ["John"] },
    { id: 5, value: "Bluocean", users: ["Jack", "John"] },
  ],
};
