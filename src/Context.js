import React, { useState, createContext } from 'react';
export const Context = createContext();

const ContextComponent = props => {
  const [tasks, setTasks] = useState([]);

  

  return (
    <Context.Provider
    
    value={{
      ...props.value,
      tasks,
      setTasks
    }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextComponent;
