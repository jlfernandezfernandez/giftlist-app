// lib/firebase_auth.ts

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase.config";
import { AuthenticatedUser } from "@/types/authenticated-user";

export async function authenticateWithCredentials(
  email: string,
  password: string
): Promise<AuthenticatedUser | null> {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const user = credential.user;

    return {
      uid: user.uid,
      displayName: user.displayName ?? "", // Add null check and provide a default value
      email: user.email ?? "",
      idToken: await user.getIdToken(),
    };
  } catch (error) {
    console.error("Error al iniciar sesión con correo/contraseña: ", error);
    throw new Error("Failed to sign in with credentials");
  }
}

export async function authenticateWithGoogle(): Promise<AuthenticatedUser | null> {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    return {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email ?? "",
      idToken: await user.getIdToken(),
    };
  } catch (error) {
    console.error("Error al iniciar sesión con Google: ", error);
    throw new Error("Failed to sign in with Google");
  }
}

export async function registerWithEmailAndPassword(
  name: string,
  email: string,
  password: string
): Promise<AuthenticatedUser | null> {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = credential.user;

    await updateProfile(user, {
      displayName: name,
    });

    return {
      uid: user.uid,
      displayName: user.displayName ?? "",
      email: user.email ?? "",
      idToken: await user.getIdToken(),
    };
  } catch (error) {
    console.error("Error al registrar usuario: ", error);
    throw new Error("Failed to register user");
  }
}
