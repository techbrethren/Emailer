import React, { useState } from "react";
import { autoUpdater } from "electron-updater";
import Button from "@material-ui/core/Button";
import { ipcRenderer } from "electron";

export default function Updater() {
  ipcRenderer.on("error", (event, text) => {
    console.log(`Recieved`);
  });
  ipcRenderer.on("update-not-available", (event, text) => {
    console.log(`Recieved avail`);
  });
  ipcRenderer.on("update_available", (event, text) => {
    console.log(`It's Here`);
  });
  return (
    <>
      <Button> HELLO </Button>
    </>
  );
}
