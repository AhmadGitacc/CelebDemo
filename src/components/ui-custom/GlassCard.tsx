
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  highlight?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, interactive = false, highlight = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'glass-card p-6',
          interactive && 'card-hover-effect cursor-pointer',
          highlight && 'border-accent/20',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;
