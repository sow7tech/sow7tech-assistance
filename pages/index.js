'use client';
import dynamic from 'next/dynamic';
const App = dynamic(() => import('./app.jsx'), { ssr: false });
export default App;
