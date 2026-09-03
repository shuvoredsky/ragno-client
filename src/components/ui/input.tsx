import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold uppercase tracking-wider text-zinc-300"
          >
            {label} {props.required && <span className="text-rose-500">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-zinc-500 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full rounded-2xl bg-black/50 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-all outline-none",
              "focus:border-rose-500/80 focus:ring-2 focus:ring-rose-500/20 focus:bg-zinc-950",
              leftIcon ? "pl-11" : "",
              rightIcon ? "pr-11" : "",
              error
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30"
                : "hover:border-white/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 text-zinc-400 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <p className="text-[11px] font-medium text-rose-400 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-[11px] text-zinc-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
