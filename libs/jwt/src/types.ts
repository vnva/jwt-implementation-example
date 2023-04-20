export interface Options {
  secret: string;
  expiresIn?: string;
}

export interface Header {
  typ: string;
  alg: string;
}

export type Payload<P extends object> = P & {
  exp?: number;
};
