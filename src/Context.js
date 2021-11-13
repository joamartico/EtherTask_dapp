import React, { useState, createContext } from 'react';
export const Context = createContext();

const ContextComponent = props => {
  

  return (
    <Context.Provider
    value={{
    }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextComponent;
