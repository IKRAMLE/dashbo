import { useState } from "react";
import { cn } from "@/lib/utils";

const Dialog = ({ children, open, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

const DialogTrigger = ({ children, asChild }) => {
  return children;
};

const DialogContent = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const DialogHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);

const DialogTitle = ({ className, ...props }) => (
  <h2
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
);

const DialogDescription = ({ className, ...props }) => (
  <p
    className={cn("text-sm text-gray-500", className)}
    {...props}
  />
);

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
}; 