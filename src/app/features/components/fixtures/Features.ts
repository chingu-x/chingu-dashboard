export interface Feature {
  id: number;
  description: string;
  order: number;
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

export interface FeaturesList {
  categoryId: number;
  categoryName: string;
  features: Feature[];
}

export const featuresLists: FeaturesList[] = [
  {
    categoryId: 25,
    categoryName: "must have",
    features: [
      {
        id: 50,
        description: "User Accounts",
        order: 0,
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
        order: 1,
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
        order: 2,
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
        id: 62,
        description: "Stripe integration",
        order: 3,
        teamMemberId: 36,
        category: {
          id: 25,
          name: "must have",
        },
        addedBy: {
          member: {
            id: "dff75faa-1f39-446d-a60c-9589e5ead90f",
            avatar:
              "https://gravatar.com/avatar/3bfaef00e02a22f99e17c66e7a9fdd31?s=400&d=identicon&r=x",
            firstName: "Leonarda",
            lastName: "Rowe",
          },
        },
      },
    ],
  },
  {
    categoryId: 26,
    categoryName: "should have",
    features: [
      {
        id: 49,
        description: "Themes",
        order: 0,
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
        id: 54,
        description: "Save links",
        order: 1,
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
      {
        id: 55,
        description: "Charts and Graphs",
        order: 2,
        teamMemberId: 34,
        category: {
          id: 26,
          name: "should have",
        },
        addedBy: {
          member: {
            id: "3eca1a73-01aa-448c-8410-dce17ff08938",
            avatar:
              "https://gravatar.com/avatar/3bfaef00e02a22f99e17c66e7a9fdd31?s=400&d=robohash&r=x",
            firstName: "Jessica",
            lastName: "Williamson",
          },
        },
      },
      {
        id: 56,
        description: "Chat",
        order: 3,
        teamMemberId: 34,
        category: {
          id: 26,
          name: "should have",
        },
        addedBy: {
          member: {
            id: "dff75faa-1f39-446d-a60c-9589e5ead90f",
            avatar:
              "https://gravatar.com/avatar/3bfaef00e02a22f99e17c66e7a9fdd31?s=400&d=identicon&r=x",
            firstName: "Leonarda",
            lastName: "Rowe",
          },
        },
      },
      {
        id: 57,
        description: "Share images",
        order: 4,
        teamMemberId: 34,
        category: {
          id: 26,
          name: "should have",
        },
        addedBy: {
          member: {
            id: "3eca1a73-01aa-448c-8410-dce17ff08938",
            avatar:
              "https://gravatar.com/avatar/3bfaef00e02a22f99e17c66e7a9fdd31?s=400&d=robohash&r=x",
            firstName: "Jessica",
            lastName: "Williamson",
          },
        },
      },
      {
        id: 60,
        description: "Notifications",
        order: 5,
        teamMemberId: 36,
        category: {
          id: 26,
          name: "should have",
        },
        addedBy: {
          member: {
            id: "dff75faa-1f39-446d-a60c-9589e5ead90f",
            avatar:
              "https://gravatar.com/avatar/3bfaef00e02a22f99e17c66e7a9fdd31?s=400&d=identicon&r=x",
            firstName: "Leonarda",
            lastName: "Rowe",
          },
        },
      },
      {
        id: 61,
        description: "Mobile app",
        order: 6,
        teamMemberId: 36,
        category: {
          id: 26,
          name: "should have",
        },
        addedBy: {
          member: {
            id: "dff75faa-1f39-446d-a60c-9589e5ead90f",
            avatar:
              "https://gravatar.com/avatar/3bfaef00e02a22f99e17c66e7a9fdd31?s=400&d=identicon&r=x",
            firstName: "Leonarda",
            lastName: "Rowe",
          },
        },
      },
    ],
  },
  {
    categoryId: 27,
    categoryName: "nice to have",
    features: [
      {
        id: 53,
        description: "Share on LinkedIn",
        order: 0,
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
        id: 58,
        description: "Share PDF",
        order: 1,
        teamMemberId: 36,
        category: {
          id: 27,
          name: "nice to have",
        },
        addedBy: {
          member: {
            id: "dff75faa-1f39-446d-a60c-9589e5ead90f",
            avatar:
              "https://gravatar.com/avatar/3bfaef00e02a22f99e17c66e7a9fdd31?s=400&d=identicon&r=x",
            firstName: "Leonarda",
            lastName: "Rowe",
          },
        },
      },
      {
        id: 59,
        description: "Upload files",
        order: 2,
        teamMemberId: 36,
        category: {
          id: 27,
          name: "nice to have",
        },
        addedBy: {
          member: {
            id: "dff75faa-1f39-446d-a60c-9589e5ead90f",
            avatar:
              "https://gravatar.com/avatar/3bfaef00e02a22f99e17c66e7a9fdd31?s=400&d=identicon&r=x",
            firstName: "Leonarda",
            lastName: "Rowe",
          },
        },
      },
    ],
  },
];
