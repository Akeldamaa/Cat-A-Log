import React from 'react';

export function Avatar({ children }) {
  return <div className="avatar">{children}</div>;
}

export function AvatarImage({ src }) {
  return <img className="avatar-img" src={src} alt="Avatar" />;
}

export function AvatarFallback({ children }) {
  return <div className="avatar-fallback">{children}</div>;
}
