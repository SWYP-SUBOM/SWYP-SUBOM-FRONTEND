import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/common/Button';
import kakao from '../assets/Onboarding/kakao.png';

const meta: Meta<typeof Button> = {
  title: 'SUBOM/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: '피드백 받기',
  },
};

export const Secondary: Story = {
  args: {
    label: '카카오톡 소셜 로그인',
    icon: kakao,
  },
};
