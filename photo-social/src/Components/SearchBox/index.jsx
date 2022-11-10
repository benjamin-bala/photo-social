import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchBox(props) {
  return (
    <div className='flex items-center gap-2 border border-gray-300 px-5 py-3 rounded-lg'>
      <FiSearch stroke='#777' />
      <input
        className='outline-none bg-none'
        type='text'
        placeholder='Restaurants, Cinema.....'
        onChange={(event) => props.searchData(event)}
        ref={props.inputRef}
      />
    </div>
  );
}
