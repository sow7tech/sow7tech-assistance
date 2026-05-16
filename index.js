import dynamic from 'next/dynamic';

const App = dynamic(() => import('../sow7tech.jsx'), { ssr: false });

export default function Home() {
  return <App />;
    }
