export interface GetParams {
  url: string;
}

export interface PostParams<X> {
  url: string;
  payload?: X;
}

export interface PatchParams<X> {
  url: string;
  payload: X;
}

export interface DeleteParams {
  url: string;
}
