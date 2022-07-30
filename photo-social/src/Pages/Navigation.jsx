import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Authentication from './Authentication';
import Homepage from './Homepage';
import { storeContext } from '../Context';

export default function Navigation() {
  const { state } = useContext(storeContext);

  return (
    <Routes>
      <Route path='/' exact element={<Homepage />} />
      <Route path='/auth/*' exact element={<Authentication />} />
      {state?.user && <Route path='/dash/*' exact element={<Dashboard />} />}
    </Routes>
  );
}
