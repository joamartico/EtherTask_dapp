import { IonCheckbox, IonText } from '@ionic/react';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../Context';
import { BlurCard, Padding, Row } from './StyledComponents';

const TaskCard = ({ title, description, done, createdAt, id }) => {
  const { tasksContract, address } = useContext(Context);

  const onCheckboxChange = async () => {
    await tasksContract.methods.toggleDone(id).send({ from: address });
  };

  return (
    <BlurCard>
      <Padding>
        <Row>
          <Padding style={{ marginLeft: 0 }}>
            <h2 style={{ marginBottom: -5 }}>{title}</h2>
            <p>{description}</p>
            <p style={{ color: '#0006' }}>{createdAt}</p>
          </Padding>

          <IonCheckbox checked={done} onClick={onCheckboxChange} />
        </Row>
      </Padding>
    </BlurCard>
  );
};

export default TaskCard;
