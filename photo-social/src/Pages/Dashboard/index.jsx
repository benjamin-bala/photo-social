import { Routes, Route } from 'react-router-dom';
import Nav from '../../Components/Nav';
import Details from '../Details';
import Home from '../Home';
import Profile from '../Profile';
import Saved from '../Saved';
import Search from '../Search';

export default function Dashboard() {
  return (
    <div className='custom-grid'>
      <div className='p-5 view-area'>
        <div className='max-w-2xl mx-auto'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/details' element={<Details />} />
            <Route path='/collection' element={<Saved />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </div>
      </div>

      <nav>
        <Nav />
      </nav>
    </div>
  );
}
