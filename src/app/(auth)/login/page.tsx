"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Eye, EyeOff, Github, Mail, Loader } from "lucide-react";
import { Logo } from "@/components/features/logo";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data: LoginFormInputs) => {
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await axios.post(`${apiUrl}/auth/login`, {
        email: data.email,
        password: data.password,
      });

      // Handle successful login here
      console.log("Login successful:", response.data);
      toast.success("Login successful!");
      router.push("/dashboard"); // Redirect to dashboard or another page
    } catch (error: any) {
      if (error.response) {
        console.error("Login failed:", error.response.data);
        setError(
          error.response.data.message ||
            "Login failed. Please check your credentials."
        );
        toast.error(
          error.response.data.message || "Login failed. Please try again."
        );
      } else {
        console.error("Login failed:", error.message);
        setError("An unexpected error occurred. Please try again.");
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }

    // // Simulate a login process
    // setTimeout(() => {
    //   setIsLoading(false)
    //   // Handle successful login here
    //   console.log('Logging in with:', { email: data.email, password: data.password })
    // }, 2000)
    // setIsLoading(false)
    // console.log("Login clicked")
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/20 via-primary/10 to-background relative">
        {/* <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_70%)]" /> */}
        {/* <div className="absolute top-6 left-6 z-20">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div> */}
        <div className="relative z-10 flex flex-col py-50 px-12 xl:px-20">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-foreground mb-4 leading-snug">
              Welcome back to your journey
            </h1>
            <p className="text-muted-foreground text-lg">
              Continue building amazing experiences with our platform. Your next
              breakthrough is just a login away.
            </p>
          </div>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-6">
            <Link
              href="/"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to home
            </Link>

            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
                Sign in to your account
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-11"
              disabled={isLoading}
            >
              <Github className="w-4 h-4 mr-2" />
              Continue with GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full h-11"
              disabled={isLoading}
            >
              <Mail className="w-4 h-4 mr-2" />
              Continue with Google
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Login Form */}
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    // type="email"
                    placeholder="Enter your email"
                    className="h-11"
                    {...register("email")}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-11 pr-10"
                      {...register("password")}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                  <div className="flex justify-end">
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary hover:text-primary/80"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 mt-4"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                  {isLoading && <Loader className="ml-2" />}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:text-primary/80">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-primary hover:text-primary/80"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
