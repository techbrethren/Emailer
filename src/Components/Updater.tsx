import React, { useState } from "react";
import { autoUpdater } from "electron-updater";
import Button from "@material-ui/core/Button";
import { ipcRenderer, shell } from "electron";

enum Update {
  Available,
  NoneAvailable,
  Error,
}

export default function Updater() {
  const [updateStatus, setUpdateStatus] = useState<Update>(
    Update.NoneAvailable
  );
  const [link, setLink] = useState<string>("");

  ipcRenderer.on("error", (event, text) => {
    console.log(`Recieved`);
    setUpdateStatus(Update.Error);
  });
  ipcRenderer.on("update-not-available", (event, text) => {
    console.log(`Recieved avail`);
    setUpdateStatus(Update.NoneAvailable);
  });
  ipcRenderer.on("update_available", (event, text) => {
      console.log(`It's Here ${JSON.stringify(text)}`);
      setLink(
        `https://github.com/techbrethren/Emailer/releases/tag/v${text.version}`
      );
      setUpdateStatus(Update.Available);
  });
    function darwinOpenLink() {
      shell.openExternal(link);
    }
    function getProperButton() {
      switch (updateStatus) {
        case Update.Available:
          if (process.platform === "darwin") {
            return <Button onClick={darwinOpenLink}>Download Update {}</Button>;
          } else {
            return <Button onClick={darwinOpenLink}>Update Available</Button>;
          }
        case Update.NoneAvailable:
          return null;
        case Update.Error:
          return <Button>Error!</Button>;
      }
    }

    return getProperButton();
}
