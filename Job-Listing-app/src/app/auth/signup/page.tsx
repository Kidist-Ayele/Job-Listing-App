"use client";

import type React from "react";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/jobs";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Clear previous errors
    setFieldErrors({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Basic validation with user-friendly messages
    let hasErrors = false;

    if (!formData.name.trim()) {
      setFieldErrors((prev) => ({
        ...prev,
        name: "Please tell us your name so we can personalize your experience",
      }));
      hasErrors = true;
    }

    if (!formData.email.trim()) {
      setFieldErrors((prev) => ({
        ...prev,
        email: "Please enter your email address so we can keep you updated",
      }));
      hasErrors = true;
    } else {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setFieldErrors((prev) => ({
          ...prev,
          email:
            "Please enter a valid email address (e.g., yourname@example.com)",
        }));
        hasErrors = true;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword:
          "Your passwords don't match. Please make sure both passwords are the same",
      }));
      hasErrors = true;
    }

    if (formData.password.length < 6) {
      setFieldErrors((prev) => ({
        ...prev,
        password:
          "Your password should be at least 6 characters long for better security",
      }));
      hasErrors = true;
    }

    if (hasErrors) {
      setIsLoading(false);
      return;
    }

    try {
      console.log("Sending registration request...");

      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch("https://akil-backend.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "user",
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      // Get the raw response text first
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Parsed JSON data:", data);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        console.error("Response text that failed to parse:", responseText);
        setError(
          "We received an unexpected response from our servers. Please try again or contact support if this continues."
        );
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        // Handle specific error cases with user-friendly messages
        if (response.status === 409) {
          setError(
            "This email is already registered. Would you like to sign in instead?"
          );
        } else if (response.status === 400) {
          setError("Please double-check your information and try again.");
        } else if (response.status === 422) {
          setError(
            "Please make sure all your information is correct and try again."
          );
        } else if (response.status === 500) {
          setError(
            "We're experiencing some technical difficulties. Please try again in a few moments."
          );
        } else if (response.status === 503) {
          setError(
            "Our service is temporarily unavailable. Please try again later."
          );
        } else {
          setError(
            "Something went wrong. Please try again or contact support if the problem persists."
          );
        }
      } else {
        // Registration successful, redirect to verify email page
        setSuccess(
          "Great! Your account has been created successfully. Please check your email for a verification code to complete your registration."
        );
        setTimeout(() => {
          router.push(
            `/auth/verify-email?email=${encodeURIComponent(formData.email)}`
          );
        }, 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          setError(
            "It's taking longer than usual to connect. Please check your internet connection and try again."
          );
        } else {
          setError(
            "We encountered an unexpected issue. Please try again or contact our support team if the problem continues."
          );
        }
      } else {
        setError(
          "We encountered an unexpected issue. Please try again or contact our support team if the problem continues."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field-specific error when user starts typing
    setFieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    // Clear general error when user starts typing
    setError("");
  };

  const handleGoogleSignUp = () => {
    // Implement Google OAuth if needed
    console.log("Google signup not implemented yet");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/signup.png"
          alt="Sign Up"
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
                Sign Up Today!
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Google Sign Up Button */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignUp}
                className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 border-gray-300 bg-transparent hover:bg-gray-50"
                disabled={isLoading}
              >
                <Image
                  src="/google.png"
                  alt="Google"
                  width={20}
                  height={20}
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <span className="text-[#4640DE] font-semibold text-sm sm:text-base">
                  Sign Up with Google
                </span>
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or Sign Up with Email
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`mt-1 placeholder:text-gray-400 ${
                      fieldErrors.name
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    disabled={isLoading}
                  />
                  {fieldErrors.name && (
                    <div className="mt-2 flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
                      <svg
                        className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-red-700">{fieldErrors.name}</p>
                    </div>
                  )}
                </div>

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
                    className={`mt-1 placeholder:text-gray-400 ${
                      fieldErrors.email
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    disabled={isLoading}
                  />
                  {fieldErrors.email && (
                    <div className="mt-2 flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
                      <svg
                        className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-red-700">
                        {fieldErrors.email}
                      </p>
                    </div>
                  )}
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
                      className={`pr-10 placeholder:text-gray-400 ${
                        fieldErrors.password
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
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
                  {fieldErrors.password && (
                    <div className="mt-2 flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
                      <svg
                        className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-red-700">
                        {fieldErrors.password}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Enter password"
                      className={`pr-10 placeholder:text-gray-400 ${
                        fieldErrors.confirmPassword
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {fieldErrors.confirmPassword && (
                    <div className="mt-2 flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
                      <svg
                        className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-red-700">
                        {fieldErrors.confirmPassword}
                      </p>
                    </div>
                  )}
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
                    <div className="flex-1">
                      <p className="text-sm text-red-700">{error}</p>
                      {error.includes("already registered") && (
                        <div className="mt-2">
                          <Link
                            href="/auth/signin"
                            className="text-sm text-red-600 underline hover:no-underline font-medium"
                          >
                            Sign in to your existing account
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-800 hover:bg-indigo-900 text-white py-3 rounded-full font-medium disabled:opacity-50"
                >
                  {isLoading ? "Creating account..." : "Continue"}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/auth/signin"
                    className="text-indigo-600 hover:text-indigo-500 font-semibold"
                  >
                    Login
                  </Link>
                </p>
              </div>

              <div className="text-xs text-gray-500 text-center">
                By clicking 'Continue', you acknowledge that you have read and
                accepted our{" "}
                <Link
                  href="/terms"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Privacy Policy
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpForm />
    </Suspense>
  );
}
