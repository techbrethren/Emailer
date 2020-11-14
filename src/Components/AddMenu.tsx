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

import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import TitleIcon from "@material-ui/icons/Title";
import SubtitlesIcon from "@material-ui/icons/Subtitles";
import InsertChartIcon from "@material-ui/icons/InsertChart";
import ImageIcon from "@material-ui/icons/Image";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

import { Title } from "./ListItems/Items";

import "./Cards.css";

interface AddMenuProps {
  title: string;
  listItemStrings?: string[];
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
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget.id);
    setAllEl([...allEl, event.currentTarget.id]);
    setAnchorEl(null);
  };

  const removeItem = (index: number) => {
    console.log(`PRIOR ${index}`);
    console.log(JSON.stringify(allEl));
    const filteredItems = allEl
      .slice(0, index)
      .concat(allEl.slice(index + 1, allEl.length));
    console.log(JSON.stringify(filteredItems));
    setAllEl(filteredItems);
  };

  function getComponent(element: string, index: number) {
    switch (element) {
      case "title":
        return (
          <Title
            key={index}
            index={index}
            removeItem={removeItem}
            label="Title"
            listType={element}
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
          />
        );
      case "inline":
        return (
          <Title
            key={index}
            index={index}
            removeItem={removeItem}
            label="Inline Image URL"
            listType={element}
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
          />
        );
    }
  }

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
            {allEl.map((element, index) => getComponent(element, index))}
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
      </StyledMenu>
    </>
  );
}
