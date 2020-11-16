import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Button,
  TextField,
} from "@material-ui/core";
import { remote } from "electron";
import fs from "fs";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import DeleteIcon from "@material-ui/icons/Delete";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import mime from "mime-types";

const { dialog, app } = remote;
const WIN = remote.getCurrentWindow();

interface ListProps {
  removeItem(index: number): any;
  index: number;
  label: string;
  listType: string;
  locationType: string;
  applyInput(index: number, value: string, listType: string): any;
}

export default function Inline(props: ListProps) {
  const {
    removeItem,
    index,
    label,
    listType,
    locationType,
    applyInput,
  } = props;
  const [value, setValue] = useState<string>("");

  function encodeAsBase64(path: string): string {
    let imgCoded = fs.readFileSync(path, "base64");
    return imgCoded;
  }

  function openDialog() {
    dialog
      .showOpenDialog(WIN, {
        title: "Open Photo",
        defaultPath: app.getPath("downloads"),
        buttonLabel: "Open",
        filters: [
          { name: "Photos", extensions: ["jpg", "jpeg", "png", "gif", "tiff"] },
          { name: "All Files", extensions: ["*"] },
        ],
      })
      .then((filename) => {
        if (!filename.canceled) {
          console.log(
            `FILENAMED ${filename.filePaths} Canceled: ${filename.canceled}`
          );
          let mimeLookup = mime.lookup(filename.filePaths[0]);
          let encoded = encodeAsBase64(filename.filePaths[0]);
          console.log(`ENCODED ${encoded}`);
          console.log(`MIME ${mimeLookup}`);
          let applyString = `data:${mimeLookup};base64,${encoded}`;
          console.log(`Applied String ${applyString}`);
          applyInput(index, applyString, listType);
          setValue(applyString);
        }
      })
      .catch((err) => {
        console.error(`Errored at saving ${err}`);
      });
  }

  return (
    <div className="ChartList">
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AddPhotoAlternateIcon />
          </Avatar>
        </ListItemAvatar>
        <Button
          variant="contained"
          startIcon={<PhotoCamera />}
          onClick={openDialog}
        >
          Open Photo
        </Button>
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => removeItem(index)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}
