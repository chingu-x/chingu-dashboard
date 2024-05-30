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
    return <ComputerDesktopIcon className="w-1/12 h-1/12 mr-2" />;
  }
  if (cardTitle === "CSS Library") {
    return <SwatchIcon className="w-1/12 h-1/12 mr-2" />;
  }
  if (cardTitle === "Backend") {
    return <CodeBracketSquareIcon className="w-1/12 h-1/12 mr-2" />;
  }
  if (cardTitle === "Project Management") {
    return <ChartPieIcon className="w-1/12 h-1/12 mr-2" />;
  }
  if (cardTitle === "Cloud Provider") {
    return <CloudIcon className="w-1/12 h-1/12 mr-2" />;
  }
  if (cardTitle === "Hosting") {
    return <ServerStackIcon className="w-1/12 h-1/12 mr-2" />;
  }
}
