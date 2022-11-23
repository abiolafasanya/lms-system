import React, { useState, createContext } from 'react';
import { PropTypes } from 'utility/types';

const AlertContext = createContext<PropTypes>({});

export const AlertProvider: React.FC<PropTypes> = ({ children }) => {
      const [alert, setAlert] = useState({});
      return (
        <AlertContext.Provider value={{ alert, setAlert }}>
          {children}
        </AlertContext.Provider>
      );
    };

export default AlertContext
