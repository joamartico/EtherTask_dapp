import React from 'react';
import styled from 'styled-components';
import { Padding } from "./StyledComponents";

const TaskCard = () => {
  return (
    <Card>
      <Padding>
        <h2>Title</h2>
      </Padding>
    </Card>
  );
};

export default TaskCard;

const Card = styled.div`
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


