import type { Meta, StoryObj } from "@storybook/react";

import { within, userEvent, expect, fn } from "@storybook/test";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const FirstStory: Story = {
  args: {
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const SecondStory: Story = {
  args: {
    onClick1: fn(),
    onClick2: fn(),
    onClick3: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");

    await userEvent.click(buttons[0]);
    await expect(args.onClick1).toHaveBeenCalled();
    await user.tab();

    await expect(buttons[1]).toHaveFocus();
    await userEvent.click(buttons[1]);
    await expect(args.onClick1).toHaveBeenCalled();
    await user.tab();

    await expect(buttons[2]).toHaveFocus();
    await userEvent.click(buttons[2]);
    await expect(args.onClick1).toHaveBeenCalled();
  },
  render: ({ onClick1, onClick2, onClick3 }) => {
    return (
      <>
        <Button onClick={onClick1} />
        <Button onClick={onClick2} />
        <Button onClick={onClick3} />
      </>
    );
  },
};
