export interface SagsSetting {
  name: string;
  folder: string;
  minify: boolean;
}

export type Input =
  | bigint
  | boolean
  | number
  | object
  | string
  | symbol
  | undefined
  | [];
