export interface Feature {
  id: number;
  description: string;
  teamMemberId: number;
  category: {
    id: number;
    name: string;
  };
  addedBy: {
    member: {
      id: string;
      avatar: string;
      firstName: string;
      lastName: string;
    };
  };
}

export const features: Feature[] = [
  {
    id: 49,
    description: "Themes",
    teamMemberId: 33,
    category: {
      id: 26,
      name: "should have",
    },
    addedBy: {
      member: {
        id: "25b7b76c-1567-4910-9d50-e78819daccf1",
        avatar:
          "https://gravatar.com/avatar/3bfaef00e02a22f99e17c66e7a9fdd31?s=400&d=wavatar&r=x",
        firstName: "Joso",
        lastName: "Mađar",
      },
    },
  },
  {
    id: 50,
    description: "User Accounts",
    teamMemberId: 33,
    category: {
      id: 25,
      name: "must have",
    },
    addedBy: {
      member: {
        id: "25b7b76c-1567-4910-9d50-e78819daccf1",
        avatar:
          "https://gravatar.com/avatar/3bfaef00e02a22f99e17c66e7a9fdd31?s=400&d=wavatar&r=x",
        firstName: "Joso",
        lastName: "Mađar",
      },
    },
  },
  {
    id: 51,
    description: "Admin dashboard",
    teamMemberId: 33,
    category: {
      id: 25,
      name: "must have",
    },
    addedBy: {
      member: {
        id: "25b7b76c-1567-4910-9d50-e78819daccf1",
        avatar:
          "https://gravatar.com/avatar/3bfaef00e02a22f99e17c66e7a9fdd31?s=400&d=wavatar&r=x",
        firstName: "Joso",
        lastName: "Mađar",
      },
    },
  },
  {
    id: 52,
    description: "Friend List",
    teamMemberId: 35,
    category: {
      id: 25,
      name: "must have",
    },
    addedBy: {
      member: {
        id: "5d6eb1aa-6e9c-4b26-a363-6a35e5d76daa",
        avatar:
          "https://gravatar.com/avatar/3bfaef00e02a22f99e17c66e7a9fdd31?s=400&d=monsterid&r=x",
        firstName: "Larry",
        lastName: "Castro",
      },
    },
  },
  {
    id: 53,
    description: "Share on LinkedIn",
    teamMemberId: 35,
    category: {
      id: 27,
      name: "nice to have",
    },
    addedBy: {
      member: {
        id: "5d6eb1aa-6e9c-4b26-a363-6a35e5d76daa",
        avatar:
          "https://gravatar.com/avatar/3bfaef00e02a22f99e17c66e7a9fdd31?s=400&d=monsterid&r=x",
        firstName: "Larry",
        lastName: "Castro",
      },
    },
  },
  {
    id: 54,
    description: "Save links",
    teamMemberId: 35,
    category: {
      id: 26,
      name: "should have",
    },
    addedBy: {
      member: {
        id: "5d6eb1aa-6e9c-4b26-a363-6a35e5d76daa",
        avatar:
          "https://gravatar.com/avatar/3bfaef00e02a22f99e17c66e7a9fdd31?s=400&d=monsterid&r=x",
        firstName: "Larry",
        lastName: "Castro",
      },
    },
  },
];
