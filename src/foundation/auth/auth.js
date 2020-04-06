import { Auth } from 'aws-amplify';

export function logIn(user, password) {
  return Auth
    .signIn(user, password)
    .then(user => {
      return { accessToken: user.signInUserSession.accessToken.jwtToken };
    });
}
