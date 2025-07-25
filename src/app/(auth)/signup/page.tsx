"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Eye, EyeOff, Github, Mail } from "lucide-react";
import { Logo } from "@/components/features/logo";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/20 via-primary/10 to-background relative">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_70%)]" />

        <div className="absolute top-6 left-6 z-20">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-foreground mb-4 leading-snug">
              Join us and start your journey
            </h1>
            <p className="text-muted-foreground text-lg">
              Create your account to build something amazing. We’re excited to
              have you on board.
            </p>
          </div>
        </div>
      </div>

      {/* Right Signup Form */}
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

            <div className="flex justify-center lg:hidden">
              <Logo />
            </div>

            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
                Create your account
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Social Signups */}
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

          {/* Signup Form */}
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <form className="space-y-5">
                {/* Full Name */}
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="h-11"
                    disabled={isLoading}
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-11"
                    disabled={isLoading}
                  />
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="h-11 pr-10"
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
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 mt-4"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Sign up"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground">
            By signing up, you agree to our{" "}
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
