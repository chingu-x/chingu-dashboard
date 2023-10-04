import { ServerModal } from "..";
import Example4ModalClient from "./Example4ModalClient";

export default function Example4Modal() {
  return (
    <ServerModal title="create project">
      <Example4ModalClient />
    </ServerModal>
  );
}
