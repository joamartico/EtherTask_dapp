import dynamic from 'next/dynamic';
import { MoralisProvider } from "react-moralis";

const App = dynamic(() => import('../src/App'), {
  ssr: false,
});

export default function Index() {
  return (
    <MoralisProvider
      appId="sdf5EEMWKZtvVGPIJ64rpsQEsXpyGrGIPKa3VeZu"
      serverUrl="https://9lw3o4phxrfm.usemoralis.com:2053/server"
    >
      <App />
    </MoralisProvider>
  );
}
