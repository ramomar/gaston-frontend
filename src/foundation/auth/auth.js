import { Auth } from 'aws-amplify';

export function logIn(user, password) {
  return Auth.signIn(user, password);
}
