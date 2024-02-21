import Image from "next/image";

export const topicsCoveredOptions = [
  {
    id: "no_meeting",
    value: "no_meeting",
    label: "We didn't meet",
  },
  {
    id: "sprint_review",
    value: "sprint_review",
    label: "Sprint Review",
  },
  {
    id: "sprint_retrospective",
    value: "sprint_retrospective",
    label: "Sprint Retrospective",
  },
  {
    id: "sprint_planning",
    value: "sprint_planning",
    label: "Sprint Planning",
  },
  {
    id: "other",
    value: "other",
    label: "Other",
  },
];

// TODO: this kind of data will come from the server
export const TeamMembersOptions = [
  {
    id: "1",
    value: "1",
    label: (
      <span className="flex items-center gap-x-2">
        <Image
          width={16}
          height={16}
          className="rounded-full"
          src="https://gravatar.com/avatar/3bfaef00e02a22f99e17c66e7a9fdd31?s=400&d=wavatar&r=x"
          alt="Joso"
        />
        Joso
      </span>
    ),
  },
  {
    id: "2",
    value: "2",
    label: (
      <span className="flex items-center gap-x-2">
        <Image
          width={16}
          height={16}
          className="w-4 h-4 rounded-full"
          src="https://gravatar.com/avatar/3bfaef00e02a22f99e17c66e7a9fdd31?s=400&d=monsterid&r=x"
          alt="Larry"
        />
        Larry
      </span>
    ),
  },
  {
    id: "3",
    value: "3",
    label: (
      <span className="flex items-center gap-x-2">
        <Image
          width={16}
          height={16}
          className="w-4 h-4 rounded-full"
          src="https://gravatar.com/avatar/3bfaef00e02a22f99e17c66e7a9fdd31?s=400&d=identicon&r=x"
          alt="Leonardo"
        />
        Leonardo
      </span>
    ),
  },
  {
    id: "4",
    value: "4",
    label: (
      <span className="flex items-center gap-x-2">
        <Image
          width={16}
          height={16}
          className="w-4 h-4 rounded-full"
          src="https://gravatar.com/avatar/3bfaef00e02a22f99e17c66e7a9fdd31?s=400&d=robohash&r=x"
          alt="Jessica"
        />
        Jessica
      </span>
    ),
  },
];
