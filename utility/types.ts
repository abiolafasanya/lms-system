import Error, { ErrorProps } from 'next/error';

import React from 'react';

export type PropTypes = {
  [name: string]: React.PropsWithChildren | any | React.SyntheticEvent;
};

export interface ITypes extends React.Context<{}>, PropTypes {}

export type ErrorType =
  | (Error<{}> & ErrorProps)
  | Readonly<Error<{}> & ErrorProps>;

  export type errType = unknown | string | any