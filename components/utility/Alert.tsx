import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaInfoCircle } from 'react-icons/fa';
import { Iprops } from 'utility/interfaces';

const Alert: React.FC<Iprops> = (props) => {
  const [close, setClose] = useState<boolean>(false);
  function closeAlert() {
    setClose(true);
  }
  return (
    <>
      {!close && (
        <div
          className={`${props.className} py-1 px-5 rounded relative border my-2 text-center`}
        >
          {props.children}
          {props.type === true && (
            <button onClick={closeAlert}>
              <FaTimes className="absolute top-5 right-5" title="close alert" />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Alert;

type AlertProp = { message: string; type: any };

export const AlertMsg: React.FC<AlertProp> = ({ message, type }) => {
  console.log(message, type);
  return (
    <div className={type + ' flex items-center space-x-2'} >
      <FaInfoCircle />
      <span> {message} </span>
    </div>
  );
};
