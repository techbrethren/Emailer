import React from 'react';
import { SketchPicker } from 'react-color';

export default class Picker extends React.Component<
  unknown,
  { background: string }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      background: '#000',
    };
  }

  handleChangeComplete = (color, event) => {
    this.setState({ background: color.hex });
    console.log(event.target);
  };

  render() {
    const { background } = this.state;
    return (
      <SketchPicker
        key="Yeet"
        color={background}
        onChange={this.handleChangeComplete}
      />
    );
  }
}
