"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setSuccess("Login successful");
        setError("");
        const responseData = await response.json();
        const accessToken = responseData.access_token;
        localStorage.setItem("token", accessToken);
        window.location.href = "/home";
      } else {
        setError("Invalid email or password");
        setSuccess("");
      }
    } catch (error) {
      setError("Error logging in: " + error.message);
      setSuccess("");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      {loading ? (
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-gray-700 dark:text-gray-700" />
          <p className="mt-4 text-gray-700 dark:text-gray-700">Login...</p>
        </div>
      ) : (
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg ">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email address and password{" "}
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              className="mt-1"
              id="email"
              placeholder="Enter your email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                className="text-sm font-small text-gray-600 hover:underline dark:text-gray-400"
                href="/forgotpassword"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Input
                className="mt-1 pr-10"
                id="password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.5 17h-11M12 8v.01"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.5 17h-11M12 8v.01"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <Button className="w-full mx-auto bg-black text-white" type="submit">
            Login
          </Button>
        </form>
        <div className="text-center mt-4">
    <ul>
      <li className="text-gray-700 dark:text-gray-700 cursor-pointer" onClick={() => window.location.href = "/register"}>
      Don't have an account yet? Register here
      </li>
    </ul>
  </div>
      </div>
      )}
    </div>
  );
}
