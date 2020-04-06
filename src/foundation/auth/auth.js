import { Auth } from 'aws-amplify';
import { DateTime } from 'luxon';

export function logIn(user, password, Storage) {
  Storage.removeItem(Storage.keys.AUTH);

  return Auth
    .signIn(user, password)
    .then(result => {
      const accessToken = result.signInUserSession.accessToken.jwtToken;

      Storage.setItem(Storage.keys.AUTH, {
        user,
        authenticatedAt: DateTime.utc().toISO(),
        accessToken
      });

      return { accessToken };
    });
}

function isAuthExpired(auth) {
  const AUTH_EXPIRATION_DAYS = 28;

  return DateTime.fromISO(auth.authenticatedAt)
    .diff(DateTime.local(), 'days') > AUTH_EXPIRATION_DAYS;
}

export function getAuthData(Storage) {
  const storedAuth = Storage.getItem(Storage.keys.AUTH);

  if (!!storedAuth && isAuthExpired(storedAuth)) {
    Storage.deleteItem(Storage.keys.AUTH);

    return null;
  }

  return storedAuth;
}
