import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { Redirect, Route } from 'react-router-dom';
import Context from './Context';
import Main from './screens/Main';
import tasksContractJSON from '../truffle/build/contracts/TasksContract.json';


const App = () => {
  const [address, setAddress] = useState();
  const [tasksContract, setTasksContract] = useState();
  const [taskCounter, setTaskCounter] = useState(null);

  const { authenticate, user, enableWeb3, Moralis, isAuthenticated } = useMoralis();

  async function connectToBrowserWallet() {
    const addresses = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAddress(addresses[0]);
    const web3 = await new Moralis.Web3(window.ethereum);
    loadContracts(web3);
  }

  async function connectToWalletconnect() {
    if (!isAuthenticated) {
      await authenticate({
        provider: 'walletconnect',
        chainId: 4, // Rinkeby
        // chainId: 42, // Kovan
        // chainId: 3, // Ropsten
        // chainId: 5, // Goerli
        signingMessage: 'Welcome! ',
      });
    }
    await enableWeb3({ provider: 'walletconnect' });
    const addresses = await Moralis.web3.eth.getAccounts();
    await setAddress(addresses[0]);
    
    await loadContracts(Moralis.web3);
  }


  async function loadContracts(web3Provider) {
    const networkId = await web3Provider.eth.net.getId();
    const networkData = await tasksContractJSON.networks[networkId];
    
    
    if (networkData) {
      const TasksContract = await new web3Provider.eth.Contract(tasksContractJSON.abi, networkData.address);

      await setTasksContract(TasksContract);
      await TasksContract.methods
        .taskCounter()
        .call()
        .then(res => {
          setTaskCounter(parseInt(res))
        });
    } else {
      alert('The network you choose with ID: ' + networkId + ' is not available for this dapp');
    }
  }

  useEffect(() => {
    const browserWallet = window.ethereum;

    if (browserWallet) {
      connectToBrowserWallet();
      // connectToWalletconnect();


      browserWallet.on('accountsChanged', async new_addresses => {
        connectToBrowserWallet();
      });

      browserWallet.on('chainChanged', async new_chainId => {
        connectToBrowserWallet();
      });
    } else {
      connectToWalletconnect();
    }
  }, []);

  return (
    <Context
      value={{
        address,
        setAddress,
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
