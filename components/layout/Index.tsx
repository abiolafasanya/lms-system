import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Iprops } from './../../utility/interfaces';

const Index:React.FC<Iprops> = (props) => {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Index;
