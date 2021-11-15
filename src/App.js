import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { Redirect, Route } from 'react-router-dom';
import Context from './Context';
import Main from './screens/Main';
import tasksContractJSON from '../truffle/build/contracts/TasksContract.json';

const TruffleContract = require('@truffle/contract');


const App = () => {
  const [address, setAddress] = useState();
  const [tasksContract, setTasksContract] = useState();
  const [taskCounter, setTaskCounter] = useState(null);

  const { authenticate, user, enableWeb3, web3, Moralis, isAuthenticated } = useMoralis();

  async function connectToMetamask() {
    const web3Provider = window.ethereum;
    const addresses = await web3Provider.request({ method: 'eth_requestAccounts' });
    setAddress(addresses[0]);
    console.log('ADDRESS: ', addresses[0]);
    loadContracts(web3Provider);

    // var _tasksContract = await TruffleContract(tasksContractJSON);
    // await _tasksContract.setProvider(web3Provider);
    // _tasksContract = await _tasksContract.deployed();
    // setTasksContract(_tasksContract);
    // const taskCounter = await _tasksContract.taskCounter();
    // const taskCounterNumber = await taskCounter.toNumber();
    // await setTaskCounter(taskCounterNumber);
  }

  async function connectToWalletconnect() {
    console.log('USER: ', isAuthenticated.valueOf());
    await authenticate({
      provider: 'walletconnect',
      chainId: 3, // Ropsten
      signingMessage: 'Welcome!',
    }).then(() => {
      setAddress(user.attributes.accounts[0]);
      console.log(user.attributes.accounts[0]);
    });
    await enableWeb3({ provider: 'walletconnect' });
    await loadContracts(Moralis.web3.givenProvider);
  }

  async function loadContracts(web3Provider) {
    var _tasksContract = await TruffleContract(tasksContractJSON);
    await _tasksContract.setProvider(web3Provider);
    _tasksContract = await _tasksContract.deployed();
    console.log(_tasksContract);
    await setTasksContract(_tasksContract);
    const taskCounter = await _tasksContract.taskCounter();
    const taskCounterNumber = await taskCounter.toNumber();
    await setTaskCounter(taskCounterNumber);
  }

  useEffect(() => {
    if (window.ethereum) {
      connectToMetamask();
      // connectToWalletconnect();
    } else {
      connectToWalletconnect();
    }
  }, []);


    return (
      <Context
        value={{
          address,
          tasksContract,
          taskCounter,
          setTaskCounter,
        }}
      >
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet id="main">
              <Route path="/" render={() => tasksContract ? <Main /> : <p>Loading...</p>} />
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </Context>
    );
};

export default App;
