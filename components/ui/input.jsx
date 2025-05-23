<<<<<<< HEAD
import React from "react";

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    const baseClasses = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    
    return (
      <input
        type={type}
        className={className ? `${baseClasses} ${className}` : baseClasses}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
=======
import { cn } from "@/lib/utils";

const Input = ({ className, type = "text", ...props }) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};
>>>>>>> a83699f3511572d16d077c429be4a1b144221cef

export { Input };