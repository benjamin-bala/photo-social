import React from 'react';
import { BsBookmark } from 'react-icons/bs';

export default function Saved() {
  return (
    <div>
      <div>
        <h3 className='text-semibold font-semibold text-lg'>Collections</h3>
      </div>
      <div className='mt-20'>
        <div className='flex flex-col justify-center items-center'>
          <div className='bg-gray-400/20 h-16 w-16 rounded-full flex items-center justify-center'>
            <BsBookmark size={25} fill='#000' />
          </div>
          <div className='text-center my-3'>
            <h4 className='text-semibold font-semibold'>Nothing saved yet</h4>
            <p>You'll see the collections you save here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
