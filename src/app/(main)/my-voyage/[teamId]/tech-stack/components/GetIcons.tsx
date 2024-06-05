import {
  ComputerDesktopIcon,
  SwatchIcon,
  CodeBracketSquareIcon,
  ChartPieIcon,
  CloudIcon,
  ServerStackIcon,
} from "@heroicons/react/24/solid";

export default function GetIcon(cardTitle: string) {
  if (cardTitle === "Frontend") {
    return <ComputerDesktopIcon className="mr-2 w-1/12" />;
  }
  if (cardTitle === "CSS Library") {
    return <SwatchIcon className="mr-2 w-1/12" />;
  }
  if (cardTitle === "Backend") {
    return <CodeBracketSquareIcon className="mr-2 w-1/12" />;
  }
  if (cardTitle === "Project Management") {
    return <ChartPieIcon className="mr-2 w-1/12" />;
  }
  if (cardTitle === "Cloud Provider") {
    return <CloudIcon className="mr-2 w-1/12" />;
  }
  if (cardTitle === "Hosting") {
    return <ServerStackIcon className="mr-2 w-1/12" />;
  }
}
