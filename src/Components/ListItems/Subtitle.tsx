import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  TextField,
} from "@material-ui/core";
import SubtitlesIcon from "@material-ui/icons/Subtitles";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Subtitle() {
  return (
    <div className="SubtitleList">
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <SubtitlesIcon />
          </Avatar>
        </ListItemAvatar>
        <TextField id="outlined-basic" label="Subtitle" variant="outlined" />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}
