import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { Redirect, Route } from 'react-router-dom';
import Context from './Context';
import Tabs from './pages/Tabs';

function shortenAddress(address) {
  return address.substring(0, 6) + '...' + address.substring(address.length - 4);
}

const App = () => {
  const [address, setAddress] = useState();

  const {authenticate } = useMoralis()

  async function connectToMetamask() {
    const web3Provider = window.ethereum;
    const completeAddress = await web3Provider.request({ method: 'eth_requestAccounts' });
    setAddress(shortenAddress(completeAddress[0]));
  }

  async function connectToWalletconnect() {
    const user = await authenticate({
      provider : 'walletconnect',
      chainId: 3, // Ropsten
      // signingMessage: "Welcome!"

    });
  }
  

  useEffect(() => {
    if (window.ethereum) {
      connectToMetamask();

    } else {
      connectToWalletconnect()
    }
  }, []);
  return (
      <Context>
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet id="main">
              <Route path="/tabs" render={() => <Tabs address={address} />} />
              <Route exact path="/" render={() => <Redirect to="/tabs" />} />
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </Context>
  );
};

export default App;
