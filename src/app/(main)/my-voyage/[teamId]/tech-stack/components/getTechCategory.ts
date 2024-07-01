export default function getTechCategory(cardTitle: string) {
  if (cardTitle === "Frontend") {
    return 1;
  }
  if (cardTitle === "CSS Library") {
    return 2;
  }
  if (cardTitle === "Backend") {
    return 3;
  }
  if (cardTitle === "Project Management") {
    return 4;
  }
  if (cardTitle === "Cloud Provider") {
    return 5;
  }
  if (cardTitle === "Hosting") {
    return 6;
  }
}
