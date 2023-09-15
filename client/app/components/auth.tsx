"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { auth, googleProvider } from "../config/firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

const Auth = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const signIn = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      // router.push("/movies");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const signInWithGoogle = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-4 rounded shadow-lg">
        <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">
          Login
        </h2>
        <form onSubmit={signIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              value={credentials.email}
              onChange={handleChange}
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              value={credentials.password}
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Sign in
          </button>
        </form>
        <button
          onClick={signInWithGoogle}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 mt-2"
        >
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
