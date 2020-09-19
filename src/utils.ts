import { ASValueIn } from './types';

/**
 * Prepares value to be stored (JSON.stringify)
 */
export function prepareToStore(key: string, value: ASValueIn): string {
  return JSON.stringify({
    [key]: value === undefined ? 'undefined' : value,
    createdAt: Date.now(),
  });
}

/**
 * Returns JSON.parse(stored value) or raw string value
 */
export function prepareToReturn(value: string): object | string {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}
