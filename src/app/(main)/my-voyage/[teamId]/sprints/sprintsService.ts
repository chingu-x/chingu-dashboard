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

interface TopicBody {
  title: string;
  description: string;
  status: string;
}

type FetchSprintsType = Pick<SprintProps, "teamId">;
type FetchMeetingType = Pick<SprintProps, "meetingId">;
type AddMeetingType = Omit<SprintProps, "meetingId">;
type EditMeetingType = Pick<SprintProps, "meetingId">;
type AddTopicType = Pick<SprintProps, "meetingId">;
type EditTopicType = Pick<SprintProps, "agendaId">;
type DeleteTopicType = Pick<SprintProps, "agendaId">;

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

interface TopicResponse {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface AddMeetingBody extends MeetingBody {}
interface EditMeetingBody extends Partial<AddMeetingBody> {}

interface AddTopicBody extends Omit<TopicBody, "status"> {}
interface EditTopicBody extends Partial<TopicBody> {}

export interface FetchSprintsProps extends FetchSprintsType {}
export interface FetchMeetingProps extends FetchMeetingType {}
export interface AddMeetingProps extends AddMeetingType, AddMeetingBody {}
export interface EditMeetingProps extends EditMeetingType, EditMeetingBody {}
export interface AddTopicProps extends AddTopicType, AddTopicBody {}
export interface EditTopicProps extends EditTopicType, EditTopicBody {}
export interface DeleteTopicProps extends DeleteTopicType {}

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
export interface AddMeetingResponse extends MeetingResponse {
  id: number;
  title: string;
  dateTime: string;
  meetingLink: string;
  notes: string;
}
export interface EditMeetingResponse extends AddMeetingResponse {}
export interface AddTopicResponse extends TopicResponse {}
export interface EditTopicResponse extends AddTopicResponse {}
export interface DeleteTopicResponse extends TopicResponse {}

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

export async function addTopic({
  meetingId,
  title,
  description,
}: AddTopicProps): Promise<AsyncActionResponse<AddTopicResponse>> {
  const token = getAccessToken();

  const addTopicAsync = () =>
    POST<AddTopicBody, AddTopicResponse>(
      `api/v1/voyages/sprints/${meetingId}/agendas`,
      token,
      "default",
      { title, description },
    );

  const [res, error] = await handleAsync(addTopicAsync);

  if (res) {
    revalidateTag(CacheTag.sprint);
  }

  return [res, error];
}

export async function editTopic({
  agendaId,
  title,
  description,
  status,
}: EditTopicProps): Promise<AsyncActionResponse<EditTopicResponse>> {
  const token = getAccessToken();

  const editTopicAsync = () =>
    PATCH<EditTopicBody, EditTopicResponse>(
      `api/v1/voyages/sprints/agendas/${agendaId}`,
      token,
      "default",
      { title, description, status },
    );

  const [res, error] = await handleAsync(editTopicAsync);

  if (res) {
    revalidateTag(CacheTag.sprint);
  }

  return [res, error];
}

export async function deleteTopic({
  agendaId,
}: DeleteTopicProps): Promise<AsyncActionResponse<DeleteTopicResponse>> {
  const token = getAccessToken();

  const deleteTopicAsync = () =>
    DELETE<EditTopicResponse>(
      `api/v1/voyages/sprints/agendas/${agendaId}`,
      token,
      "default",
    );

  const [res, error] = await handleAsync(deleteTopicAsync);

  if (res) {
    revalidateTag(CacheTag.sprint);
  }

  return [res, error];
}
