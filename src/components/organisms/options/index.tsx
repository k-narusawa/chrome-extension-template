import React, { useEffect, useState } from "react";

const Options = () => {
  const [maxResultNum, setMaxResultNum] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    chrome.storage.sync.get((items) => {
      setMaxResultNum(items.maxResultNum);
    });
  }, []);

  const saveOptions = () => {
    // Saves options to chrome.storage.sync.
    chrome.storage.sync.set(
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

  return (
    <>
      <div>
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
      <button onClick={saveOptions}>Save</button>
    </>
  );
};

export default Options;
