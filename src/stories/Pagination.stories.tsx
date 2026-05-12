import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Pagination } from "../index";

const meta = {
  title: "Mosslight/Pagination",
  component: Pagination,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const [page, setPage] = useState(2);
    return <Pagination page={page} totalPages={5} onPageChange={setPage} />;
  },
};
