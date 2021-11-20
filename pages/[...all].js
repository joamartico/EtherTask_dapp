import dynamic from 'next/dynamic';
import { MoralisProvider } from "react-moralis";

const App = dynamic(() => import('../src/App'), {
  ssr: false,
});

export default function Index() {
  return (
      <App />
  );
}
