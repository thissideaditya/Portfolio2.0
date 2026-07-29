import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Centered, max-width, responsively padded content wrapper.
 * Use this instead of repeating max-width/padding utilities everywhere.
 */
export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-content px-6 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
