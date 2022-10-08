import classNames from "classnames";
import React from "react";
import styles from "./index.module.scss";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  size?: "small" | "large";
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({ children, size, onClick, className }: Props) => {
  return (
    <button
      className={classNames(
        styles["button-component"],
        {
          [styles["-small"]]: size === "small",
          [styles["-large"]]: size === "large",
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
