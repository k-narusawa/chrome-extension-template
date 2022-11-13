import Button from "../../atoms/Button";
import { useAuth } from "../../../hooks/useAuth";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

const Options = () => {
  const { login, logout } = useAuth();
  const [maxResultNum, setMaxResultNum] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get((items) => {
      setMaxResultNum(items.maxResultNum);
      setIsLogin(items.isLogin);
    });
  }, [isLogin]);

  const saveOptions = async () => {
    // Saves options to chrome.storage.sync.
    await chrome.storage.sync.set(
      {
        maxResultNum: maxResultNum,
      },
      () => {
        const message = chrome.i18n.getMessage("save_complete");
        setStatus(message);
        const id = setTimeout(() => {
          setStatus("");
        }, 1000);
        return () => clearTimeout(id);
      }
    );
  };

  chrome.storage.onChanged.addListener(() => {
    chrome.storage.sync.get((items) => {
      setMaxResultNum(items.maxResultNum);
      setIsLogin(items.isLogin);
    });
  });

  return (
    <>
      <div className={classNames(styles["options-component"])}>
        <div>
          {(() => {
            if (isLogin === false) {
              return (
                <>
                  <Button
                    onClick={login}
                    size="small"
                    className={classNames(styles["login-button"])}
                  >
                    LOGIN
                  </Button>
                </>
              );
            } else {
              return (
                <>
                  <Button
                    onClick={logout}
                    size="small"
                    className={classNames(styles["login-button"])}
                  >
                    LOGOUT
                  </Button>
                </>
              );
            }
          })()}
          <br />
          <label>
            {chrome.i18n.getMessage("options_fetch_size")}
            <input
              type="number"
              name="name"
              defaultValue={maxResultNum}
              onChange={(event) => setMaxResultNum(event.target.value)}
            />
          </label>
        </div>
        <div>{status}</div>
        <Button
          onClick={saveOptions}
          size="small"
          className={classNames(styles["save-button"])}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default Options;
