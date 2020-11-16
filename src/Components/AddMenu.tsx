import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  MenuProps,
  Menu,
  MenuItem,
  ListItemIcon,
  CardContent,
  List,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { TemplateTypes } from "./Preview";

import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import TitleIcon from "@material-ui/icons/Title";
import SubtitlesIcon from "@material-ui/icons/Subtitles";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import ImageIcon from "@material-ui/icons/Image";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

import { Inline, RichText, Title } from "./ListItems/Items";

import "./Cards.css";

interface AddMenuProps {
  title: string;
  listItemStrings?: string[];
  locationType: string;
  handleInput(inputs: TemplateTypes[]): any;
}

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function AddMenu(props: AddMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [allEl, setAllEl] = useState<string[]>([]);
  useEffect(() => {
    console.log(allEl);
  }, [allEl]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget.id);
    setAllEl([...allEl, event.currentTarget.id]);
    setAnchorEl(null);
  };

  const [allInputs, setAllInputs] = useState<TemplateTypes[]>([]);
  useEffect(() => {
    console.log(`Inputs: ${allInputs}`);
  }, [allInputs]);

  function getComponent(element: string, index: number, location: string) {
    switch (element) {
      case "title":
        return (
          <Title
            key={index}
            index={index}
            removeItem={removeItem}
            label="Title"
            listType={element}
            locationType={location}
            applyInput={addInput}
          />
        );
      case "subtitle":
        return (
          <Title
            key={index}
            index={index}
            removeItem={removeItem}
            label="Subtitle"
            listType={element}
            locationType={location}
            applyInput={addInput}
          />
        );
      case "chart":
        return (
          <Title
            key={index}
            index={index}
            removeItem={removeItem}
            label="Chart"
            listType={element}
            locationType={location}
            applyInput={addInput}
          />
        );
      case "background":
        return (
          <Title
            key={index}
            index={index}
            removeItem={removeItem}
            label="Background Image URL"
            listType={element}
            locationType={location}
            applyInput={addInput}
          />
        );
      case "inline":
        return (
          <Inline
            key={index}
            index={index}
            removeItem={removeItem}
            label="Inline Image URL"
            listType={element}
            locationType={location}
            applyInput={addInput}
          />
        );
        case "richtext":
          return (
            <RichText
              key={index}
              index={index}
              removeItem={removeItem}
              label="Rich Text"
              listType={element}
              locationType={location}
              applyInput={addInput}
            />
          );
      default:
        return (
          <Title
            key={index}
            index={index}
            removeItem={removeItem}
            label="Title"
            listType="title"
            locationType={location}
            applyInput={addInput}
          />
        );
    }
  }

  const removeItem = (index: number) => {
    console.log(`PRIOR ${index}`);
    console.log(JSON.stringify(allEl));
    const filteredItems = allEl
      .slice(0, index)
      .concat(allEl.slice(index + 1, allEl.length));
    console.log(JSON.stringify(filteredItems));
    setAllEl(filteredItems);

    const filteredInputs = allInputs
      .slice(0, index)
      .concat(allInputs.slice(index + 1, allInputs.length));
    console.log(JSON.stringify(filteredInputs));
    setAllInputs(filteredInputs);
  };

  const addInput = (index: number, input: string, listType: string) => {
    console.log(`Input Index: ${index}, value: ${input}`);
    console.log(`Old Inputs: ${JSON.stringify(allInputs)}`);
    var changeArray = [...allInputs];
    changeArray.splice(index, 1, { type: listType, value: input });
    console.log(`Applied Array: ${JSON.stringify(changeArray)}`);
    setAllInputs(changeArray);
  };

  useEffect(() => {
    console.log(`New Inputs: ${allInputs}`);
    props.handleInput(allInputs);
  }, [allInputs]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Button
            aria-controls="header-menu"
            aria-haspopup="true"
            color="primary"
            variant="contained"
            onClick={handleClick}
            endIcon={<AddIcon />}
          >
            {props.title}
          </Button>
          <List>
            {allEl.map((element, index) =>
              getComponent(element, index, props.locationType)
            )}
          </List>
        </CardContent>
      </Card>

      {/* Menu that appears when button is clicked */}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleMenuClick} id="title">
          <ListItemIcon>
            <TitleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Title" />
        </StyledMenuItem>

        <StyledMenuItem onClick={handleMenuClick} id="subtitle">
          <ListItemIcon>
            <SubtitlesIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Subtitle" />
        </StyledMenuItem>

        <StyledMenuItem onClick={handleMenuClick} id="chart">
          <ListItemIcon>
            <InsertChartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Chart" />
        </StyledMenuItem>

        <StyledMenuItem onClick={handleMenuClick} id="background">
          <ListItemIcon>
            <ImageIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Background" />
        </StyledMenuItem>

        <StyledMenuItem onClick={handleMenuClick} id="inline">
          <ListItemIcon>
            <AddPhotoAlternateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Inline Image" />
        </StyledMenuItem>

          <StyledMenuItem onClick={handleMenuClick} id="richtext">
          <ListItemIcon>
            <AddPhotoAlternateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Rich Text" />
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
}
