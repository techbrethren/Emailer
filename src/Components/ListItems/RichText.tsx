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
import SubtitlesIcon from "@material-ui/icons/Subtitles";
import DeleteIcon from "@material-ui/icons/Delete";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// import ColorPic from "../Toolbar/ColorPicker"

import bold from "../../assets/icons/bold.svg";
import code from "../../assets/icons/code.svg";

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

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.default,
        border: theme.palette.divider,
        //background: theme.palette.background.default,
        '& .rdw-dropdown-optionwrapper': {
          //background: theme.palette.background.default,
          //backgroundColor: theme.palette.background.default
          backgroundColor: theme.palette.background.paper,
          border: theme.palette.divider
        },
        '& .rdw-option-wrapper': {
          //background: theme.palette.background.default,
          //backgroundColor: theme.palette.background.default
          backgroundColor: theme.palette.background.paper,
          border: theme.palette.action.selected
        },
        '& .rdw-option-active': {
          //background: theme.palette.background.default,
          //backgroundColor: theme.palette.background.default
          backgroundColor: theme.palette.action.selected,
          "box-shadow": `1px 1px 0px ${theme.palette.action.selected} inset`,
          border: theme.palette.action.selected
        },
        '& .rdw-option-wrapper:hover, .rdw-dropdown-wrapper:hover': {
          "box-shadow": `1px 1px 0px ${theme.palette.action.hover} inset`,
        },
        '& .rdw-dropdown-wrapper:active': {
          "box-shadow": `1px 1px 0px ${theme.palette.action.selected} inset`,
        },
        '& .rdw-dropdown-wrapper': {
          // background: theme.palette.background.default,
          backgroundColor: theme.palette.background.paper,
          border: theme.palette.divider
        },
        '& .rdw-dropdownoption-active': {
          // background: theme.palette.background.default,
          backgroundColor: theme.palette.action.selected
        },
        '& .rdw-dropdownoption-highlighted': {
          //background: theme.palette.action.hover,
          backgroundColor: theme.palette.action.hover
        },
        '& .rdw-colorpicker-modal, .rdw-link-modal, .rdw-emoji-modal, .rdw-embedded-modal, .rdw-image-modal': {
          backgroundColor: theme.palette.background.paper,
          border: theme.palette.divider
        },
        '& .rdw-colorpicker-cube': {
          border: theme.palette.divider
        }
        
      },
      toolbar: {
        backgroundColor: theme.palette.background.default,
        background: theme.palette.background.default,
        border: theme.palette.divider
      },
      editor: {
        backgroundColor: theme.palette.background.default,
        background: theme.palette.background.default,
        border: theme.palette.divider,
        padding: theme.spacing(2),
      }
    })
  );
  const classes = useStyles();
  
  return (
    <div className="ChartList">
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <SubtitlesIcon />
          </Avatar>
        </ListItemAvatar>
        <Editor
          wrapperClassName={classes.root}
          editorClassName={classes.editor}
          toolbarClassName={classes.toolbar}
          editorState={editorState}
          onEditorStateChange={handleChange}
          placeholder="Start typing..."
          toolbar={{
            inline: {
              bold: {
                icon: bold
              },
              monospace: {
                icon: code,
              },
            },
            // colorPicker: { component: ColorPic }
          }}
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
