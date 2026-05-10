import React from 'react';

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  variant?: TextVariant;
  className?: string;
  children: React.ReactNode;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ as, variant = 'p', className = '', children, ...props }, ref) => {
    const Component = as || variant;

    return (
      <Component ref={ref} className={className} {...props}>
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';
