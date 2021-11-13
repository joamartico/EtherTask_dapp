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

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import TaskCard from '../components/TaskCard';

const Main = () => {
  

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Main</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      
        

        <IonContent className="scroll" fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">EtherTask</IonTitle>
            </IonToolbar>
          </IonHeader>

          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </IonContent>
      
    </IonPage>
  );
};

export default Main;

