import { type MeetingEvent } from "@/dashboard/components/voyage-dashboard/getDashboardData";

export interface Event {
  id: number;
  check: boolean;
  label?: string;
  showRocket?: boolean;
  showDot?: boolean;
  link?: string;
  isDisabled?: boolean;
  meeting?: MeetingEvent;
}
