export enum Forms {
  submitProject = 8,
  checkinSM = 5,
  checkinPO = 4,
  checkIn = 3,
  planning = 2,
  review = 1,
  notes = 0,
}

export enum NotesQuestions {
  notes = 0,
}

export enum PlanningQuestions {
  goal = 5,
  timeline = 4,
}

export enum ReviewQuestions {
  what_right = 3,
  what_to_improve = 2,
  what_to_change = 1,
}

export enum UserRole {
  developer = "Developer",
  productOwner = "Product Owner",
  scrumMaster = "Scrum Master",
}
