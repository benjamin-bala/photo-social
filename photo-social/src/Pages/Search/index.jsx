import React from 'react';
import SearchBox from '../../Components/SearchBox';
import Slider from '../../Components/Slider';

export default function Search() {
  return (
    <div>
      <div className='my-3'>
        <SearchBox />
      </div>
      <div>
        <Slider name='Trending Backdrops' />
        <Slider name='Recently Added Backdrops' />
      </div>
    </div>
  );
}
