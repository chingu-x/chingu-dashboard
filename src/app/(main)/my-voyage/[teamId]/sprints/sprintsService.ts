"use server";

import { revalidateTag } from "next/cache";
import { getAccessToken } from "@/utils/getCookie";
import { PATCH, POST } from "@/utils/requests";
import { AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { CacheTag } from "@/utils/cacheTag";
import { getSprintCache } from "@/utils/getSprintCache";

interface SprintProps {
  teamId: number;
  meetingId: number;
  sprintNumber: number;
}

interface MeetingBody {
  title: string;
  dateTime: string;
  meetingLink: string;
  notes: string;
}

type FetchSprintsType = Pick<SprintProps, "teamId">;
type FetchMeetingType = Omit<SprintProps, "teamId">;
type AddMeetingType = Omit<SprintProps, "meetingId">;
type EditMeetingType = Omit<SprintProps, "teamId">;

export interface SprintsResponse {
  id: number;
  name: string;
  voyage: {
    id: number;
    number: string;
    sprints: {
      id: number;
      number: number;
      startDate: string;
      endDate: string;
      teamMeetings: { id: number }[];
    }[];
  };
}

interface MeetingResponse {
  id: number;
  title: string;
  dateTime: string;
  meetingLink: string;
  notes: string;
}

interface AddMeetingBody extends MeetingBody {}
interface EditMeetingBody extends Partial<AddMeetingBody> {}

export interface FetchSprintsProps extends FetchSprintsType {}
export interface FetchMeetingProps extends FetchMeetingType {}
export interface AddMeetingProps extends AddMeetingType, AddMeetingBody {}
export interface EditMeetingProps extends EditMeetingType, EditMeetingBody {}

export interface FetchSprintsResponse extends SprintsResponse {
  voyage: {
    id: number;
    number: string;
    sprints: {
      id: number;
      number: number;
      startDate: string;
      endDate: string;
      teamMeetings: { id: number }[];
    }[];
  };
}

// TODO: will be updated later when agenda types/interfaces are added
export interface FetchMeetingResponse extends MeetingResponse {
  id: number;
  title: string;
  dateTime: string;
  meetingLink: string;
  notes: string;
  agendas: {
    id: number;
    title: string;
    description: string;
    status: boolean;
  }[];
}
export interface AddMeetingResponse extends MeetingResponse {}
export interface EditMeetingResponse extends AddMeetingResponse {}

export async function addMeeting({
  teamId,
  sprintNumber,
  title,
  dateTime,
  meetingLink,
  notes,
}: AddMeetingProps): Promise<AsyncActionResponse<AddMeetingResponse>> {
  const token = getAccessToken();
  const sprintCache = getSprintCache(sprintNumber)!;

  const addMeetingAsync = () =>
    POST<AddMeetingBody, AddMeetingResponse>(
      `api/v1/voyages/sprints/${sprintNumber}/teams/${teamId}/meetings`,
      token,
      "default",
      { title, dateTime, meetingLink, notes },
    );

  const [res, error] = await handleAsync(addMeetingAsync);

  if (res) {
    revalidateTag(CacheTag.sprints);
    revalidateTag(sprintCache);
  }

  return [res, error];
}

export async function editMeeting({
  meetingId,
  sprintNumber,
  title,
  dateTime,
  meetingLink,
  notes,
}: EditMeetingProps): Promise<AsyncActionResponse<EditMeetingResponse>> {
  const token = getAccessToken();
  const sprintCache = getSprintCache(sprintNumber)!;

  const editMeetingAsync = () =>
    PATCH<EditMeetingBody, EditMeetingResponse>(
      `api/v1/voyages/sprints/meetings/${meetingId}`,
      token,
      "default",
      { title, dateTime, meetingLink, notes },
    );

  const [res, error] = await handleAsync(editMeetingAsync);

  if (res) {
    revalidateTag(sprintCache);
  }

  return [res, error];
}
