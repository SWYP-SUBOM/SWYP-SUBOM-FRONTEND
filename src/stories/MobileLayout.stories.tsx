import type { Meta, StoryObj } from '@storybook/react';
import { MobileLayout } from '../layout/MobileLayout';
import { Button } from '../components/common/Button';

const meta: Meta = {
  title: 'Layout/MobileLayout',
  decorators: [
    (Story) => (
      <MobileLayout>
        <Story />
      </MobileLayout>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <h1 className="T01_B text-b10">SUBOM</h1>,
};

export const WithButtons: Story = {
  render: () => (
    <div className="p-4 space-y-4">
      <div className="space-y-3">
        <Button label="Primary Button" />
        <Button label="Secondary Button" />
      </div>
    </div>
  ),
};
