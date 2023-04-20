import { cva } from 'class-variance-authority';

export const wrapperStyles = cva(['flex', 'items-center', 'justify-center'], {
  variants: {
    size: {
      sm: ['h-6', 'w-6', 'p-0'],
      md: ['h-8', 'w-8', 'p-0'],
      lg: ['h-10', 'w-10', 'p-0'],
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const iconStyles = cva([], {
  variants: {
    intent: {
      primary: [],
      secondary: ['stroke-neutral-600', 'hover:stroke-neutral-700'],
    },
  },
  defaultVariants: {
    intent: 'secondary',
  },
});
