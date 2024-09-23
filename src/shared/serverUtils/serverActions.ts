import {cookies} from 'next/headers';

export type SessionKeyType = 'customerAccessToken';

export const setSessionValue = (key: SessionKeyType, value: string) => {
  cookies().set(key, value, {
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });
};

export const deleteSessionValue = (key: SessionKeyType) =>
  cookies().delete(key);

export const getSessionValue = (key: SessionKeyType) =>
  cookies().get(key)?.value || '';
