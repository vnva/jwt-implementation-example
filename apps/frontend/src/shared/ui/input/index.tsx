import { VariantProps, cx } from 'class-variance-authority';
import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

import { inputBoxStyles, inputStyles, labelStyles } from './styles';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>,
    Omit<VariantProps<typeof inputStyles>, 'prefix'>,
    VariantProps<typeof inputBoxStyles> {
  className?: string;
  boxClassName?: string;
  label?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  description?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    boxClassName,
    size,
    label,
    error,
    prefix,
    suffix,
    disabled,
    description,
    ...rest
  } = props;

  return (
    <label className={labelStyles({ size, error })}>
      {label && <p>{label}</p>}
      {description && <p className="text-neutral-400">{description}</p>}
      <div
        className={inputBoxStyles({
          size,
          error,
          disabled,
          className: boxClassName,
        })}
      >
        {prefix}
        <input
          ref={ref}
          className={cx(inputStyles({ className }))}
          disabled={disabled}
          {...rest}
        />
        {suffix}
      </div>
    </label>
  );
});
