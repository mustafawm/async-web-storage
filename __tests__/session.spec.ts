import { asyncSessionStorage } from '../src';
import { person, token } from './consts';

describe('Session Storage', () => {
  beforeAll(() => {
    asyncSessionStorage.clear();
  });
  afterAll(() => {
    asyncSessionStorage.clear();
  });

  test('stores, fetches and removes values', async () => {
    const getObjResult = await asyncSessionStorage.getItem('person');
    expect(getObjResult).toBeNull();

    const getStrResult = await asyncSessionStorage.getItem('token');
    expect(getStrResult).toBeNull();

    await asyncSessionStorage.setItem('person', person);
    const getObjResult2 = await asyncSessionStorage.getItem('person');
    expect(getObjResult2).toMatchObject(person);

    await asyncSessionStorage.setItem('token', token);
    const getStrResult2 = await asyncSessionStorage.getItem('token');
    expect(getStrResult2).toBe(token);

    await asyncSessionStorage.removeItem('person');
    const delObjResult = await asyncSessionStorage.getItem('person');
    expect(delObjResult).toBeNull();

    await asyncSessionStorage.removeItem('token');
    const delStrResult = await asyncSessionStorage.getItem('token');
    expect(delStrResult).toBeNull();
  });

  test('passes raw storage objects to getItem callback', async () => {
    await asyncSessionStorage.setItem('person', person);

    const rawStoredPerson = await asyncSessionStorage.getItem('person', {
      raw: true,
    });
    expect(rawStoredPerson).toHaveProperty('createdAt');
    expect(rawStoredPerson).toHaveProperty('person');
    expect(rawStoredPerson.person).toMatchObject(person);

    await asyncSessionStorage.setItem('token', token);
    const rawStoredToken = await asyncSessionStorage.getItem('token', {
      raw: true,
    });
    expect(rawStoredToken).toHaveProperty('createdAt');
    expect(rawStoredToken).toHaveProperty('token');
    expect(rawStoredToken.token).toBe(token);
  });

  test('handles {}, "", underfined, 0, null', async () => {
    await asyncSessionStorage.setItem('empty', {});
    const emptyObjRes = await asyncSessionStorage.getItem('empty');
    expect(emptyObjRes).toMatchObject({});

    await asyncSessionStorage.setItem('empty', '');
    const emptyStrRes = await asyncSessionStorage.getItem('empty');
    expect(emptyStrRes).toBe('');

    await asyncSessionStorage.setItem('empty', undefined);
    const undefinedRes = await asyncSessionStorage.getItem('empty');
    expect(undefinedRes).toBe('undefined');

    await asyncSessionStorage.setItem('empty', 0);
    const zeroResult = await asyncSessionStorage.getItem('empty');
    expect(zeroResult).toBe(0);

    await asyncSessionStorage.setItem('empty', null);
    const nullResult = await asyncSessionStorage.getItem('empty');
    expect(nullResult).toBeNull();
  });
});
