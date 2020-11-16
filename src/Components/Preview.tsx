import React from "react";
import SanitizedHTML from "sanitize-html";
import template from "../assets/template.html";
import nunjucks from "nunjucks";
import GoogleChartsNode from "google-charts-node";

import { Card, Divider, Typography } from "@material-ui/core";
import "./Cards.css";

export interface PreviewProps {
  containers: undefined | Containers;
}

export interface Containers {
  header?: Array<TemplateTypes>;
  body?: Array<TemplateTypes>;
  footer?: Array<TemplateTypes>;
}

export interface TemplateTypes {
  type: string;
  value: string;
}

export default function Preview(props: PreviewProps) {
  let { containers } = props;
  let env = nunjucks.configure({ autoescape: false });
  //let rendered = nunjucks.renderString(template, { test: "Hellow World" });
  var tmpl = new nunjucks.Template(template, env, true);
  /*{
    header: [
      { type: "title", value: "Hello World" },
      { type: "chart" },
      { type: "subtitle", value: "Subtitle" },
      { type: "inline" },
      { type: "chair" },
      { type: "background" },
    ],
  }*/
  let rendered = tmpl.render(containers);

  let cleanedHtml = SanitizedHTML(rendered, {
    allowedTags: false,
    allowedAttributes: false,
    allowedSchemes: ["https", "tel"],
    allowedSchemesByTag: {
      img: ["data", "https"],
    },
  });

  return (
    <Card className="Cards">
      <Typography variant="h4">Preview</Typography>
      <Divider />
      <div dangerouslySetInnerHTML={{ __html: cleanedHtml }} />
    </Card>
  );
}
