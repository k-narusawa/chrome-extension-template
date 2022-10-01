import classNames from "classnames";
import { CachedIcon } from "../../atoms/IconButton";
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
              <p>{chrome.i18n.getMessage("header_subject")}</p>
            </div>
            <ul className={classNames(styles["navi"])}>
              <li>
                <a id="reload">
                  <CachedIcon onClick={reload} />
                </a>
              </li>
            </ul>
          </div>
        </header>
      </div>
    </>
  );
};
