// app/lib/actions.ts

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase.config";
import { User } from "@/types/user"; // Importa la interfaz User

export async function authenticateWithCredentials(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    if (!result.user) {
      throw new Error("Invalid credentials");
    }

    const user = result.user;

    return {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    };
  } catch (error) {
    console.error("Error al iniciar sesión con correo/contraseña: ", error);
    throw error;
  }
}

export async function authenticateWithGoogle(): Promise<User | null> {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    return {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    };
  } catch (error) {
    console.error("Error al iniciar sesión con Google: ", error);
    throw new Error("Failed to sign in with Google");
  }
}
