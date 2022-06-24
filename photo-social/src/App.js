import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import Details from './Pages/Details';
import Home from './Pages/Home/Index';
import Saved from './Pages/Saved';
import Search from './Pages/Search';

function App() {
  return (
    <div className='custom-grid'>
      <div className='p-5 view-area'>
        <div className='max-w-2xl mx-auto'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/details' element={<Details />} />
            <Route path='/collection' element={<Saved />} />
          </Routes>
        </div>
      </div>

      <nav>
        <Nav />
      </nav>
    </div>
  );
}

export default App;
