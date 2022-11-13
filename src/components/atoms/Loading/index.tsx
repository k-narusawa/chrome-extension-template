import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

type Props = {};

const Loading = ({}: Props) => {
  return (
    <div className={classNames(styles["loading-component"])}>
      <LinearProgress />
    </div>
  );
};

export default Loading;
