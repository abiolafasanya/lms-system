import React, { useState } from 'react';
import { PropTypes } from 'utility/types';

const Modal: React.FC<PropTypes> = (props: any) => {
  return (
    <>
      <div className={props.className + ' modal'}>
        <header className="border-b p-2 text-center text-2xl font-semibold">
          {props.title}
        </header>
        <main className="p-3 my-3">{props.children}</main>
        {!props.hideFooter && (
          <footer className="p-2 border-t">
            {props.footer}
            <div className="px-5 flex items-center justify-between">
              {!props.hideConfirm && (
                <button className="btn" onClick={props.action}>
                  Confirm
                </button>
              )}
              <button
                className="btn bg-red-500 hover:bg-red-600"
                onClick={props.close}
              >
                Cancel
              </button>
            </div>
          </footer>
        )}
      </div>
    </>
  );
};

export default Modal;
