import React, { useContext } from 'react';
import styled from 'styled-components';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonMenu,
  IonSplitPane,
} from '@ionic/react';
import { cog, flash, home, list, person, search, bookmark } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import Feed from './Main';
import { isPlatform } from '@ionic/core';
import Sidebar from "../components/Sidebar";

const Tabs = ({address}) => {
  return (
    <IonPage>
      <Row>
        <Sidebar  display={!isPlatform('mobile') && 'none'} address={address}/>
        
        
        <IonContent>
          <IonTabs className="ion-tabs">
            <IonRouterOutlet>
              <Route exact path="/tabs/feed" component={Feed} />
              <Route exact path="/tabs/search" component={Feed} />
              <Route exact path="/tabs/favourites" component={Feed} />
              <Route exact path="/tabs/user" component={Feed} />
              <Route exact path="/tabs" render={() => <Redirect to="/tabs/feed" />} />
            </IonRouterOutlet>

            <IonTabBar
              slot="bottom"
              style={{
                display: !isPlatform('mobile') && 'none',
              }}
            >
              <IonTabButton tab="tab1" href="/tabs/feed">
                <IonIcon icon={home} />
                <IonLabel>Feed</IonLabel>
              </IonTabButton>

              <IonTabButton tab="tab2" href="/tabs/search">
                <IonIcon icon={search} />
                <IonLabel>Search</IonLabel>
              </IonTabButton>

              <IonTabButton tab="tab3" href="/tabs/favourites">
                <IonIcon icon={bookmark} />
                <IonLabel>Favourites</IonLabel>
              </IonTabButton>

              <IonTabButton tab="tab4" href="/tabs/user">
                <IonIcon icon={person} />
                <IonLabel>User</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonContent>
      </Row>
    </IonPage>
  );
};

export default Tabs;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  /* flex-wrap: wrap; */
  /* justify-content: space-between; */
  align-items: center;
  width: 100%;
  height: 100%;
`;
