import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { UseMutateFunction } from "@tanstack/react-query";
import type {
  DeleteAgendaTopicClientRequestDto,
  DeleteAgendaTopicResponseDto,
} from "@chingu-x/modules/sprint-meeting";
import {
  type DeleteResourceProps,
  type DeleteResourceResponse,
} from "@/myVoyage/voyage-resources/resourcesService";
import { type DeleteFeatureProps } from "@/myVoyage/features/featuresService";
import { type DeleteTechItemProps } from "@/app/(main)/my-voyage/[teamId]/tech-stack/techStackService";
import type {
  DeleteIdeationProps,
  DeleteIdeationResponse,
} from "@/app/(main)/my-voyage/[teamId]/ideation/ideationService";
import { deleteAgendaMutation } from "@/app/(main)/my-voyage/[teamId]/sprints/components/forms/AgendaTopicForm";

export type ModalType =
  | "error"
  | "gettingHelp"
  | "confirmation"
  | "viewResource"
  | "checkInSuccess";

interface ModalState {
  id?: number;
  type: ModalType | undefined;
  isOpen: boolean;
  content?: ContentPayload;
  payload?: DeletePayload;
}

export interface BaseModalOpenActionPayload {
  id?: number;
  type: Exclude<ModalType, "error" | "confirmation">;
  content?: ContentPayload;
  payload?: DeletePayload;
}

export interface ErrorModalOpenActionPayload
  extends Omit<BaseModalOpenActionPayload, "type"> {
  type: "error";
  content: Required<Pick<ContentPayload, "message">>;
}

export interface ConfirmationModalOpenActionPayload
  extends Omit<BaseModalOpenActionPayload, "type"> {
  type: "confirmation";
  content: Required<ContentPayload>;
  payload: Required<DeletePayload>;
}

export interface ContentPayload {
  title?: string;
  message?: string;
  confirmationText?: string;
  cancelText?: string;
}

export interface DeletePayload {
  params?: DeleteProps;
  deleteFunction?: DeleteFunctionTypes;
}

export type DeleteProps = DeleteAgendaTopicProps | DeleteIdeationsProps;

interface DeleteIdeationsProps {
  teamId: string;
}

interface DeleteAgendaTopicProps {
  agendaId: string;
}

type DeleteFunctionTypes = UseMutateFunction<
  DeleteAgendaTopicResponseDto,
  Error,
  DeleteAgendaTopicClientRequestDto,
  unknown
>;

export type ModalOpenActionPayload =
  | BaseModalOpenActionPayload
  | ErrorModalOpenActionPayload
  | ConfirmationModalOpenActionPayload;

const initialState: ModalState = {
  id: 0,
  type: undefined,
  isOpen: false,
  content: {},
  payload: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpenModal: (
      state: ModalState,
      action: PayloadAction<ModalOpenActionPayload>,
    ) => {
      const { id, type, content, payload } = action.payload;

      state.id = id;
      state.isOpen = true;
      state.type = type;
      state.content = content;
      state.payload = payload;
    },
    onCloseModal: () => initialState,
  },
});

export const { onOpenModal, onCloseModal } = modalSlice.actions;

export default modalSlice.reducer;
