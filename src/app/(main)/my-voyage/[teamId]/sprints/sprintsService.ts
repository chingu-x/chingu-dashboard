"use server";

import { revalidateTag } from "next/cache";
import { getAccessToken } from "@/utils/getCookie";
import { DELETE, PATCH, POST } from "@/utils/requests";
import { handleAsync } from "@/utils/handleAsync";
import { type AsyncActionResponse } from "@/utils/handleAsync";
import { CacheTag } from "@/utils/cacheTag";
import { getSprintCache } from "@/utils/getSprintCache";

interface SprintProps {
  teamId: number;
  meetingId: number;
  sprintNumber: number;
  agendaId: number;
  formId: number;
}

interface MeetingBody {
  title: string;
  description: string;
  dateTime: string;
  meetingLink?: string;
  notes: string;
}

interface AgendaTopicBody {
  title: string;
  description: string;
  status: boolean;
}

interface SectionBody {
  responses: {
    questionId: number;
    optionChoiceId?: number;
    text?: string;
    boolean?: boolean;
    numeric?: number;
    responseGroupId?: number;
  }[];
}

interface CheckInFormBody {
  voyageTeamMemberId: number;
  sprintId: number;
  responses: {
    questionId: number;
    text?: string;
    optionChoiceId?: number;
    boolean?: boolean;
    numeric?: number;
  }[];
}

interface VoyageFormBody {
  voyageTeamId: number;
  responses: {
    questionId: number;
    text?: string;
    optionChoiceId?: number;
    boolean?: boolean;
    numeric?: number;
  }[];
}

type FetchSprintsType = Pick<SprintProps, "teamId">;
type FetchMeetingType = Pick<SprintProps, "meetingId" | "sprintNumber">;

type AddMeetingType = Pick<SprintProps, "teamId" | "sprintNumber">;
type EditMeetingType = Pick<SprintProps, "meetingId" | "sprintNumber">;

type AddAgendaTopicType = Pick<SprintProps, "meetingId" | "sprintNumber">;
type EditAgendaTopicType = Pick<SprintProps, "agendaId" | "sprintNumber">;
type DeleteAgendaTopicType = Pick<SprintProps, "agendaId" | "sprintNumber">;

type AddSectionType = Pick<
  SprintProps,
  "sprintNumber" | "meetingId" | "formId"
>;
type EditSectionType = Pick<
  SprintProps,
  "sprintNumber" | "meetingId" | "formId"
>;

export interface SprintsResponse {
  id: number;
  number: string;
  soloProjectDeadline: string;
  certificateIssueDate: string;
  showcasePublishDate: string;
  startDate: string;
  endDate: string;
  sprints: {
    id: number;
    number: number;
    startDate: string;
    endDate: string;
    teamMeetings: number[];
  }[];
}

interface MeetingResponse {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  meetingLink: string;
  notes: string;
}

interface AgendaTopicResponse {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

interface NewEmptySectionResponse {
  id: number;
  formId: number;
  meetingId: number;
  responseGroupId: number;
}

interface SectionResponse {
  id: number;
  questionId: number;
  optionChoiceId: number;
  numeric: number;
  boolean: boolean;
  text: string;
  responseGroupId: number;
}

interface FormResponse {
  id: number;
  sprintId: number;
  responseGroupId: number;
}

interface AddMeetingBody extends Omit<MeetingBody, "notes"> {}
interface EditMeetingBody extends Partial<MeetingBody> {}

interface AddAgendaTopicBody extends Omit<AgendaTopicBody, "status"> {}
interface EditAgendaTopicBody extends Partial<AgendaTopicBody> {}

interface AddSectionBody {}
export interface EditSectionBody extends Partial<SectionBody> {}

interface SubmitCheckInFormBody extends CheckInFormBody {}
interface SubmitVoyageFormBody extends VoyageFormBody {}

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
export interface ChangeAgendaTopicStatusProps
  extends EditAgendaTopicType,
    EditAgendaTopicBody {
  status: boolean;
}
export interface DeleteAgendaTopicProps extends DeleteAgendaTopicType {}

export interface AddSectionProps extends AddSectionType {}
export interface EditSectionProps extends EditSectionType, EditSectionBody {}

export interface SubmitCheckInFormProps extends CheckInFormBody {}
export interface SubmitVoyageFormProps extends VoyageFormBody {}

export interface FetchSprintsResponse extends SprintsResponse {}

export interface FetchMeetingResponse extends MeetingResponse {
  id: number;
  sprint: {
    id: number;
    number: number;
  };
  title: string;
  dateTime: string;
  meetingLink: string;
  notes: string;
  agendas: {
    id: number;
    title: string;
    description: string;
    status: boolean;
    updatedAt: string;
  }[];
  formResponseMeeting: {
    form: {
      id: number;
    };
    responseGroup: {
      responses: {
        question: {
          id: number;
        };
        text: string;
      }[];
    };
  }[];
}
export interface AddMeetingResponse extends MeetingResponse {}
export interface EditMeetingResponse extends MeetingResponse {}

export interface AddAgendaTopicResponse extends AgendaTopicResponse {}
export interface EditAgendaTopicResponse extends AgendaTopicResponse {}
export interface DeleteAgendaTopicResponse extends AgendaTopicResponse {}

export interface AddSectionResponse extends NewEmptySectionResponse {}
export interface EditSectionResponse extends SectionResponse {}

export interface SubmitCheckInFormResponse extends FormResponse {}
export interface SubmitVoyageFormResponse extends FormResponse {}

export async function addMeeting({
  teamId,
  sprintNumber,
  title,
  description,
  dateTime,
  meetingLink,
}: AddMeetingProps): Promise<AsyncActionResponse<AddMeetingResponse>> {
  const token = getAccessToken();
  const sprintCache = getSprintCache(sprintNumber)!;

  const addMeetingAsync = () =>
    POST<AddMeetingBody, AddMeetingResponse>(
      `api/v1/voyages/sprints/${sprintNumber}/teams/${teamId}/meetings`,
      token,
      "default",
      { title, dateTime, meetingLink, description },
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
  description,
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
      { title, dateTime, meetingLink, notes, description },
    );

  const [res, error] = await handleAsync(editMeetingAsync);

  if (res) {
    revalidateTag(sprintCache);
  }

  return [res, error];
}

export async function addAgendaTopic({
  meetingId,
  sprintNumber,
  title,
  description,
}: AddAgendaTopicProps): Promise<AsyncActionResponse<AddAgendaTopicResponse>> {
  const token = getAccessToken();
  const sprintCache = getSprintCache(sprintNumber)!;

  const addAgendaTopicAsync = () =>
    POST<AddAgendaTopicBody, AddAgendaTopicResponse>(
      `api/v1/voyages/sprints/meetings/${meetingId}/agendas`,
      token,
      "default",
      { title, description },
    );

  const [res, error] = await handleAsync(addAgendaTopicAsync);

  if (res) {
    revalidateTag(sprintCache);
  }

  return [res, error];
}

export async function editAgendaTopic({
  sprintNumber,
  agendaId,
  title,
  description,
  status,
}: EditAgendaTopicProps): Promise<
  AsyncActionResponse<EditAgendaTopicResponse>
> {
  const token = getAccessToken();
  const sprintCache = getSprintCache(sprintNumber)!;

  const editAgendaTopicAsync = () =>
    PATCH<EditAgendaTopicBody, EditAgendaTopicResponse>(
      `api/v1/voyages/sprints/agendas/${agendaId}`,
      token,
      "default",
      { title, description, status },
    );

  const [res, error] = await handleAsync(editAgendaTopicAsync);

  if (res) {
    revalidateTag(sprintCache);
  }

  return [res, error];
}

export async function deleteAgendaTopic({
  sprintNumber,
  agendaId,
}: DeleteAgendaTopicProps): Promise<
  AsyncActionResponse<DeleteAgendaTopicResponse>
> {
  const token = getAccessToken();
  const sprintCache = getSprintCache(sprintNumber)!;

  const deleteAgendaTopicAsync = () =>
    DELETE<DeleteAgendaTopicResponse>(
      `api/v1/voyages/sprints/agendas/${agendaId}`,
      token,
      "default",
    );

  const [res, error] = await handleAsync(deleteAgendaTopicAsync);

  if (res) {
    revalidateTag(sprintCache);
  }

  return [res, error];
}

export async function changeAgendaTopicStatus({
  sprintNumber,
  agendaId,
  status,
}: ChangeAgendaTopicStatusProps): Promise<
  AsyncActionResponse<EditAgendaTopicResponse>
> {
  const token = getAccessToken();
  const sprintCache = getSprintCache(sprintNumber)!;

  const changeAgendaTopicStatusAsync = () =>
    PATCH<EditAgendaTopicBody, EditAgendaTopicResponse>(
      `api/v1/voyages/sprints/agendas/${agendaId}`,
      token,
      "default",
      { status },
    );

  const [res, error] = await handleAsync(changeAgendaTopicStatusAsync);

  if (res) {
    revalidateTag(sprintCache);
  }

  return [res, error];
}

export async function addSection({
  sprintNumber,
  meetingId,
  formId,
}: AddSectionProps): Promise<AsyncActionResponse<AddSectionResponse>> {
  const token = getAccessToken();
  const sprintCache = getSprintCache(sprintNumber)!;

  const addSectionAsync = () =>
    POST<AddSectionBody, AddSectionResponse>(
      `api/v1/voyages/sprints/meetings/${meetingId}/forms/${formId}`,
      token,
      "default",
    );

  const [res, error] = await handleAsync(addSectionAsync);

  if (res) {
    revalidateTag(sprintCache);
  }

  return [res, error];
}

export async function editSection({
  sprintNumber,
  meetingId,
  formId,
  responses,
}: EditSectionProps): Promise<AsyncActionResponse<EditSectionResponse>> {
  const token = getAccessToken();
  const sprintCache = getSprintCache(sprintNumber)!;

  const editSectionAsync = () =>
    PATCH<EditSectionBody, EditSectionResponse>(
      `api/v1/voyages/sprints/meetings/${meetingId}/forms/${formId}`,
      token,
      "default",
      { responses },
    );

  const [res, error] = await handleAsync(editSectionAsync);

  if (res) {
    revalidateTag(sprintCache);
  }

  return [res, error];
}

export async function submitCheckInForm({
  voyageTeamMemberId,
  sprintId,
  responses,
}: SubmitCheckInFormProps): Promise<
  AsyncActionResponse<SubmitCheckInFormResponse>
> {
  const token = getAccessToken();

  const editSectionAsync = () =>
    POST<SubmitCheckInFormBody, SubmitCheckInFormResponse>(
      "api/v1/voyages/sprints/check-in",
      token,
      "default",
      { voyageTeamMemberId, sprintId, responses },
    );

  const [res, error] = await handleAsync(editSectionAsync);

  if (res) {
    revalidateTag(CacheTag.me);
  }

  return [res, error];
}

export async function submitVoyageProjectForm({
  voyageTeamId,
  responses,
}: SubmitVoyageFormProps): Promise<
  AsyncActionResponse<SubmitVoyageFormResponse>
> {
  const token = getAccessToken();

  const editSectionAsync = () =>
    POST<SubmitVoyageFormBody, SubmitVoyageFormResponse>(
      "api/v1/voyages/submit-project",
      token,
      "default",
      { voyageTeamId, responses },
    );

  const [res, error] = await handleAsync(editSectionAsync);

  if (res) {
    revalidateTag(CacheTag.me);
  }

  return [res, error];
}
