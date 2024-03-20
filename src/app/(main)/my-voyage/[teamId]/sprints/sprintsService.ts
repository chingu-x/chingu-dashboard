"use server";

import { revalidateTag } from "next/cache";
import { getAccessToken } from "@/utils/getCookie";
import { GET, PATCH, POST } from "@/utils/requests";
import { AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { CacheTag } from "@/utils/cacheTag";

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
type FetchMeetingType = Pick<SprintProps, "meetingId">;
type AddMeetingType = Omit<SprintProps, "meetingId">;
type EditMeetingType = Pick<SprintProps, "meetingId">;

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
  title: string;
  dateTime: string;
  meetingLink: string;
  notes: string;
}

interface AddMeetingBody extends MeetingBody {}
interface EditMeetingBody extends Partial<AddMeetingBody> {}

export interface FetchSprintsProps extends FetchSprintsType {}
export interface AddMeetingProps extends AddMeetingType, MeetingBody {}
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
export interface FetchMeetingResponse extends MeetingResponse {
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
export interface AddMeetingResponse extends MeetingResponse {
  title: string;
  dateTime: string;
  meetingLink: string;
  notes: string;
}
export interface EditMeetingResponse extends AddMeetingResponse {}

export async function fetchSprints({
  teamId,
}: FetchSprintsProps): Promise<AsyncActionResponse<FetchSprintsResponse>> {
  const token = getAccessToken();

  const fetchSprintsAsync = () =>
    GET<SprintsResponse>(
      `api/v1/voyages/sprints/teams/${teamId}`,
      token,
      "force-cache",
      CacheTag.sprint
    );

  const [res, error] = await handleAsync(fetchSprintsAsync);
  return [res, error];
}

export async function fetchMeeting({
  meetingId,
}: FetchMeetingType): Promise<AsyncActionResponse<FetchMeetingResponse>> {
  const token = getAccessToken();

  const fetchMeetingAsync = () =>
    GET<FetchMeetingResponse>(
      `api/v1/voyages/sprints/meetings/${meetingId}`,
      token,
      "force-cache",
      CacheTag.sprint
    );

  const [res, error] = await handleAsync(fetchMeetingAsync);
  return [res, error];
}

export async function addMeeting({
  teamId,
  sprintNumber,
  title,
  dateTime,
  meetingLink,
  notes,
}: AddMeetingProps): Promise<AsyncActionResponse<AddMeetingResponse>> {
  const token = getAccessToken();

  const addMeetingAsync = () =>
    POST<AddMeetingBody, AddMeetingResponse>(
      `api/v1/voyages/sprints/${sprintNumber}/teams/${teamId}/meeting`,
      token,
      "default",
      { title, dateTime, meetingLink, notes }
    );

  const [res, error] = await handleAsync(addMeetingAsync);

  if (res) {
    revalidateTag(CacheTag.sprint);
  }

  return [res, error];
}

export async function editMeeting({
  meetingId,
  title,
  dateTime,
  meetingLink,
  notes,
}: EditMeetingProps): Promise<AsyncActionResponse<EditMeetingResponse>> {
  const token = getAccessToken();

  const editMeetingAsync = () =>
    PATCH<EditMeetingBody, EditMeetingResponse>(
      `api/v1/voyages/sprints/meetings/${meetingId}`,
      token,
      "default",
      { title, dateTime, meetingLink, notes }
    );

  const [res, error] = await handleAsync(editMeetingAsync);

  if (res) {
    revalidateTag(CacheTag.sprint);
  }

  return [res, error];
}
