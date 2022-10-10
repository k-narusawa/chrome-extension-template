import classNames from "classnames";
import styles from "./index.module.scss";
import {
  Home,
  Search,
  PersonOutline,
  CheckBoxOutlineBlank,
  CheckBox,
  Cancel,
  CloudUpload,
  Close,
  GitHub,
  Person,
  Login,
  Logout,
  Cached,
  Settings,
} from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import React from "react";

type IconButtonProps = {
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  backgroundColor?: string;
  size?: "small" | "inherit" | "large" | "medium";
};

function withIconStyle(
  Icon: typeof SvgIcon
): React.ComponentType<IconButtonProps> {
  const IconWithStyle = (props: IconButtonProps) => {
    const { onClick, size } = props;

    return (
      <Icon
        className={classNames(styles["icon-button-component"], {
          [styles["-cursor"]]: onClick != undefined,
        })}
        fontSize={size}
        onClick={onClick}
      />
    );
  };

  return IconWithStyle;
}

export const HomeIcon = withIconStyle(Home);
export const SearchIcon = withIconStyle(Search);
export const PersonOutlineIcon = withIconStyle(PersonOutline);
export const CheckBoxOutlineBlankIcon = withIconStyle(CheckBoxOutlineBlank);
export const CheckBoxIcon = withIconStyle(CheckBox);
export const CancelIcon = withIconStyle(Cancel);
export const CloudUploadIcon = withIconStyle(CloudUpload);
export const CloseIcon = withIconStyle(Close);
export const GitHubIcon = withIconStyle(GitHub);
export const PersonIcon = withIconStyle(Person);
export const LoginIcon = withIconStyle(Login);
export const LogoutIcon = withIconStyle(Logout);
export const CachedIcon = withIconStyle(Cached);
export const SettingIcon = withIconStyle(Settings);
