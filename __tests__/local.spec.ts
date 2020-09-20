import { asyncLocalStorage } from '../src';
import { person, token } from './consts';

describe('Local Storage', () => {
  beforeAll(() => {
    asyncLocalStorage.clear();
  });
  afterAll(() => {
    asyncLocalStorage.clear();
  });

  test('stores, fetches and removes values', async () => {
    const getObjResult = await asyncLocalStorage.getItem('person');
    expect(getObjResult).toBeNull();

    const getStrResult = await asyncLocalStorage.getItem('token');
    expect(getStrResult).toBeNull();

    await asyncLocalStorage.setItem('person', person);
    const getObjResult2 = await asyncLocalStorage.getItem('person');
    expect(getObjResult2).toMatchObject(person);

    await asyncLocalStorage.setItem('token', token);
    const getStrResult2 = await asyncLocalStorage.getItem('token');
    expect(getStrResult2).toBe(token);

    await asyncLocalStorage.removeItem('person');
    const delObjResult = await asyncLocalStorage.getItem('person');
    expect(delObjResult).toBeNull();

    await asyncLocalStorage.removeItem('token');
    const delStrResult = await asyncLocalStorage.getItem('token');
    expect(delStrResult).toBeNull();
  });

  test('passes raw storage objects to getItem callback', async () => {
    await asyncLocalStorage.setItem('person', person);

    const rawStoredPerson = await asyncLocalStorage.getItem('person', {
      raw: true,
    });
    expect(rawStoredPerson).toHaveProperty('createdAt');
    expect(rawStoredPerson).toHaveProperty('person');
    expect(rawStoredPerson.person).toMatchObject(person);

    await asyncLocalStorage.setItem('token', token);
    const rawStoredToken = await asyncLocalStorage.getItem('token', {
      raw: true,
    });
    expect(rawStoredToken).toHaveProperty('createdAt');
    expect(rawStoredToken).toHaveProperty('token');
    expect(rawStoredToken.token).toBe(token);
  });

  test('handles {}, "", underfined, 0, null', async () => {
    await asyncLocalStorage.setItem('empty', {});
    const emptyObjRes = await asyncLocalStorage.getItem('empty');
    expect(emptyObjRes).toMatchObject({});

    await asyncLocalStorage.setItem('empty', '');
    const emptyStrRes = await asyncLocalStorage.getItem('empty');
    expect(emptyStrRes).toBe('');

    await asyncLocalStorage.setItem('empty', undefined);
    const undefinedRes = await asyncLocalStorage.getItem('empty');
    expect(undefinedRes).toBe('undefined');

    await asyncLocalStorage.setItem('empty', 0);
    const zeroResult = await asyncLocalStorage.getItem('empty');
    expect(zeroResult).toBe(0);

    await asyncLocalStorage.setItem('empty', null);
    const nullResult = await asyncLocalStorage.getItem('empty');
    expect(nullResult).toBeNull();
  });
});
