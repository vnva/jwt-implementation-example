import { cx } from 'class-variance-authority';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { JwtDecodeRequest } from '@/shared/api/jwt/types';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { TextareaJson } from '@/shared/ui/textarea-json';

interface DecodeTokenWidgetProps {
  onSubmit: (data: JwtDecodeRequest) => void;
  loading: boolean;
  className?: string;
  token?: string;
  message?: string;
  payload?: object;
  result?: 'success' | 'error';
  secret?: string;
}

export const DecodeTokenWidget: FC<DecodeTokenWidgetProps> = (props) => {
  const {
    className,
    token,
    loading,
    secret,
    payload,
    onSubmit,
    message,
    result,
  } = props;

  const { register, setValue, handleSubmit } = useForm<JwtDecodeRequest>();

  useEffect(() => {
    setValue('token', token);
  }, [token]);

  useEffect(() => {
    setValue('secret', secret);
  }, [secret]);

  return (
    <div className={cx(className, 'flex flex-col h-full gap-6')}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Input
          label="Secret"
          size="sm"
          placeholder="Type secret"
          {...register('secret')}
          disabled={loading}
        />
        <Textarea
          label="Encoded token"
          rows={5}
          placeholder="Empty"
          className="resize-none w-full text-violet-600"
          size="sm"
          {...register('token')}
          disabled={loading}
        />
        <Button
          type="submit"
          intent="primary"
          className="w-full mt-4"
          disabled={loading}
        >
          Decode
        </Button>
      </form>
      <div className="relative h-full">
        <TextareaJson
          label="Decode result"
          placeholder="Empty"
          className={cx(
            'grow-1 resize-none',
            result === 'success' ? 'text-emerald-600' : 'text-red-600'
          )}
          readOnly
          size="sm"
          value={payload}
        />
        {result === 'success' && (
          <div className="absolute bottom-3 right-3 text-xs bg-emerald-400 rounded-md py-1 px-2 text-white mt-3">
            Signature Verified
          </div>
        )}
        {message && (
          <div className="absolute bottom-3 right-3 text-xs bg-red-400 rounded-md py-1 px-2 text-white mt-3">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};
