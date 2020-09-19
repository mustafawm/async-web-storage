/* eslint-disable @typescript-eslint/no-explicit-any */
export enum AStorageType {
  local = 'localStorage',
  session = 'sessionStorage',
}

export type ASValueIn = string | number | object | undefined;

export type ASValueOut = any;
