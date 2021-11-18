import React, { useContext, useState } from 'react';
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonTextarea,
  useIonPopover,
} from '@ionic/react';
import styled from 'styled-components';
import { Context } from '../Context';
import { Row } from './StyledComponents';
import { useMoralis } from 'react-moralis';
import { shortenAddress } from "../helpers/shortenAddress";

function PopoverList({ onLogout }) {
  
  return (
    <>
      <IonItem button detail={false}>
        Change Account
      </IonItem>
      <IonItem detail={false} button onClick={onLogout}>
        <IonLabel color="danger">Disconnect Wallet</IonLabel>
      </IonItem>
    </>
  );
}

const TaskInputs = ({ mobile }) => {
  const { logout } = useMoralis();
  const { address, setAddress, tasksContract, tasks, taskCounter, setTaskCounter } = useContext(Context);
  const [taskTitle, setTaskTitle] = useState();
  const [taskDescription, setTaskDescription] = useState();

  const [present, dismiss] = useIonPopover(PopoverList, { onLogout: () => {
    logout() 
    setAddress("")
  }});


  const shortAddress = address && address.substring(0, 2) + (address.substring(2, 6) + '...' + address.substring(address.length - 4)).toUpperCase();

  async function createTask() {
    tasksContract.methods
      .createTask(taskTitle, taskDescription)
      .send({ from: address })
      .then(async () => {
        await setTaskCounter(taskCounter + 1);
        setTaskTitle('');
        setTaskDescription('');

      }).catch(err => alert(err));
  }

  return (
    <>
      <Row style={{ marginTop: mobile ? 10 : 35 }}>
        <p>
          <b>Your Wallet is: </b>
          {shortAddress}
        </p>
        <IonIcon
          name="settings-outline"
          style={{ fontSize: '3vh' }}
          onClick={e =>
            present({
              event: e.nativeEvent,
            })
          }
        />
      </Row>

      <h2 style={{ marginTop: mobile ? 0 : 50 }}>Create a Task</h2>

      <InputTitle
        placeholder="Type the Task Name..."
        onIonChange={e => setTaskTitle(e.detail.value)}
        value={taskTitle}
      />

      <InputDescription
        placeholder="Type the Task Description..."
        onIonChange={e => setTaskDescription(e.detail.value)}
        rows={mobile ? 4 : 10}
        autoGrow={true}
        value={taskDescription}
      />
      <IonButton strong mode="ios" onClick={ () => createTask()}>
        Create
      </IonButton>
    </>
  );
};

export default TaskInputs;

const InputTitle = styled(IonInput)`
  background-color: white;
  border-radius: 10px;
  display: block !important;
  height: 40px !important;
  --height: 40px !important;
  --margin-top: auto !important;
`;

const InputDescription = styled(IonTextarea)`
  background-color: white;
  border-radius: 10px;
  display: block;
  --margin-top: auto !important;
`;

const SpacedDiv = styled.div`
  background: red;
  height: 100%;
`;
