import { IonButton, IonInput, IonText, IonTextarea } from '@ionic/react';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from "../Context";
import { Padding, Row } from './StyledComponents';

const Sidebar = ({ display, address }) => {


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

const InputTitle = styled(IonInput)`
    background-color: white;
    border-radius: 10px;
`;

const InputDescription = styled(IonTextarea)`
    background-color: white;
    border-radius: 10px;
`;