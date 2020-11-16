import React, { FormEvent, useEffect, useState } from "react";
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
import {
  useTheme,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import draftToHtml from "draftjs-to-html";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import DeleteIcon from "@material-ui/icons/Delete";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface ListProps {
  removeItem(index: number): any;
  index: number;
  label: string;
  listType: string;
  locationType: string;
  applyInput(index: number, value: string, listType: string): any;
}

export default function RichText(props: ListProps) {
  const {
    removeItem,
    index,
    label,
    listType,
    locationType,
    applyInput,
  } = props;
  const [value, setValue] = useState<string>("");
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const handleChange = (state: EditorState) => {
    setEditorState(state);
  };
  useEffect(() => {
    console.log(`LISTINGS ${listType}`);
    let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log(`OUTPUT ${html}`);
    applyInput(index, html, listType);
  }, [editorState]);

  const theme = useTheme();
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.default,
      },
    })
  );
  const classes = useStyles();

  const helpers = {
    options: [
      "blockType",
      "fontSize",
      "fontFamily",
      "list",
      "textAlign",
      "colorPicker",
      "link",
      "embedded",
      "emoji",
      "image",
      "remove",
    ],
    blockType: {
      className: classes.root,
    },
    fontSize: {
      className: classes.root,
    },
    fontFamily: {
      className: classes.root,
    },
    list: {
      className: classes.root,
    },
    textAlign: {
      className: classes.root,
    },
    colorPicker: {
      className: classes.root,
    },
    link: {
      className: classes.root,
    },
    emoji: {
      className: classes.root,
    },
    embedded: {
      className: classes.root,
    },
    image: {
      className: classes.root,
    },
    remove: { className: classes.root },
  };

  // wrapperStyle={ backgroundColor: theme.palette.background }
  return (
    <div className="ChartList">
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AddPhotoAlternateIcon />
          </Avatar>
        </ListItemAvatar>
        <Editor
          wrapperClassName={classes.root}
          editorClassName={classes.root}
          toolbarClassName={classes.root}
          editorState={editorState}
          onEditorStateChange={handleChange}
          toolbar={helpers}
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
