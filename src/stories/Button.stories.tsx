import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/common/Button';

const meta: Meta<typeof Button> = {
  title: 'SUBOM/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    primary: true,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    primary: false,
  },
};
