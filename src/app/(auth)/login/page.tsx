"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";
import { apiClient } from "@/lib/api-client";
import { AuthResponse } from "@/types";

// Validation schema matching server authentication requirements
const loginSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, "Email or phone number is required")
    .refine(
      (val) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        const isPhone = /^(?:\+88|88)?(01[3-9]\d{8})$/.test(val.replace(/[\s\-]/g, ""));
        return isEmail || isPhone;
      },
      {
        message: "Please enter a valid email address or 11-digit BD phone number",
      }
    ),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      // Determine if identifier is email or phone for server payload
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailOrPhone);
      const payload = isEmail
        ? { email: data.emailOrPhone.trim().toLowerCase(), password: data.password }
        : { phone: data.emailOrPhone.trim().replace(/[\s\-\+]/g, ""), password: data.password };

      // Call Express server auth endpoint: POST /api/v1/auth/signin
      const response = await apiClient.post<AuthResponse>("/auth/signin", payload);

      if (response.success && response.data) {
        const { user, accessToken } = response.data;
        login(user, accessToken);
        toast.success("Welcome back! Login successful.");
        router.push(callbackUrl);
      } else {
        toast.error(response.message || "Invalid credentials. Please try again.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(
        error.message || "Invalid email/phone or password. Please check your details."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to manage orders and wishlist"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email or Phone Input */}
        <Input
          label="Email or Phone Number"
          placeholder="name@example.com or 017XXXXXXXX"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.emailOrPhone?.message}
          required
          autoComplete="username"
          {...register("emailOrPhone")}
        />

        {/* Password Input with Show/Hide Toggle */}
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          error={errors.password?.message}
          required
          autoComplete="current-password"
          {...register("password")}
        />

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none text-zinc-400 hover:text-zinc-200">
            <input
              type="checkbox"
              className="w-4 h-4 rounded bg-black/40 border border-white/20 text-rose-600 focus:ring-rose-500/30 focus:ring-offset-0 transition-colors"
              {...register("rememberMe")}
            />
            <span>Remember me</span>
          </label>

          <Link
            href="/forgot-password"
            className="font-semibold text-zinc-400 hover:text-white underline underline-offset-4 transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </div>

        {/* Register Navigation Link */}
        <div className="pt-4 text-center border-t border-white/10 text-xs text-zinc-400">
          <span>Don&apos;t have an account? </span>
          <Link
            href="/register"
            className="font-bold text-white hover:underline underline-offset-4 transition-colors"
          >
            Create an Account
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
