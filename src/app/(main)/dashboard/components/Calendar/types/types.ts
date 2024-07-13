import { type Event } from "@/dashboard/components/voyage-dashboard/getDashboardData";

export interface CalendarEvent {
  id: number;
  check: boolean;
  label?: string;
  showRocket?: boolean;
  showDot?: boolean;
  link?: string;
  isDisabled?: boolean;
  meeting?: Event;
}
