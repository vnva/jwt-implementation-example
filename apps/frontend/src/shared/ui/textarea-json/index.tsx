import { IconBraces } from '@tabler/icons-react';
import { cx } from 'class-variance-authority';
import { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { ActionIcon } from '../action-icon';
import { Textarea, TextareaProps } from '../textarea';

import { textareaJsonFooterVariants } from './variants';

export interface TextareaJsonProps
  extends Omit<TextareaProps, 'value' | 'defaultValue' | 'onChange'> {
  value?: object;
  onChange?: (value: object) => void;
}

export const TextareaJson = forwardRef<HTMLTextAreaElement, TextareaJsonProps>(
  (props, ref) => {
    const { className, onChange, size, readOnly, value, ...rest } = props;

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [syntaxError, setSyntaxError] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const value = event.target.value;

      if (!value) {
        if (onChange) onChange(undefined);
        setSyntaxError(false);
        return;
      }

      try {
        const parsedValue = JSON.parse(value) as object;
        setSyntaxError(false);

        if (onChange) onChange(parsedValue);
      } catch {
        setSyntaxError(true);
      }
    };

    const handlePretty = () => {
      if (!textareaRef.current || readOnly) return;

      const textarea = textareaRef.current;

      try {
        const value = textarea.value;

        if (!value) return;

        const parsedValue = JSON.parse(value) as object;
        const prettyValue = JSON.stringify(parsedValue, undefined, 2);

        textarea.value = prettyValue;
      } catch (e) {
        setSyntaxError(true);
      }
    };

    useEffect(() => {
      if (!textareaRef.current) return;

      const textarea = textareaRef.current;
      const isValuesEquals =
        textarea.value &&
        JSON.stringify(JSON.parse(textarea.value)) == JSON.stringify(value);

      if (isValuesEquals) return;

      const isValueEmpty = !value || Object.keys(value).length === 0;

      textarea.value = isValueEmpty
        ? null
        : JSON.stringify(value, undefined, 2);
    }, [value]);

    return (
      <div className="flex flex-col h-full">
        <Textarea
          ref={mergeRefs([ref, textareaRef])}
          className={cx(
            className,
            !readOnly && 'rounded-b-none',
            'w-full',
            'h-full'
          )}
          labelClassName="w-full h-full"
          size={size}
          onChange={handleChange}
          readOnly={readOnly}
          {...rest}
        />
        {!readOnly && (
          <div className={textareaJsonFooterVariants({ size })}>
            <div className="text-red-500 text-xs">
              {syntaxError && 'Syntax error'}
            </div>
            <ActionIcon
              type="button"
              size="sm"
              icon={IconBraces}
              onClick={handlePretty}
            />
          </div>
        )}
      </div>
    );
  }
);
