import React from 'react';
import { BsHeart } from 'react-icons/bs';

export default function Cardsm() {
  return (
    <div className='w-full'>
      <div className='w-[220px] h-[250px] rounded-lg bg-gray-400/30'></div>
      <div className='my-3'>
        <h3>The living Room</h3>
        <div className='my-2 flex items-center gap-2'>
          <div className='flex items-center justify-center rounded-full bg-gray-100 h-8 w-8'>
            <BsHeart size={13} />
          </div>
          <p className='text-sm'>5</p>
        </div>
      </div>
    </div>
  );
}
