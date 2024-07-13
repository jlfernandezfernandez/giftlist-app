// types/authenticated-user.ts

export interface AuthenticatedUser {
  uid: string;
  displayName: string;
  email: string;
  idToken: string;
}
