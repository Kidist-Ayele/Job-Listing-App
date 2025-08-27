"use client";

import type React from "react";
import { useState, useEffect, Suspense } from "react";
import { signIn, getSession, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

function SignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/jobs";
  const message = searchParams.get("message");
  const { data: session, status } = useSession();

  useEffect(() => {
    if (message) {
      setSuccess(message);
    }
  }, [message]);

  // Handle redirect when session is established
  useEffect(() => {
    if (shouldRedirect && session && status === "authenticated") {
      console.log("Session established, redirecting to:", callbackUrl);
      window.location.href = callbackUrl;
    }
  }, [shouldRedirect, session, status, callbackUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log("Attempting sign in...");
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl,
      });

      console.log("Sign in result:", result);
      console.log("Result ok:", result?.ok);
      console.log("Result error:", result?.error);
      console.log("Callback URL:", callbackUrl);

      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          setError(
            "The email or password you entered doesn't match our records. Please check your details and try again."
          );
        } else {
          setError(
            "We're having trouble signing you in. Please try again or contact support if the problem continues."
          );
        }
      } else if (result?.ok) {
        // Set success message and trigger redirect
        setSuccess("Welcome back! We're taking you to your dashboard...");
        setShouldRedirect(true);

        // Fallback redirect in case session doesn't update
        setTimeout(() => {
          if (!session) {
            console.log("Fallback redirect to:", callbackUrl);
            window.location.href = callbackUrl;
          }
        }, 3000);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setError(
        "We encountered an unexpected issue. Please try again or contact our support team if the problem continues."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/signin.png"
          alt="Sign In"
          fill
          sizes="(max-width: 1024px) 0vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-md w-full space-y-6 sm:space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Welcome Back,
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="mt-1 placeholder:text-gray-400"
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="pr-10 placeholder:text-gray-400"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {success && (
                <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              )}

              {error && (
                <div className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <svg
                    className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-800 hover:bg-indigo-900 text-white py-2.5 sm:py-3 rounded-full font-medium disabled:opacity-50 text-sm sm:text-base"
              >
                {isLoading ? "Signing in..." : "Login"}
              </Button>
            </form>

            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
}
