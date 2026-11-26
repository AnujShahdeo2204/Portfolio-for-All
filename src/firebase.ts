// Firebase setup for Portfolio-for-All.
//
// The web app config values below are NOT secrets — they identify the
// Firebase project in the browser — but they still belong in a local `.env`
// file, never hardcoded in source. Copy `.env.example` to `.env` and fill
// in the values from Firebase Console > Project settings > Your apps > Web app.
// The `.env` file is git-ignored; `.env.example` only holds placeholders.
//
// Required Firebase Console setup (one-time):
//   1. Authentication > Sign-in method > enable "Email/Password".
//   2. Authentication > Users > Add user — create ONE admin user with
//      your own email and a strong password you have never used elsewhere.
//   3. Realtime Database > Rules — set the rules below so the public site
//      can still read the portfolio, but only a signed-in admin can write:
//        {
//          "rules": {
//            ".read": true,
//            ".write": "auth != null"
//          }
//        }

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getDatabase, type Database } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env
    .VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
};

/** True only when every Firebase config value is present. */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.databaseURL &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
);

// Default Realtime Database URL used by the app before Firebase Auth was
// added. Used as a fallback so the public portfolio still loads when no
// `.env` file is present (for example in a CI build).
const FALLBACK_DATABASE_URL =
  "https://portfolio-for-all-9fdc3-default-rtdb.firebaseio.com";

/** Base URL of the Realtime Database, without a trailing slash. */
export const firebaseDatabaseUrl = (
  firebaseConfig.databaseURL || FALLBACK_DATABASE_URL
).replace(/\/$/, "");

/**
 * Initialized Firebase app, or `null` when the config is incomplete.
 * The app deliberately still works (public read) without config; only
 * admin sign-in and saving are disabled in that case.
 */
export const firebaseApp: FirebaseApp | null = isFirebaseConfigured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const auth: Auth | null = firebaseApp ? getAuth(firebaseApp) : null;

export const db: Database | null = firebaseApp
  ? getDatabase(firebaseApp)
  : null;

/**
 * Returns a fresh Firebase Auth ID token for the currently signed-in
 * admin. Used to authorize Realtime Database REST writes
 * (`?auth=<token>`). Throws when Firebase is not configured or when no
 * admin is signed in.
 */
export async function getAdminIdToken(): Promise<string> {
  if (!auth) {
    throw new Error(
      "Firebase Auth is not configured. Add your Firebase web app config to .env and enable Email/Password sign-in in the Firebase Console."
    );
  }
  const user = auth.currentUser;
  if (!user) {
    throw new Error("You must sign in to the Admin Portal before saving.");
  }
  return user.getIdToken();
}
