import { type RequestOptions } from "./requestOptions";

export interface GetParams {
  baseUrl: string;
  url: string;
  options: RequestOptions;
}

export interface PostParams<X> {
  baseUrl: string;
  url: string;
  options: RequestOptions;
  payload?: X;
}

export interface PatchParams<X> {
  baseUrl: string;
  url: string;
  options: RequestOptions;
  payload: X;
}

export interface DeleteParams {
  baseUrl: string;
  url: string;
  options: RequestOptions;
}

export interface UnauthPostParams<X> {
  baseUrl: string;
  url: string;
  options: RequestOptions;
  payload: X;
}
