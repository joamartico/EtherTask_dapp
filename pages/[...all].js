import dynamic from 'next/dynamic';
import { MoralisProvider } from "react-moralis";

const App = dynamic(() => import('../src/App'), {
  ssr: false,
});

export default function Index() {
  return (
    <MoralisProvider
      appId="wETJZsZFm7KBKNoZzEzSCX2qomc4eUtKKCiCogSe"
      serverUrl="https://xme422kthgzm.usemoralis.com:2053/server"
    >
      <App />
    </MoralisProvider>

  );
}
