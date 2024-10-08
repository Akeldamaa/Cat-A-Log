import PropTypes from "prop-types";
import "./Avatar.css";

export function Avatar({ children }) {
  return <div className="avatar">{children}</div>;
}

Avatar.propTypes = {
  children: PropTypes.node,
};

export function AvatarImage({ src }) {
  return <img className="avatar-image" src={src} alt="Avatar" />;
}

AvatarImage.propTypes = {
  src: PropTypes.string,
};

export function AvatarFallback({ children }) {
  return <div className="avatar-fallback">{children}</div>;
}

AvatarFallback.propTypes = {
  children: PropTypes.node,
};
