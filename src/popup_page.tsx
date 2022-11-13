import React from "react";
import ReactDOM from "react-dom";
import { Popup } from "components/organisms/popup";
import "./index.scss"; // 全体のmarginのために設定

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
