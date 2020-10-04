import { Auth } from 'aws-amplify';
import { DateTime } from 'luxon';

export function logIn(user, password, Storage) {
  Storage.removeItem(Storage.keys.AUTH);

  return Auth
    .signIn(user, password)
    .then(result => {
      const token = result.signInUserSession.idToken.jwtToken;

      Storage.setItem(Storage.keys.AUTH, {
        user,
        authenticatedAt: DateTime.utc().toISO(),
        token
      });

      return { token };
    });
}

function isAuthExpired(auth) {
  const AUTH_EXPIRATION_HOURS = 1;
  const diffInHours = DateTime.local().diff(DateTime.fromISO(auth.authenticatedAt), 'hours').hours;

  return Math.abs(diffInHours) > AUTH_EXPIRATION_HOURS;
}

export function getAuthData(Storage) {
  const storedAuth = Storage.getItem(Storage.keys.AUTH);

  if (!storedAuth) {
    return null;
  } else if (isAuthExpired(storedAuth)) {
    Storage.removeItem(Storage.keys.AUTH);

    return null;
  }

  return storedAuth;
}
