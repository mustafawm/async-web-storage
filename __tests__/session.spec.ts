import storage from '../src';
import { person, token } from './consts';

describe('Session Storage', () => {
  beforeAll(() => {
    storage.session.clear();
  });
  afterAll(() => {
    storage.session.clear();
  });

  test('stores, fetches and removes values', async () => {
    const getObjResult = await storage.session.getItem('person');
    expect(getObjResult).toBeNull();

    const getStrResult = await storage.session.getItem('token');
    expect(getStrResult).toBeNull();

    await storage.session.setItem('person', person);
    const getObjResult2 = await storage.session.getItem('person');
    expect(getObjResult2).toMatchObject(person);

    await storage.session.setItem('token', token);
    const getStrResult2 = await storage.session.getItem('token');
    expect(getStrResult2).toBe(token);

    await storage.session.removeItem('person');
    const delObjResult = await storage.session.getItem('person');
    expect(delObjResult).toBeNull();

    await storage.session.removeItem('token');
    const delStrResult = await storage.session.getItem('token');
    expect(delStrResult).toBeNull();
  });

  test('executes provided callbacks', async () => {
    const getObjResultCb = await storage.session.getItem(
      'person',
      () => 'nothing',
    );
    expect(getObjResultCb).toBe('nothing');

    const setObjResultCb = await storage.session.setItem(
      'person',
      person,
      () => 'done',
    );
    await expect(setObjResultCb).toBe('done');

    const setStrResultCb = await storage.session.setItem(
      'token',
      token,
      () => 'done',
    );
    expect(setStrResultCb).toBe('done');

    const delObjResultCb = await storage.session.removeItem(
      'person',
      () => 'deleted',
    );
    expect(delObjResultCb).toBe('deleted');

    const delStrResultCb = await storage.session.removeItem(
      'token',
      () => 'gone',
    );
    expect(delStrResultCb).toBe('gone');
  });

  test('passes raw storage objects to callbacks', async () => {
    await storage.session.setItem('person', person);

    const rawStoredPerson = await storage.session.getItem(
      'person',
      (_, res) => res,
    );
    expect(rawStoredPerson).toHaveProperty('createdAt');
    expect(rawStoredPerson).toHaveProperty('person');
    expect(rawStoredPerson.person).toMatchObject(person);

    await storage.session.setItem('token', token);
    const rawStoredToken = await storage.session.getItem(
      'token',
      (_, res) => res,
    );
    expect(rawStoredToken).toHaveProperty('createdAt');
    expect(rawStoredToken).toHaveProperty('token');
    expect(rawStoredToken.token).toBe(token);
  });
});
