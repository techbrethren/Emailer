import React from 'react';
import { TextField } from '@material-ui/core';

export default function UserInputs({ data, handleInput}): JSX.Element {
  function genFields(): JSX.Element {
    const final: Array<JSX.Element> = [];
    data.map((field: { id: string; label: string }) =>
      final.push(
        <TextField
          id={field.id}
          label={field.label}
          key={field.id}
          variant="outlined"
          onChange={handleInput}
          // value={html.value}
        />
      )
    );
    return final;
  }
  return genFields();
}
