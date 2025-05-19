"use client";

import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { IconType } from "react-icons/lib";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: IconType;
  iconPosition?: "left" | "right";
}

const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      icon: Icon,
      type = "button",
      iconPosition = "left",
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-purple-500 hover:bg-purple-500-hover text-white border-transparent",
      secondary:
        "bg-blue-500 hover:bg-purple-300 text-white border-transparent",
      outline:
        "bg-transparent border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white",
      ghost:
        "bg-transparent hover:bg-background-secondary text-purple-500 border-transparent",
      danger: "bg-red-500 hover:bg-red-300 text-white border-transparent",
    };

    const sizes = {
      sm: "px-2 py-1 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center font-medium rounded-md transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
          "disabled:opacity-50 disabled:cursor-not-allowed gap-2",
          // Apply variant and size
          variants[variant],
          sizes[size],
          // Custom className
          className
        )}
        type={type}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {Icon && iconPosition === "left" && !isLoading && (
          <Icon className="mr-1 h-5 w-5" />
        )}

        {children}

        {Icon && iconPosition === "right" && !isLoading && (
          <Icon className="ml-1h-5 w-5" />
        )}
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
