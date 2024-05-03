declare module "redux-persist/lib/storage" {
  import { type WebStorage } from "redux-persist/es/types";

  const storage: WebStorage;

  export default storage;
}
