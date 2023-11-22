import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import AlertState from "./contexts/AlertContext/AlertState";
import AuthState from "./contexts/AuthContext/AuthState";
import NotificationState from "./contexts/NotificationContext/NotificationState";
import AppState from "./contexts/AppContext/AppState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <BrowserRouter>
      <AlertState>
        <AuthState>
          <NotificationState>
            <AppState>
              <App />
            </AppState>
          </NotificationState>
        </AuthState>
      </AlertState>
    </BrowserRouter>
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
