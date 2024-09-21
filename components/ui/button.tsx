// components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-gray-200 bg-gray-50 text-gray-800 hover:bg-gray-100 hover:text-gray-900",
        destructive: "bg-red-200 text-red-800 hover:bg-red-300",
        outline:
          "border border-gray-300 bg-transparent text-gray-800 hover:bg-gray-100",
        secondary: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        ghost: "text-gray-800 hover:bg-gray-100 hover:text-gray-900",
        link: "text-blue-600 underline-offset-4 hover:underline",
        blue: "bg-blue-200 text-blue-800 hover:bg-blue-300 focus:ring-blue-400",
        green:
          "bg-green-200 text-green-800 hover:bg-green-300 focus:ring-green-400",
        black: "bg-gray-900 text-white hover:bg-black focus:ring-gray-800",
        pastelBlue:
          "bg-blue-200 text-blue-800 hover:bg-blue-300 focus:ring-blue-400",
        pastelGreen:
          "bg-green-200 text-green-800 hover:bg-green-300 focus:ring-green-400",
        pastelPink:
          "bg-pink-200 text-pink-800 hover:bg-pink-300 focus:ring-pink-400",
        pastelYellow:
          "bg-yellow-200 text-yellow-800 hover:bg-yellow-300 focus:ring-yellow-400",
        pastelPurple:
          "bg-purple-200 text-purple-800 hover:bg-purple-300 focus:ring-purple-400",
        ios: "text-blue-700 hover:text-blue-800",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      alignment: {
        left: "justify-start",
        center: "justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      alignment: "center",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, alignment, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={buttonVariants({ variant, size, alignment, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
