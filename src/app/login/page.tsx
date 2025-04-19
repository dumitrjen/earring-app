"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const [identifier, setIdentifier] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // used only for registration
  const [username, setUsername] = useState(""); // used only for registration
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  // Handle Login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
  
    try {
      // Special case for "admin" login
      if (identifier === "admin" && password === "admin") {
        console.log("Admin logged in");
        router.push("/admin-dashboard"); // Redirect to admin dashboard
        return;
      }
  
      // Regular login logic
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });
  
      const data = await res.json();
  
      if (data.exists) {
        if (data.user.password === password) {
          console.log("User basket:", data.user.basket);
  
          // Check if the user is an admin
          if (data.user.role === "admin") {
            router.push("/admin-dashboard"); // Redirect to admin dashboard
          } else {
            router.push("/"); // Redirect to homepage for regular users
          }
        } else {
          setError("Incorrect password");
        }
      } else {
        setError("User does not exist.");
      }
    } catch (err) {
      setError("Login failed. Try again.");
      console.error(err);
    }
  }

  // Handle Registration
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Could not register. Try again later.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
        onSubmit={isRegistering ? handleRegister : handleLogin}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          {isRegistering ? "Register" : "Login"}
        </h2>

        {!isRegistering && (
          <>
            <div className="mb-4">
              <label htmlFor="identifier" className="block text-gray-700 font-semibold mb-2">
                Email / Username
              </label>
              <input
                type="text"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm">Don&apos;t have an account?</p>
              <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className="text-blue-600 font-semibold underline mt-1"
              >
                Register
              </button>
            </div>
          </>
        )}

        {isRegistering && (
          <>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="register-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Register
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
