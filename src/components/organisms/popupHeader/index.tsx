import classNames from "classnames";
import { CachedIcon } from "components/atoms/IconButton";
import React from "react";
import styles from "./index.module.scss";

type Props = {
  reload: () => void;
};

export const PopupHeader = ({ reload }: Props) => {
  return (
    <>
      <div className={classNames(styles["popup-header-component"])}>
        <header>
          <div className={classNames(styles["header-wrapper"])}>
            <div id="subject" className={classNames(styles["subject"])}>
              <p>{chrome.i18n.getMessage("application_name")}</p>
            </div>
            <ul className={classNames(styles["navi"])}>
              <li>
                <CachedIcon onClick={reload} />
              </li>
            </ul>
          </div>
        </header>
      </div>
    </>
  );
};
