// Test
import React from "react";
import {
  Card,
  Divider,
  Typography,
} from "@material-ui/core";
import "./Cards.css";
export default function Preview() {
  return (
    <Card className="Cards">
      <Typography variant="h4">Preview</Typography>
      <Divider /> 
    </Card>
  );
}
