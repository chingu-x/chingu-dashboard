import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import Sidebar from "@/components/sidebar/Sidebar";
import { store } from "@/store/store";

const meta: Meta<typeof Sidebar> = {
  title: "Example/Sidebar",
  component: Sidebar,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div style={{ height: 700 }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
