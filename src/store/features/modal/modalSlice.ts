import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  type DeleteResourceProps,
  type DeleteResourceResponse,
  type deleteResource,
} from "@/myVoyage/voyage-resources/resourcesService";
import {
  type DeleteIdeationProps,
  type DeleteIdeationResponse,
  type deleteIdeation,
} from "@/myVoyage/ideation/adapters/ideationSA";
import {
  type DeleteFeatureProps,
  type deleteFeature,
} from "@/myVoyage/features/featuresService";
import { type AsyncActionResponse } from "@/utils/handleAsync";
import {
  type DeleteAgendaTopicProps,
  type DeleteAgendaTopicResponse,
  type deleteAgendaTopic,
} from "@/app/(main)/my-voyage/[teamId]/sprints/sprintsService";
import {
  type DeleteTechItemProps,
  type deleteTechItem,
} from "@/app/(main)/my-voyage/[teamId]/tech-stack/techStackService";

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
  payload?: Payload;
}

export interface BaseModalOpenActionPayload {
  id?: number;
  type: Exclude<ModalType, "error" | "confirmation">;
  content?: ContentPayload;
  payload?: Payload;
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
  payload: Required<Payload>;
}

export interface ContentPayload {
  title?: string;
  message?: string;
  confirmationText?: string;
  cancelText?: string;
}

export interface Payload {
  params?: DeleteProps;
  redirect?: Redirect | null;
  deleteFunction?:
    | typeof deleteIdeation
    | typeof deleteResource
    | typeof deleteFeature
    | typeof deleteAgendaTopic
    | typeof deleteTechItem;
}

export type ActionType<X, Y> = (arg: X) => Promise<AsyncActionResponse<Y>>;

export type DeleteProps =
  | DeleteIdeationProps
  | DeleteResourceProps
  | DeleteFeatureProps
  | DeleteAgendaTopicProps
  | DeleteTechItemProps;

export type DeleteResponse =
  | DeleteIdeationResponse
  | DeleteResourceResponse
  | DeleteAgendaTopicResponse
  | void;

export interface Redirect {
  router?: AppRouterInstance;
  route?: string;
}

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
    onOpenModal: (state, action: PayloadAction<ModalOpenActionPayload>) => {
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
