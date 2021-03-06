/* eslint no-console:0 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { prepareToStore, prepareToReturn } from './utils';

enum AStorageType {
  local = 'localStorage',
  session = 'sessionStorage',
}

type ASValueIn = any;
type ASValueOut = any;

class AStorage {
  private type: AStorageType;

  constructor(type: AStorageType) {
    this.type = type;
  }

  async setItem(key: string, value: ASValueIn): Promise<void | boolean> {
    return new Promise((resolve, reject) => {
      try {
        window[this.type].setItem(key, prepareToStore(key, value));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async getItem(
    key: string,
    options?: { raw?: boolean },
  ): Promise<ASValueOut | void> {
    return new Promise((resolve, reject) => {
      try {
        const storedString = window[this.type].getItem(key);
        if (!storedString) {
          return resolve(storedString);
        }

        try {
          const result = JSON.parse(storedString);
          const value = key in result ? result[key] : result;
          return resolve(options?.raw ? result : prepareToReturn(value));
        } catch (parsingErr) {
          // stored value is a string so it can't be JSON.parsed!
          // should NOT happen if the value was stored via this wrapper
          // hence we're console.erroring to debug/report such scenarios
          console.error(`Error parsing the value for ${key}: ${storedString}`);
          return resolve(parsingErr);
        }
      } catch (error) {
        return reject(error);
      }
    });
  }

  async removeItem(key: string): Promise<void | boolean> {
    return new Promise((resolve, reject) => {
      try {
        window[this.type].removeItem(key);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async clear(): Promise<void | boolean> {
    return new Promise((resolve, reject) => {
      try {
        window[this.type].clear();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}

export const asyncLocalStorage = new AStorage(AStorageType.local);
export const asyncSessionStorage = new AStorage(AStorageType.session);
