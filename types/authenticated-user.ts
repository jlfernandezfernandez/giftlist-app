// types/authenticated-user.ts

export interface AuthenticatedUser {
  uid: string;
  displayName: string | null;
  email: string;
  idToken: string;
}
