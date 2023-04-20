import { VariantProps, cva } from 'class-variance-authority';

export const textareaVariants = cva(
  [
    'bg-neutral-200',
    'rounded-lg',
    'outline-none',
    'placeholder:text-neutral-500',
    'disabled:text-neutral-400',
    'disabled:placeholder:text-neutral-400',
    'p-3',
    'mt-1',
  ],
  {
    variants: {
      size: {
        sm: ['text-xs'],
        md: ['text-sm'],
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type TextareaVariantsProps = VariantProps<typeof textareaVariants>;
