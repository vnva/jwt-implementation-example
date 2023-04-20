import '@/app/styles/index.scss';
import { DecodeTokenWidget } from '@/widgets/decode-token-widget';
import { EncodeTokenWidget } from '@/widgets/encode-token-widget';

import { useAppStore } from './store';

export const App = () => {
  const {
    loading,
    encodeToken,
    token,
    decodeToken,
    payload,
    message,
    result,
    secret,
  } = useAppStore();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-[800px] h-[500px] justify-between items-stretch">
        <EncodeTokenWidget
          className="w-[350px] h-full"
          onSubmit={encodeToken}
          loading={loading}
        />
        <DecodeTokenWidget
          className="w-[350px] h-full"
          token={token}
          payload={payload}
          message={message}
          result={result}
          onSubmit={decodeToken}
          loading={loading}
          secret={secret}
        />
      </div>
    </div>
  );
};
