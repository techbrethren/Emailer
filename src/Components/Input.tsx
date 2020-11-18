import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Divider,
  Typography,
  CardContent,
} from "@material-ui/core";
import AddMenu from "./AddMenu";
import { Containers, TemplateTypes } from "./Preview";
import "./Cards.css";

interface InputProps {
  setContainers: (containers: Containers) => void;
}
export default function Preview(props: InputProps) {
  const [header, setHeader] = useState<undefined | TemplateTypes[]>(undefined);
  const [body, setBody] = useState<undefined | TemplateTypes[]>(undefined);
  const [footer, setFooter] = useState<undefined | TemplateTypes[]>(undefined);

  function handleHeaders(headers: TemplateTypes[]) {
    setHeader(headers);
  }
  function handleBody(body: TemplateTypes[]) {
    setBody(body);
  }
  function handleFooter(footers: TemplateTypes[]) {
    setFooter(footers);
  }
  const { setContainers } = props;
  useEffect(() => {
    let containers: Containers = {
      header: header,
      body: body,
      footer: footer,
      easter: getEaster(),
    };
    if (setContainers) {
      console.log(`Container ${JSON.stringify(containers)}`);
      setContainers(containers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [header, body, footer]);

  function getEaster(): string {
    const options = [
      "Made with 🖍 by the Tech Brethren",
      "65% of the time, it works 100% of the time",
      "2 Nephi 22:2",
      "D&amp;C 66:6",
      "1 Nephi 2:15",
    ];
    return options[Math.floor(Math.random() * options.length)];
  }

  return (
    <Card className="Cards">
      <CardContent>
        {/*<Typography variant="h4">Input</Typography>*/}
        <CardHeader
          title="Input"
          subheader="Enter Content Here"
        />
        <Divider />
        <AddMenu
          title="Header"
          locationType="header"
          handleInput={handleHeaders}
        />
        <Divider />
        <AddMenu title="Body" locationType="body" handleInput={handleBody} />
        <Divider />
        <AddMenu
          title="Footer"
          locationType="footer"
          handleInput={handleFooter}
        />
      </CardContent>
    </Card>
  );
}
