import { cva } from 'class-variance-authority';

export const labelStyles = cva(['flex', 'flex-col', 'w-full'], {
  variants: {
    error: {
      true: ['text-red-500'],
      false: [],
    },
    size: {
      sm: ['text-xs'],
      md: ['text-sm'],
      lg: ['text-base'],
    },
  },
  defaultVariants: {
    size: 'md',
    error: false,
  },
});

export const inputBoxStyles = cva(
  [
    'flex',
    'gap-2',
    'mt-1',
    'items-center',
    'transition',
    'bg-neutral-200',
    'rounded-lg',
  ],
  {
    variants: {
      size: {
        sm: ['text-xs', 'py-2', 'px-3', 'h-10'],
        md: ['text-sm', 'p-3', 'h-11'],
        lg: ['text-base', 'p-3', 'h-12'],
      },
      disabled: {
        true: ['text-neutral-400'],
        false: [],
      },
      error: {
        true: ['bg-red-200'],
        false: [],
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
      disabled: false,
    },
  }
);

export const inputStyles = cva([
  'outline-none',
  'text-black',
  'bg-transparent',
  'w-full',
  'placeholder:text-neutral-500',
  'disabled:placeholder:text-neutral-400',
  'disabled:text-neutral-400',
]);
