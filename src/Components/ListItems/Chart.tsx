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
import InsertChartIcon from "@material-ui/icons/InsertChart";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Chart() {
  return (
    <div className="ChartList">
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <InsertChartIcon />
          </Avatar>
        </ListItemAvatar>
        <TextField id="outlined-basic" label="Chart Title" variant="outlined" />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}
