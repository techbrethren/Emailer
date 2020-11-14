import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Fabric, Customizer, loadTheme, createTheme } from "@fluentui/react";
import { AzureThemeDark } from "@uifabric/azure-themes";

const customizations = AzureThemeDark;

const myTheme = createTheme({
  palette: {
    themePrimary: "#5c9ed1",
    themeLighterAlt: "#040608",
    themeLighter: "#0f1921",
    themeLight: "#1c303f",
    themeTertiary: "#375f7d",
    themeSecondary: "#518bb8",
    themeDarkAlt: "#6aa7d6",
    themeDark: "#7eb4dc",
    themeDarker: "#9dc6e5",
    neutralLighterAlt: "#262121",
    neutralLighter: "#2f2a2a",
    neutralLight: "#3d3737",
    neutralQuaternaryAlt: "#463f3f",
    neutralQuaternary: "#4d4646",
    neutralTertiaryAlt: "#6b6363",
    neutralTertiary: "#c8c8c8",
    neutralSecondary: "#d0d0d0",
    neutralPrimaryAlt: "#dadada",
    neutralPrimary: "#ffffff",
    neutralDark: "#f4f4f4",
    black: "#f8f8f8",
    white: "#1c1919",
  },
});

loadTheme(myTheme);

ReactDOM.render(
  <React.StrictMode>
    <Fabric>
      <Customizer {...customizations}>
        <App />
      </Customizer>
    </Fabric>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
