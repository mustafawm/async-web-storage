export enum AStorageType {
  local = 'localStorage',
  session = 'sessionStorage',
}

export type ASValueIn = string | number | object;

export type ASValueOut = any;

export type ASError = Error | null;
