/* eslint no-console:0 */
import { prepareToStore, prepareToReturn } from './utils';
import { AStorageType, ASValueIn, ASValueOut, ASError } from './types';

class AStorage {
  private type: AStorageType;

  constructor(type: AStorageType) {
    this.type = type;
  }

  async setItem(
    key: string,
    value: ASValueIn,
    cb?: (err?: ASError) => void,
  ): Promise<void | boolean> {
    return new Promise((resolve, reject) => {
      try {
        window[this.type].setItem(key, prepareToStore(key, value));
        resolve(cb ? cb() : true);
      } catch (error) {
        reject(cb ? cb(error) : false);
      }
    });
  }

  async getItem(
    key: string,
    cb?: (err?: ASError, res?: ASValueOut) => void,
  ): Promise<ASValueOut | void> {
    return new Promise((resolve, reject) => {
      try {
        const storedString = window[this.type].getItem(key);
        if (!storedString) {
          return resolve(cb ? cb(null, storedString) : null);
        }

        try {
          const result = JSON.parse(storedString);
          return resolve(
            cb ? cb(null, result) : prepareToReturn(result[key] || result),
          );
        } catch (parsingErr) {
          // stored value is a string so it can't be JSON.parsed!
          // should NOT happen if the value was stored via this wrapper
          // hence we're console.erroring to debug/report such scenarios
          console.error(`Error parsing the value for ${key}: ${storedString}`);
          return resolve(parsingErr);
        }
      } catch (error) {
        return reject(cb ? cb(error) : error);
      }
    });
  }

  async removeItem(
    key: string,
    cb?: (err?: ASError) => void,
  ): Promise<void | boolean> {
    return new Promise((resolve, reject) => {
      try {
        window[this.type].removeItem(key);
        resolve(cb ? cb() : true);
      } catch (error) {
        reject(cb ? cb(error) : false);
      }
    });
  }

  async clear(): Promise<void | boolean> {
    return new Promise((resolve, reject) => {
      try {
        window[this.type].clear();
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default {
  local: new AStorage(AStorageType.local),
  session: new AStorage(AStorageType.session),
};
