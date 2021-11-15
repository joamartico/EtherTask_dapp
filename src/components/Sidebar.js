import { IonButton, IonInput, IonText, IonTextarea } from '@ionic/react';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../Context';

import { Padding, Row } from './StyledComponents';
import TaskInputs from "./TaskInputs";

const Sidebar = ({ display }) => {

  if (display) {
    return (
      <Wrapper>
        <Padding>
          <h1>EtherTask</h1>

          <TaskInputs />
        </Padding>
      </Wrapper>
    );
  } else {
    return null;
  }
};

export default Sidebar;

const Wrapper = styled.div`
  background: #fff5;
  backdrop-filter: blur(35px);
  width: 400px;
  height: 100%;
  top: 0;
  z-index: 9999999;
`;

