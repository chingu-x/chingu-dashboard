declare module "redux-persist/lib/storage" {
  import { WebStorage } from "redux-persist/es/types";

  const storage: WebStorage;

  export default storage;
}
