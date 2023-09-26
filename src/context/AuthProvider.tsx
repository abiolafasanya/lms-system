import React, { useState, createContext } from 'react';

type PropTypes = { [name: string]: React.Context<{}> | React.PropsWithChildren | any}

const AuthContext = createContext<PropTypes>({});

export const AuthProvider: React.FC<PropTypes> = ({ children }) => {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
