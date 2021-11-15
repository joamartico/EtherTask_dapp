import { IonInput, IonTextarea } from '@ionic/react';
import styled from 'styled-components';

export const Padding = styled.div`
  width: 90%;
  height: 90%;
  margin: auto;
  align-items: flex-start;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  /* height: 20px; */
`;

export const BlurCard = styled.div`
  width: 85%;
  min-height: 80px;
  background: #fff7;
  backdrop-filter: blur(35px);
  border-top: solid 1px #bab9bacc;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  display: flex;
`;
