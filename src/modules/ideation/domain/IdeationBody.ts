export interface IdeationBody {
  title: string;
  description: string;
  vision: string;
}

export interface AddIdeationBody extends IdeationBody {}

export interface EditIdeationBody extends Partial<AddIdeationBody> {}
