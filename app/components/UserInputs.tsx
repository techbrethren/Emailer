import React from 'react';
import { TextField } from '@material-ui/core';
import Grid, { GridSpacing } from '@material-ui/core/Grid';

export default function UserInputs({ data, handleInput}): JSX.Element {
  function genFields(): JSX.Element {
    const final: Array<JSX.Element> = [];
    data.map((field: { id: string; label: string }) =>
      final.push(
        <Grid key={`Grid_${field.id}`} item xs={6}>
          <TextField
            id={field.id}
            label={field.label}
            key={field.id}
            variant="outlined"
            onChange={handleInput}
            // value={html.value}
          />
        </Grid>
      )
    );
    return final;
  }
  return genFields();
}
