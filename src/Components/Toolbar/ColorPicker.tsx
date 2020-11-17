import React, { useEffect, useState } from "react";
import { ChromePicker, ColorResult } from "react-color";

import icon from "../../assets/icons/bold.svg";

interface ColorPicProps {
  expanded: boolean;
  onExpandEvent(): any;
  onChange(color: string, hex: string): any;
  currentState: {
    color: string;
  };
}

export default function ColorPic(props: any) {
  const [color, setColor] = useState<string>("#FFF");

  const { expanded, onExpandEvent, onChange, currentState } = props;

  function handleChange(
    color: ColorResult,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    console.log(`HEX ${color}`);
    setColor(color.hex);
    onChange("color", color.hex);
  }

  function renderModal() {
    const { color } = currentState;
    return <ChromePicker onChange={handleChange} color={color} />;
  }

  return (
    <div
      aria-haspopup="true"
      aria-expanded={expanded}
      aria-label="rdw-color-picker"
    >
      <div onClick={renderModal}>
        <img src={icon} alt="" />
      </div>
      {/*{expanded ? renderModal() : undefined}*/}
    </div>
  );
}
