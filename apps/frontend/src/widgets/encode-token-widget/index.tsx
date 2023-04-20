import { cx } from 'class-variance-authority';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { JwtEncodeRequest } from '@/shared/api/jwt/types';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { TextareaJson } from '@/shared/ui/textarea-json';

interface EncodeTokenWidgetProps {
  loading: boolean;
  onSubmit: (data: JwtEncodeRequest) => void;
  className?: string;
}

export const EncodeTokenWidget: FC<EncodeTokenWidgetProps> = (props) => {
  const { className, onSubmit, loading } = props;

  const { register, handleSubmit, control } = useForm<JwtEncodeRequest>();

  return (
    <form
      className={cx(className, 'flex flex-col gap-2')}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Secret"
        boxClassName="mb-2"
        placeholder="Type secret"
        size="sm"
        disabled={loading}
        {...register('secret')}
      />
      <Input
        label="Expires"
        boxClassName="mb-2"
        placeholder="5m"
        size="sm"
        disabled={loading}
        description="For example 1s, 5m, 2h (github.com/vercel/ms)"
        {...register('expiresIn')}
      />
      <Controller
        control={control}
        name="payload"
        render={({ field: { onChange, value } }) => (
          <TextareaJson
            label="Payload"
            placeholder="Type payload"
            className="text-blue-600 resize-none"
            size="sm"
            value={value}
            onChange={onChange}
            disabled={loading}
          />
        )}
      />

      <Button
        disabled={loading}
        type="submit"
        intent="primary"
        className="w-full mt-2"
      >
        Encode
      </Button>
    </form>
  );
};
