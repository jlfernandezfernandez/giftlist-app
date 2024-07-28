// lib/firebase_auth.ts

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "@/firebase.config";
import { AuthenticatedUser } from "@/types/authenticated-user";

// Helper function to convert Firebase User to AuthenticatedUser
const convertToAuthenticatedUser = async (
  user: User
): Promise<AuthenticatedUser> => ({
  uid: user.uid,
  displayName: user.displayName ?? "",
  email: user.email ?? "",
  idToken: await user.getIdToken(),
});

export async function authenticateWithCredentials(
  email: string,
  password: string
): Promise<AuthenticatedUser> {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return await convertToAuthenticatedUser(credential.user);
  } catch (error) {
    console.error("Error al iniciar sesión con correo/contraseña: ", error);
    throw new Error("Failed to sign in with credentials");
  }
}

export async function authenticateWithGoogle(): Promise<AuthenticatedUser> {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return await convertToAuthenticatedUser(result.user);
  } catch (error) {
    console.error("Error al iniciar sesión con Google: ", error);
    throw new Error("Failed to sign in with Google");
  }
}

export async function registerWithEmailAndPassword(
  name: string,
  email: string,
  password: string
): Promise<AuthenticatedUser> {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = credential.user;

    await updateProfile(user, { displayName: name });

    return await convertToAuthenticatedUser(user);
  } catch (error) {
    console.error("Error al registrar usuario: ", error);
    throw new Error("Failed to register user");
  }
}
