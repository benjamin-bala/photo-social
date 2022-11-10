import { Routes, Route } from 'react-router-dom';
import Nav from '../../Components/Nav';
import Comments from '../Comments';
import Details from '../Details';
import EditProfile from '../EditProfile';
import FeedDetails from '../FeedDetails';
import Home from '../Home';
import Profile from '../Profile';
import Saved from '../Saved';
import Search from '../Search';
import UploadPhoto from '../UploadPhoto';

export default function Dashboard() {
  return (
    <div className='custom-grid bg-white'>
      <div className='p-5 view-area'>
        <div className='max-w-2xl mx-auto'>
          <div className='mb-10'>
            <p className='logo-text text-3xl'>YouTourism</p>
          </div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/upload-spot' element={<UploadPhoto />} />
            <Route path='/details' element={<Details />} />
            <Route path='/feed' element={<FeedDetails />} />
            <Route path='/comment/:id' element={<Comments />} />
            <Route path='/collection' element={<Saved />} />
            <Route path='/profile/*' element={<Profile />} />
            <Route path='/edit-profile' element={<EditProfile />} />
          </Routes>
        </div>
      </div>

      <nav>
        <Nav />
      </nav>
    </div>
  );
}
