<<<<<<< HEAD
import * as React from "react";

const TabsContext = React.createContext(null);

// Root Tabs component
const Tabs = ({ value, onValueChange, defaultValue, children, className, ...props }) => {
  const [activeTab, setActiveTab] = React.useState(value || defaultValue || "");

  // Update internal state when controlled value changes
  React.useEffect(() => {
    if (value !== undefined) {
      setActiveTab(value);
    }
  }, [value]);

  // Handle tab changes
  const handleTabChange = React.useCallback(
    (tabValue) => {
      if (value === undefined) {
        setActiveTab(tabValue);
      }
      onValueChange?.(tabValue);
    },
    [onValueChange, value]
  );

  return (
    <TabsContext.Provider value={{ activeTab, handleTabChange }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// TabsList component
const TabsList = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="tablist"
      className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}
      {...props}
    />
  );
});
TabsList.displayName = "TabsList";

// TabsTrigger component
const TabsTrigger = React.forwardRef(({ className, value, children, ...props }, ref) => {
  const { activeTab, handleTabChange } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      ref={ref}
      role="tab"
      type="button"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      onClick={() => handleTabChange(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});
TabsTrigger.displayName = "TabsTrigger";

// TabsContent component
const TabsContent = React.forwardRef(({ className, value, children, ...props }, ref) => {
  const { activeTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div
      ref={ref}
      role="tabpanel"
      data-state={isActive ? "active" : "inactive"}
      className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
=======
import { useState } from "react";
import { cn } from "@/lib/utils";

const Tabs = ({ defaultValue, className, children, ...props }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={cn("w-full", className)} {...props}>
      {children}
    </div>
  );
};

const TabsList = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500",
        className
      )}
>>>>>>> a83699f3511572d16d077c429be4a1b144221cef
      {...props}
    >
      {children}
    </div>
  );
<<<<<<< HEAD
});
TabsContent.displayName = "TabsContent";
=======
};

const TabsTrigger = ({ value, className, children, ...props }) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, className, children, ...props }) => {
  return (
    <div
      className={cn("mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2", className)}
      {...props}
    >
      {children}
    </div>
  );
};
>>>>>>> a83699f3511572d16d077c429be4a1b144221cef

export { Tabs, TabsList, TabsTrigger, TabsContent };