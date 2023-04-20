import { cx } from 'class-variance-authority';
import { TextareaHTMLAttributes, forwardRef } from 'react';

import { labelStyles } from '../input/styles';

import { TextareaVariantsProps, textareaVariants } from './variants';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    TextareaVariantsProps {
  label?: string;
  labelClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { className, size, label, labelClassName, ...rest } = props;

    return (
      <label className={cx(labelStyles({ size, className: labelClassName }))}>
        {label}
        <textarea
          ref={ref}
          className={textareaVariants({ className, size })}
          {...rest}
        />
      </label>
    );
  }
);
