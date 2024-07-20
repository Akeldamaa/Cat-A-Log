import React from 'react';

export function Label({ htmlFor, className, children }) {
  return (
    <label htmlFor={htmlFor} className={`label ${className}`}>
      {children}
    </label>
  );
}
