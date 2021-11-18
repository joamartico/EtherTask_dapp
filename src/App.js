import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { Redirect, Route } from 'react-router-dom';
import Context from './Context';
import Main from './screens/Main';
import tasksContractJSON from '../truffle/build/contracts/TasksContract.json';
import HDWalletProvider from '@truffle/hdwallet-provider';
const mnemonic = require('../truffle/secrets.json').mnemonic;
const TruffleContract = require('@truffle/contract');

const App = () => {
  const [address, setAddress] = useState();
  const [tasksContract, setTasksContract] = useState();
  const [taskCounter, setTaskCounter] = useState(null);

  const { authenticate, user, enableWeb3, Moralis, isAuthenticated } = useMoralis();

  async function connectToMetamask() {
    const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAddress(addresses[0]);
    const web3 = await new Moralis.Web3(window.ethereum);
    const networkId = await web3.eth.net.getId();
    const networkData = tasksContractJSON.networks[networkId];

    if (networkData) {
      const TasksContract = new web3.eth.Contract(tasksContractJSON.abi, networkData.address);
      setTasksContract(TasksContract);
      TasksContract.methods
        .taskCounter()
        .call()
        .then(res => setTaskCounter(parseInt(res)));
    } else {
      alert('The network you choose with ID: ' + networkId + ' is not available for this dapp');
    }
  }

  async function connectToWalletconnect() {
    console.log('USER: ', user);

    if (!isAuthenticated) {
      await authenticate({
        provider: 'walletconnect',
        chainId: 42, // Kovan
        signingMessage: 'Welcome! ',
      });
    }
    await enableWeb3({ provider: 'walletconnect' });
    const addresses = await Moralis.web3.eth.getAccounts();
    await console.log('ADDRESS moralis: ', addresses[0]);

    await setAddress(addresses[0]);
    const web3 = await new Moralis.Web3(Moralis.web3.givenProvider);
    const TasksContract = await new web3.eth.Contract(
      tasksContractJSON.abi,
      '0xb17A006e020e6e87A68cB660816AaC6A2B2B6935'
    );
    await setTasksContract(TasksContract);
    TasksContract.methods
      .taskCounter()
      .call()
      .then(res => setTaskCounter(parseInt(res)));
  }

  useEffect(() => {
    const web3Provider = window.ethereum;

    if (web3Provider) {
      // connectToMetamask();
      connectToWalletconnect();

      web3Provider.on('accountsChanged', async new_addresses => {
        connectToMetamask();
      });

      web3Provider.on('chainChanged', async new_chainId => {
        connectToMetamask();
      });
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
            <Route path="/" render={() => (tasksContract ? <Main /> : <p>Loading...</p>)} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Context>
  );
};

export default App;
