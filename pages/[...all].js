import dynamic from 'next/dynamic';
import { MoralisProvider } from "react-moralis";

const App = dynamic(() => import('../src/App'), {
  ssr: false,
});

export default function Index() {
  return (
    <MoralisProvider
      appId="yFo3Pl7utxrIYzpdH8Xh3J3arRiG4QfTu598QQMh"
      serverUrl="https://r5aswjxrqelg.usemoralis.com:2053/server"
    >
      <App />
    </MoralisProvider>

  );
}
