export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

export const initFirebase = () => {
  console.warn("Firebase is not configured yet. Replace firebaseConfig with your project values.");
};

export const authService = {
  signIn: async () => {
    throw new Error("Firebase auth is not initialized yet.");
  },
  signUp: async () => {
    throw new Error("Firebase auth is not initialized yet.");
  },
  signOut: async () => {
    throw new Error("Firebase auth is not initialized yet.");
  },
};
