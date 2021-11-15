import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenuButton,
  IonSearchbar,
  IonList,
  IonGrid,
  IonCol,
  IonRow,
  isPlatform,
  IonSplitPane,
  IonMenu,
} from '@ionic/react';

import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import TaskCard from '../components/TaskCard';

import Sidebar from '../components/Sidebar';
import BottomCard from '../components/BottomCard';
import { Context } from '../Context';
import { Padding } from '../components/StyledComponents';

const Main = () => {
  const { tasksContract, tasks, setTasks, taskCounter } = useContext(Context);

  async function getTasks() {
    const _tasks = [];

    for (let i = 1; i <= taskCounter; i++) {
      const task = await tasksContract.tasks(i);

      console.log('task[1]: ', task[1]);

      const newTask = await {
        id: task[0].toNumber(),
        title: task[1],
        description: task[2],
        done: task[3],
        createdAt: new Date(task[4].toNumber() * 1000).toLocaleString(),
      };

      _tasks[i - 1] = newTask;
    }
    setTasks(_tasks.reverse());
  }

  useEffect(() => {
    getTasks();
  }, [taskCounter]);

  return (
    <IonPage>
      <IonHeader
        style={{
          display: !isPlatform('mobile') && 'none',
        }}
      >
        <IonToolbar>
          <IonTitle size="large">EtherTask</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Row>
        <Sidebar display={!isPlatform('mobile') && true} />

        <IonContent>
          <PaddingBottom>
            {tasks.map(task => (
              <TaskCard
                id={task.id}
                title={task.title}
                description={task.description}
                createdAt={task.createdAt}
                done={task.done}
              />
            ))}
          </PaddingBottom>

          <BottomCard display={isPlatform('mobile') && true} />
        </IonContent>
      </Row>
    </IonPage>
  );
};

export default Main;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  /* flex-wrap: wrap; */
  /* justify-content: space-between; */
  align-items: center;
  width: 100%;
  height: 100%;
`;

const PaddingBottom = styled.div`
  padding-bottom: ${isPlatform('mobile') ? '60px' : '20px'};
`;
