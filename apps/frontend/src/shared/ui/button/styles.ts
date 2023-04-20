import { VariantProps, cva } from 'class-variance-authority';

export const buttonStyles = cva(
  [
    'rounded-md',
    'transition',
    'disabled:bg-neutral-200',
    'disabled:text-neutral-400',
  ],
  {
    variants: {
      intent: {
        primary: ['bg-blue-500', 'hover:bg-blue-400', 'text-white'],
        secondary: ['bg-neutral-100', 'hover:bg-neutral-200'],
      },
      size: {
        sm: ['text-xs', 'px-[2px]', 'py-1 hover:shadow-md'],
        md: ['text-sm', 'px-2', 'py-2 hover:shadow-md'],
        lg: ['text-base', 'px-3', 'py-3 hover:shadow-md'],
      },
    },
    defaultVariants: {
      size: 'md',
      intent: 'secondary',
    },
  }
);

export type ButtonStylesProps = VariantProps<typeof buttonStyles>;
