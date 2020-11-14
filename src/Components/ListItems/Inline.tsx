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
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Inline() {
  return (
    <div className="ChartList">
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AddPhotoAlternateIcon />
          </Avatar>
        </ListItemAvatar>
        <TextField
          id="outlined-basic"
          label="Inline Photo URL"
          variant="outlined"
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}
