import { Routes, Route } from 'react-router-dom';
import AdditionalInformation from './AdditionalInformation';
import Login from './Login';
import Signup from './Signup';

export default function Authentication() {
  return (
    <Routes>
      <Route exact path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route
        path='/additional-information'
        element={<AdditionalInformation />}
      />
    </Routes>
  );
}
