"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/auth";
import { login } from "./actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const { login } = useAuth();

  // const handleLogin = (e: { preventDefault: () => void }) => {
  // e.preventDefault();
  // const isAuthenticated = login(email, password);
  // if (!isAuthenticated) {
  //   setError("Invalid email or password");
  // }
  // login();
  // };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:block w-1/2 relative">
        <Image
          src="/images/wp2462450-pubg-mobile-wallpapers.jpg"
          alt="Login Background"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#0D1117] text-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">
            Sign in into OneTap
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form action={login} className="space-y-4">
            <div>
              <label className="block text-sm">Email</label>
              <input
                type="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm">Password</label>
              <input
                type="password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <a href="#" className="text-blue-400 hover:underline">
              Reset Password!
            </a>
          </div>
          {/* <div className="text-center mt-2">
            <span>Don’t have an account?</span>{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Sign Up
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}
