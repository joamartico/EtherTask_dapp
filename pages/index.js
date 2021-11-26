import dynamic from 'next/dynamic';
import { MoralisProvider } from "react-moralis";

const App = dynamic(() => import('../src/App'), {
  ssr: false,
});

export default function Index() {
  return (
    <MoralisProvider
      appId="bKM86xuwCM0NFaJzpdAurJZznwDgGaOibp7NSO7J"
      serverUrl="https://yggrjuusvkn4.usemoralis.com:2053/server"
    >
      <App />
    </MoralisProvider>
  );
}
