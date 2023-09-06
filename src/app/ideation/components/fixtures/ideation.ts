export interface Ideation {
  id?: number;
  title: string;
  project_idea: string;
  vision_statement: string;
  users: string[];
  contributed_by: {
    name: string;
    avatar?: string;
  };
  voted: boolean;
  own_idea: boolean;
}

export const ideation = [
  {
    id: 1,
    title: "Real Estate Crowdsourcing",
    project_idea: `A real estate crowdsourcing application is a platform that allows
          individuals to invest in real estate properties without needing to
          purchase entire properties themselves. Through the application,
          investors can pool their money together to fund a real estate project,
          and then receive a portion of the profits once the project is
          complete. The platform typically offers a range of real estate
          projects for investors to choose from, and provides tools to help
          investors track their investments and receive regular updates on the
          progress of each project.`,
    vision_statement: `Our vision is to democratize real estate investment by creating an
          inclusive platform that enables everyone to invest in real estate
          projects, regardless of their financial status. We strive to provide a
          seamless experience for our users by offering a wide range of
          investment options and easy-to-use tools to monitor their investments.
          Our goal is to empower individuals to take control of their financial
          future and build wealth through real estate investments.`,
    users: ["Test User 1", "Test User 2", "Test User 3"],
    contributed_by: {
      name: "Test User 1",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&usqp=CAU",
    },
    voted: true,
    own_idea: true,
  },
  {
    id: 2,
    title: "Toys Exchange App",
    project_idea: `A toy exchange app is an online platform where users can trade or swap toys with each other. The app 
      may include features like listing available toys for trade, searching for specific toys, messaging with 
      other users to arrange exchanges, and rating the reliability of other users. This type of app can be a great 
      way for families to save money by swapping gently used toys instead of buying new ones.`,
    vision_statement: `Our vision for a toy exchange app is an online platform where users can trade or swap toys 
    with each other. The app may include features like listing available toys for trade, searching for specific toys, 
    messaging with other users to arrange exchanges, and rating the reliability of other users. This type of app can be a 
    great way for families to save money by swapping gently used toys instead of buying new ones.`,
    users: ["Test User 1", "Test User 2"],
    contributed_by: {
      name: "Test User 2",
    },
    voted: false,
    own_idea: false,
  },
];
