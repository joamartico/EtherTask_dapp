import { IonButton, IonModal } from '@ionic/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { BlurCard, InputDescription, InputTitle, Padding } from './StyledComponents';
import { shortenAddress } from '../helpers/shortenAddress';
import TaskInputs from "./TaskInputs";

const BottomCard = ({display }) => {


  if (display) {
    return (
      <FixedBlurCard>
        <Padding>
          <TaskInputs mobile />
        </Padding>
      </FixedBlurCard>
    );
  } else {
    return null;
  }
};

export default BottomCard;

const FixedBlurCard = styled.div`
  position: sticky;
  bottom: 30px;
  left: 3%;
  right: 3%;
  /* height: 320px; */
  padding-bottom: 16px;
  width: 94%;
  background: #fff7;
  backdrop-filter: blur(35px);
  border-top: solid 1px #bab9bacc;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
`;
