import React from 'react';

export default function Preview({ html }) {
  return (
    <div
      className="refill"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: html.value,
      }}
    />
  );
}
