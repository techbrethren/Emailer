// Test
import React from "react";
import { Card, Divider, Typography, CardContent } from "@material-ui/core";
import AddMenu from "./AddMenu";
import "./Cards.css";

export default function Preview() {
  return (
    <Card className="Cards">
      <CardContent>
        <Typography variant="h4">Input</Typography>
        <Divider />
        <AddMenu title="Header"   />
        <Divider />
        <AddMenu title="Body"   />
        <Divider />
        <AddMenu title="Footer"   />
      </CardContent>
    </Card>
  );
}
