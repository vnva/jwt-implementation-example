import { TablerIconsProps } from '@tabler/icons-react';
import { VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

import { Button, ButtonProps } from '../button';

import { iconStyles, wrapperStyles } from './styles';

export interface ActionIconProps
  extends ButtonProps,
    VariantProps<typeof iconStyles> {
  icon: (props: TablerIconsProps) => JSX.Element;
}

const ICON_SIZE = {
  sm: 18,
  md: 18,
  lg: 24,
};

export const ActionIcon = forwardRef<HTMLButtonElement, ActionIconProps>(
  (props, ref) => {
    const { icon: Icon, size = 'md', intent, className, ...rest } = props;

    return (
      <Button
        ref={ref}
        size={size}
        intent={intent}
        className={wrapperStyles({ size, className })}
        {...rest}
      >
        <Icon size={ICON_SIZE[size]} className={iconStyles({ intent })} />
      </Button>
    );
  }
);
