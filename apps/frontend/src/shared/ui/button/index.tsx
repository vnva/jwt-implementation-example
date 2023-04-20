import { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { ButtonStylesProps, buttonStyles } from './styles';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonStylesProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, size, className, intent, ...rest } = props;

    return (
      <button
        ref={ref}
        className={twMerge(buttonStyles({ className, size, intent }))}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
