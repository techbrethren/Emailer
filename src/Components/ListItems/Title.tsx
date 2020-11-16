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
import TitleIcon from "@material-ui/icons/Title";
import SubtitlesIcon from "@material-ui/icons/Subtitles";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import ImageIcon from "@material-ui/icons/Image";
import DeleteIcon from "@material-ui/icons/Delete";

interface ListProps {
  removeItem(index: number): any;
  index: number;
  label: string;
  listType: string;
  locationType: string;
  applyInput(index: number, value: string, listType: string): any;
}

export default function Title(props: ListProps) {
  const { removeItem, index, label, listType, locationType } = props;

  function getAvatar() {
    switch (listType) {
      case "title":
        return <TitleIcon />;
      case "subtitle":
        return <SubtitlesIcon />;
      case "chart":
        return <InsertChartIcon />;
      case "background":
        return <ImageIcon />;
      case "inline":
        return <AddPhotoAlternateIcon />;
      default:
        return <TitleIcon />;
    }
  }

  const [value, setValue] = useState<string>("");
  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(event.target.value);
    props.applyInput(props.index, event.target.value, props.listType);
    setValue(event.target.value);
  };

  return (
    <div className="TitleList">
      <ListItem>
        <ListItemAvatar>
          <Avatar>{getAvatar()}</Avatar>
        </ListItemAvatar>
        <TextField
          id="outlined-basic"
          label={label}
          variant="outlined"
          onChange={handleOnChange}
        />
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
