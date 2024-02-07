import type { Meta, StoryObj } from "@storybook/react";

import { TrashIcon } from "@heroicons/react/20/solid";

import Button from "@/components/Button";
import Modal from "@/components/modals/Modal";
import TextInput from "@/components/inputs/TextInput";
import Textarea from "@/components/inputs/Textarea";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      description: "Open or close a modal?",
      control: "boolean",
    },
    onClose: {
      description: "onClose function",
      control: "function",
    },
    title: {
      description: "A modal's title.",
      control: "text",
    },
    children: {
      description: "A modal's content.",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const BaseTemplate: Story = {
  decorators: [
    (Story) => (
      <div style={{ height: 400, position: "relative" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    isOpen: true,
    title: "title",
    onClose: () => {},
    children: <div>This is a modal.</div>,
  },
  render: ({ ...args }) => <Modal {...args} />,
};

export const Default = {
  ...BaseTemplate,
};

export const WithFormInsideWithoutVerticalScroll = {
  ...BaseTemplate,
  args: {
    ...BaseTemplate.args,
    title: "A modal form",
    children: (
      <form className="flex flex-col overflow-hidden">
        <div className="flex flex-col gap-4">
          <TextInput
            id="suggestion"
            placeholder="What is your tech stack suggestion?"
            defaultValue=""
            suggestion="Tip: keep it short and sweet"
            maxLength={30}
          />
        </div>
        <div className="flex flex-1 gap-5 pt-8">
          <Button
            variant="neutral"
            size="lg"
            aria-label="go back"
            onClick={() => {}}
            className="w-full"
          >
            Go back
          </Button>
          <Button
            onClick={() => {}}
            variant="primary"
            size="lg"
            aria-label="submit"
            className="w-full"
          >
            Submit
          </Button>
        </div>
      </form>
    ),
  },
};

export const WithFormInsideWithVerticalScroll: Story = {
  ...BaseTemplate,
  decorators: [
    (Story) => (
      <div style={{ height: 800, position: "relative" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    ...BaseTemplate.args,
    title: "A modal form",
    children: (
      <form className="flex flex-col overflow-hidden">
        <div className="flex flex-col pr-2 mr-1 overflow-y-auto min-h-[90px]">
          <div className="flex flex-col gap-4">
            <TextInput
              id="title"
              label="title"
              defaultValue=""
              placeholder="Enter you voyage project idea"
              maxLength={30}
            />
            <Textarea
              id="projectIdea"
              label="project idea"
              defaultValue=""
              placeholder="Describe your idea. What problem or challenge do you aim to address or solve? What is the primary purpose and goal of your idea? Who are your intemded users?"
              maxLength={50}
            />
            <Textarea
              id="visionStatement"
              label="vision statement"
              placeholder="Share your insoiring vision. How will you provide value and benefits to users? What long term impact do you hope to achieve?"
              defaultValue=""
              maxLength={50}
            />
            <TextInput
              id="email"
              label="email"
              placeholder="Enter your email"
              defaultValue=""
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 pt-8">
          <Button
            onClick={() => {}}
            variant="primary"
            size="lg"
            aria-label="submit"
          >
            Submit
          </Button>
          <Button variant="error" size="lg" title="delete" aria-label="delete">
            <TrashIcon className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </form>
    ),
  },
};
