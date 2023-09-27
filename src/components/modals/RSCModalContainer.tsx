// im assuming all modals go here

import { ModalProvider } from "..";
import ExampleModalBody1 from "./ExampleModalBody1";
import ExampleModalBody2 from "./ExampleModalBody2";
import { Example1Modal, Example2Modal } from ".";

function RSCModalContainer() {
  return (
    <>
      <ModalProvider>
        <Example1Modal>
          <ExampleModalBody1 />
        </Example1Modal>
      </ModalProvider>
      <ModalProvider>
        <Example2Modal>
          <ExampleModalBody2 />
        </Example2Modal>
      </ModalProvider>
    </>
  );
}

export default RSCModalContainer;
