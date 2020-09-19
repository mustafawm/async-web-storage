import storage from '../src';
import { person, token } from './consts';

describe('Local Storage', () => {
  beforeAll(() => {
    storage.local.clear();
  });
  afterAll(() => {
    storage.local.clear();
  });

  test('stores, fetches and removes values', async () => {
    const getObjResult = await storage.local.getItem('person');
    expect(getObjResult).toBeNull();

    const getStrResult = await storage.local.getItem('token');
    expect(getStrResult).toBeNull();

    await storage.local.setItem('person', person);
    const getObjResult2 = await storage.local.getItem('person');
    expect(getObjResult2).toMatchObject(person);

    await storage.local.setItem('token', token);
    const getStrResult2 = await storage.local.getItem('token');
    expect(getStrResult2).toBe(token);

    await storage.local.removeItem('person');
    const delObjResult = await storage.local.getItem('person');
    expect(delObjResult).toBeNull();

    await storage.local.removeItem('token');
    const delStrResult = await storage.local.getItem('token');
    expect(delStrResult).toBeNull();
  });

  test('executes provided callbacks', async () => {
    const getObjResultCb = await storage.local.getItem(
      'person',
      () => 'nothing',
    );
    expect(getObjResultCb).toBe('nothing');

    const setObjResultCb = await storage.local.setItem(
      'person',
      person,
      () => 'done',
    );
    await expect(setObjResultCb).toBe('done');

    const setStrResultCb = await storage.local.setItem(
      'token',
      token,
      () => 'done',
    );
    expect(setStrResultCb).toBe('done');

    const delObjResultCb = await storage.local.removeItem(
      'person',
      () => 'deleted',
    );
    expect(delObjResultCb).toBe('deleted');

    const delStrResultCb = await storage.local.removeItem(
      'token',
      () => 'gone',
    );
    expect(delStrResultCb).toBe('gone');
  });

  test('passes raw storage objects to callbacks', async () => {
    await storage.local.setItem('person', person);

    const rawStoredPerson = await storage.local.getItem(
      'person',
      (_, res) => res,
    );
    expect(rawStoredPerson).toHaveProperty('createdAt');
    expect(rawStoredPerson).toHaveProperty('person');
    expect(rawStoredPerson.person).toMatchObject(person);

    await storage.local.setItem('token', token);
    const rawStoredToken = await storage.local.getItem(
      'token',
      (_, res) => res,
    );
    expect(rawStoredToken).toHaveProperty('createdAt');
    expect(rawStoredToken).toHaveProperty('token');
    expect(rawStoredToken.token).toBe(token);
  });
});
