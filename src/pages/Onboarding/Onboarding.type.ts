import type { ReactNode } from 'react';

export type OnboardingLayoutType = {
  title: ReactNode;
  subtitle: ReactNode;
  image: {
    src: string;
    alt: string;
    className?: string;
  };
  bgcolor?: string;
};
