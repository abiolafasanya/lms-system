import React from 'react';
import { Iprops } from 'utility/interfaces';

// interface Iprops extends React.PropsWithChildren {
//   className: any;
// }

const Container: React.FC<Iprops> = (props: any) => {
  return (
    <main className={'mycontainer ' + props.className }>{props.children}</main>
  );
};

export default Container;
