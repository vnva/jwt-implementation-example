import { cva } from 'class-variance-authority';

export const textareaJsonFooterVariants = cva(
  [
    'bg-neutral-300',
    'rounded-bl-lg',
    'rounded-br-lg',
    'w-full',
    'flex',
    'justify-between',
    'items-center',
  ],
  {
    variants: {
      size: {
        sm: ['py-2', 'px-2'],
        md: ['py-3', 'px-3'],
      },
    },
    defaultVariants: { size: 'md' },
  }
);
