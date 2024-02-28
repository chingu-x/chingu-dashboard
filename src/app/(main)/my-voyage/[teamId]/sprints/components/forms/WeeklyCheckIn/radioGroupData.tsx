import RocketLaunchIcon from "@heroicons/react/24/solid/RocketLaunchIcon";

export const communicationOptions = [
  {
    id: "no_communication",
    value: "no_communication",
    label: "I didn't communicate with my team",
  },
  {
    id: "team_channel_only",
    value: "team_channel_only",
    label: "Only in Team Channel",
  },
  {
    id: "team_meetings_only",
    value: "team_meetings_only",
    label: "Only in Team Meeting(s)",
  },
  {
    id: "team_channel_meetings",
    value: "team_channel_meetings",
    label: "Team Channel + Team Meeting(s)",
  },
];

export const contributionOptions = [
  {
    id: "on_my_own",
    value: "on_my_own",
    label: "Yes, worked on my own",
  },
  {
    id: "another_teammate",
    value: "another_teammate",
    label: "Yes, worked with another teammate",
  },
  {
    id: "both",
    value: "both",
    label: "Yes, worked on my own + with another teammate",
  },
  {
    id: "none",
    value: "none",
    label: "No, I didn't work on the project this past week",
  },
];

export const teamProgress = [
  {
    id: "good",
    value: "good",
    label: (
      <span className="flex items-center gap-x-4">
        <RocketLaunchIcon className="w-6 h-5 text-success" />
        We have had a good start!
      </span>
    ),
  },
  {
    id: "nervous",
    value: "nervous",
    label: (
      <span className="flex items-center gap-x-4">
        <RocketLaunchIcon className="w-6 h-5 text-warning" />
        I&apos;m nervous we won&apos;t finish.
      </span>
    ),
  },
  {
    id: "not_good",
    value: "not_good",
    label: (
      <span className="flex items-center gap-x-4">
        <RocketLaunchIcon className="w-6 h-5 text-error" />
        It doesn&apos;t look good right now
      </span>
    ),
  },
];

export const pairProgrammingTimeOptions = [
  {
    id: "pair_0",
    value: "pair_0",
    label: "0 hrs.",
  },
  {
    id: "pair_1_4",
    value: "pair_1_4",
    label: "1-4 hrs.",
  },
  {
    id: "pair_5-8",
    value: "pair_5-8",
    label: "5-8 hrs.",
  },
  {
    id: "pair_8+",
    value: "pair_8+",
    label: "8+ hrs.",
  },
];

export const onMyOwnTimeOptions = [
  {
    id: "single_0",
    value: "single_0",
    label: "0 hrs.",
  },
  {
    id: "single_1_4",
    value: "single_1_4",
    label: "1-4 hrs.",
  },
  {
    id: "single_5-8",
    value: "single_5-8",
    label: "5-8 hrs.",
  },
  {
    id: "single_8+",
    value: "single_8+",
    label: "8+ hrs.",
  },
];

export const learningTimeOptions = [
  {
    id: "learn_0",
    value: "learn_0",
    label: "0 hrs.",
  },
  {
    id: "learn_1_4",
    value: "learn_1_4",
    label: "1-4 hrs.",
  },
  {
    id: "learn_5-8",
    value: "learn_5-8",
    label: "5-8 hrs.",
  },
  {
    id: "learn_8+",
    value: "learn_8+",
    label: "8+ hrs.",
  },
];

export const teamTimeOptions = [
  {
    id: "team_0",
    value: "team_0",
    label: "0 hrs.",
  },
  {
    id: "team_1_4",
    value: "team_1_4",
    label: "1-4 hrs.",
  },
  {
    id: "team_5-8",
    value: "team_5-8",
    label: "5-8 hrs.",
  },
  {
    id: "team_8+",
    value: "team_8+",
    label: "8+ hrs.",
  },
];

export const deployToProductionOptions = [
  {
    id: "yes",
    value: "yes",
    label: "Yes",
  },
  {
    id: "no",
    value: "no",
    label: "No",
  },
];
