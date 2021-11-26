import dynamic from 'next/dynamic';
import { MoralisProvider } from "react-moralis";

const App = dynamic(() => import('../src/App'), {
  ssr: false,
});

export default function Index() {
  return (
    <MoralisProvider
      appId="P4ZWKTRTsn4HlXrKD9J4v6ZZCFqCcwG7vbM5ZB5V"
      serverUrl="https://zcho8o17e2pa.usemoralis.com:2053/server"
    >
      <App />
    </MoralisProvider>
  );
}
