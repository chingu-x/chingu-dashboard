"use server";

import { revalidateTag } from "next/cache";
import { getAccessToken } from "@/utils/getCookie";
import { DELETE, PATCH, POST } from "@/utils/requests";
import { AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { CacheTag } from "@/utils/cacheTag";

interface SprintProps {
  teamId: number;
  meetingId: number;
  sprintNumber: number;
  agendaId: number;
}

interface MeetingBody {
  title: string;
  dateTime: string;
  meetingLink: string;
  notes: string;
}

interface AgendaTopicBody {
  title: string;
  description: string;
  status: boolean;
}

type FetchSprintsType = Pick<SprintProps, "teamId">;
type FetchMeetingType = Pick<SprintProps, "meetingId">;
type AddMeetingType = Omit<SprintProps, "meetingId" | "agendaId">;
type EditMeetingType = Pick<SprintProps, "meetingId">;
type AddAgendaTopicType = Pick<SprintProps, "meetingId">;
type EditAgendaTopicType = Pick<SprintProps, "agendaId">;
type DeleteAgendaTopicType = Pick<SprintProps, "agendaId">;

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

interface AgendaTopicResponse {
  id: string;
  title: string;
  description: string;
  status: boolean;
}

interface AddMeetingBody extends MeetingBody {}
interface EditMeetingBody extends Partial<AddMeetingBody> {}

interface AddAgendaTopicBody extends Omit<AgendaTopicBody, "status"> {}
interface EditAgendaTopicBody extends Partial<AgendaTopicBody> {}

export interface FetchSprintsProps extends FetchSprintsType {}
export interface FetchMeetingProps extends FetchMeetingType {}
export interface AddMeetingProps extends AddMeetingType, AddMeetingBody {}
export interface EditMeetingProps extends EditMeetingType, EditMeetingBody {}
export interface AddAgendaTopicProps
  extends AddAgendaTopicType,
    AddAgendaTopicBody {}
export interface EditAgendaTopicProps
  extends EditAgendaTopicType,
    EditAgendaTopicBody {}
export interface DeleteAgendaTopicProps extends DeleteAgendaTopicType {}
export interface ChangeAgendaTopicStatusProps
  extends EditAgendaTopicType,
    EditAgendaTopicBody {
  status: boolean;
}

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
export interface AddAgendaTopicResponse extends AgendaTopicResponse {}
export interface EditAgendaTopicResponse extends AddAgendaTopicResponse {}
export interface DeleteAgendaTopicResponse extends AgendaTopicResponse {}

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
      `api/v1/voyages/sprints/${sprintNumber}/teams/${teamId}/meetings`,
      token,
      "default",
      { title, dateTime, meetingLink, notes },
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
      { title, dateTime, meetingLink, notes },
    );

  const [res, error] = await handleAsync(editMeetingAsync);

  if (res) {
    revalidateTag(CacheTag.sprint);
  }

  return [res, error];
}

export async function addAgendaTopic({
  meetingId,
  title,
  description,
}: AddAgendaTopicProps): Promise<AsyncActionResponse<AddAgendaTopicResponse>> {
  const token = getAccessToken();

  const addAgendaTopicAsync = () =>
    POST<AddAgendaTopicBody, AddAgendaTopicResponse>(
      `api/v1/voyages/sprints/meetings/${meetingId}/agendas`,
      token,
      "default",
      { title, description },
    );

  const [res, error] = await handleAsync(addAgendaTopicAsync);

  if (res) {
    revalidateTag(CacheTag.sprint);
  }

  return [res, error];
}

export async function editAgendaTopic({
  agendaId,
  title,
  description,
  status,
}: EditAgendaTopicProps): Promise<
  AsyncActionResponse<EditAgendaTopicResponse>
> {
  const token = getAccessToken();

  const editAgendaTopicAsync = () =>
    PATCH<EditAgendaTopicBody, EditAgendaTopicResponse>(
      `api/v1/voyages/sprints/agendas/${agendaId}`,
      token,
      "default",
      { title, description, status },
    );

  const [res, error] = await handleAsync(editAgendaTopicAsync);

  if (res) {
    revalidateTag(CacheTag.sprint);
  }

  return [res, error];
}

export async function deleteAgendaTopic({
  agendaId,
}: DeleteAgendaTopicProps): Promise<
  AsyncActionResponse<DeleteAgendaTopicResponse>
> {
  const token = getAccessToken();

  const deleteAgendaTopicAsync = () =>
    DELETE<EditAgendaTopicResponse>(
      `api/v1/voyages/sprints/agendas/${agendaId}`,
      token,
      "default",
    );

  const [res, error] = await handleAsync(deleteAgendaTopicAsync);

  if (res) {
    revalidateTag(CacheTag.sprint);
  }

  return [res, error];
}

export async function changeAgendaTopicStatus({
  agendaId,
  status,
}: ChangeAgendaTopicStatusProps): Promise<
  AsyncActionResponse<EditAgendaTopicResponse>
> {
  const token = getAccessToken();

  const changeAgendaTopicStatusAsync = () =>
    PATCH<EditAgendaTopicBody, EditAgendaTopicResponse>(
      `api/v1/voyages/sprints/agendas/${agendaId}`,
      token,
      "default",
      { status },
    );

  const [res, error] = await handleAsync(changeAgendaTopicStatusAsync);

  if (res) {
    revalidateTag(CacheTag.sprint);
  }

  return [res, error];
}
