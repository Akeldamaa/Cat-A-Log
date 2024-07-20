import React from 'react';

export function Button({ variant, children, ...props }) {
  const className = `btn ${variant}`;
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
