"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Lock, Mail, User, Phone, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Input } from "@/components/ui/input";
import { registerAction } from "@/lib/actions/auth-actions";

// Zod validation schema strictly aligned with server authUserSignUp constraints
const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(60, "Name is too long"),
    email: z
      .string()
      .email("Please enter a valid email address")
      .min(1, "Email address is required"),
    phone: z
      .string()
      .min(11, "Phone number must be at least 11 digits")
      .max(14, "Phone number is too long")
      .regex(/^(?:\+88|88)?(01[3-9]\d{8})$/, "Please enter a valid 11-digit Bangladeshi mobile number (e.g. 01712345678)"),
    password: z
      .string()
      .min(5, "Password must be at least 5 characters"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
    agreeTerms: z
      .boolean()
      .refine((val) => val === true, "You must agree to the Terms & Conditions"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function calculatePasswordStrength(pass: string): { score: number; label: string; color: string } {
  if (!pass) return { score: 0, label: "", color: "bg-zinc-700" };
  let score = 0;
  if (pass.length >= 5) score += 1;
  if (pass.length >= 8) score += 1;
  if (/[A-Z]/.test(pass) || /[0-9]/.test(pass)) score += 1;
  if (/[^A-Za-z0-9]/.test(pass)) score += 1;

  if (score === 1) return { score: 1, label: "Weak", color: "bg-red-500" };
  if (score === 2) return { score: 2, label: "Fair", color: "bg-amber-500" };
  if (score === 3) return { score: 3, label: "Good", color: "bg-blue-500" };
  return { score: 4, label: "Strong", color: "bg-emerald-500" };
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const passwordValue = watch("password") || "";
  const strength = calculatePasswordStrength(passwordValue);

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);

    try {
      // Payload matching backend authUserSignUp requirements in auth.service.js
      const payload = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim().replace(/[\s\-\+]/g, ""),
        password: data.password,
      };

      // Call secure Next.js Server Action
      const result = await registerAction(payload);

      if (result.success) {
        toast.success("Account created successfully! Please sign in with your credentials.");
        router.push("/login");
      } else {
        toast.error(result.message || "Registration failed. Please check your details.");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(
        error.message || "Failed to create account. Email or phone number may already be registered."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join HEEMS for exclusive drops, order tracking, and member rewards"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <Input
          label="Full Name"
          placeholder="e.g. Shakib Al Hasan"
          leftIcon={<User className="w-4 h-4" />}
          error={errors.name?.message}
          required
          autoComplete="name"
          {...register("name")}
        />

        {/* Email Address */}
        <Input
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          required
          autoComplete="email"
          {...register("email")}
        />

        {/* Phone Number */}
        <Input
          label="Mobile Phone Number"
          type="tel"
          placeholder="01712345678"
          leftIcon={<Phone className="w-4 h-4" />}
          error={errors.phone?.message}
          helperText="11 digits Bangladeshi mobile number"
          required
          autoComplete="tel"
          {...register("phone")}
        />

        {/* Password */}
        <div className="space-y-1.5">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Min 5 characters"
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
            autoComplete="new-password"
            {...register("password")}
          />

          {/* Password Strength Meter */}
          {passwordValue && (
            <div className="pt-1">
              <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
                <span>Password Strength</span>
                <span className="font-bold">{strength.label}</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 h-1">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-full rounded-full transition-all ${
                      step <= strength.score ? strength.color : "bg-zinc-800"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Re-type your password"
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          error={errors.confirmPassword?.message}
          required
          autoComplete="new-password"
          {...register("confirmPassword")}
        />

        {/* Agree to Terms Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-zinc-400 leading-tight">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 rounded bg-black/40 border border-white/20 text-rose-600 focus:ring-rose-500/30 focus:ring-offset-0 transition-colors shrink-0"
              {...register("agreeTerms")}
            />
            <span>
              I agree to the{" "}
              <Link
                href="/terms-condition"
                target="_blank"
                className="text-white font-semibold underline underline-offset-4 hover:text-rose-400 transition-colors"
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                target="_blank"
                className="text-white font-semibold underline underline-offset-4 hover:text-rose-400 transition-colors"
              >
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="text-[11px] font-medium text-rose-400 mt-1">
              {errors.agreeTerms.message}
            </p>
          )}
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
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </div>

        {/* Login Navigation Link */}
        <div className="pt-4 text-center border-t border-white/10 text-xs text-zinc-400">
          <span>Already have an account? </span>
          <Link
            href="/login"
            className="font-bold text-white hover:underline underline-offset-4 transition-colors"
          >
            Sign In Here
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
