import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import Sidebar from "@/components/sidebar/Sidebar";
import { store } from "@/store/store";
// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "@/store/features/user/userSlice";
// import authReducer from "@/store/features/auth/authSlice";

// const mockStore = configureStore({
//   reducer: {
//     user: userReducer,
//     auth: authReducer,
//   },
//   preloadedState: {
//     auth: {
//       isAuthenticated: true,
//     },
//     user: {
//       voyageTeamMembers: [
//         {
//           // @ts-expect-error - This is a mock object
//           voyageTeam: {
//             voyage: {
//               status: {
//                 name: "Active",
//               },
//             },
//           },
//         },
//       ],
//     },
//   },
// });

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
