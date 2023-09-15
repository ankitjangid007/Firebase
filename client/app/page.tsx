"use client";

import { User } from "firebase/auth";
import { getToken } from "firebase/messaging";
import { useEffect, useState } from "react";
import Auth from "./components/auth";
import { auth, messaging } from "./config/firebase-config";
import Movies from "./movies/page";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    Notification.requestPermission().then(async (permission) => {
      console.log("Notification permission: ", permission);
      if (permission === "granted") {
        try {
          getToken(messaging, {
            vapidKey:
              "BC3YUpa53-GAEnBVk8xNbkQ5EQnIFb5XPa3o4Rl_KaCejAy0kG7HhYKXRBAx788aZInrtLihk0QuQRyCUk9em8w",
          }).then((token) => {
            console.log("Token:", token);
          });
        } catch (error: any) {
          console.log("Error: ", error);
        }
      }
    });
  }, []);

  const isLoggedIn = !!user;

  return <>{isLoggedIn ? <Movies /> : <Auth />}</>;
}
