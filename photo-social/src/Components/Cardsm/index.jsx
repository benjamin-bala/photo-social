import React from 'react';
import { BsHeart } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Cardsm({ data }) {
  return (
    <div className='w-full'>
      <div className='w-[220px] h-[250px] rounded-lg bg-gray-400/30'>
        <Link to={'/dash/feed'} state={data}>
          <img
            src={data && data.photo[0]}
            alt={data.title}
            className='w-full h-full rounded-lg object-cover'
          />
        </Link>
      </div>
      <div className='my-3'>
        <h3>{data.title}</h3>
        <div className='my-2 flex items-center gap-2'>
          <div className='flex items-center justify-center rounded-full bg-gray-100 h-8 w-8'>
            <BsHeart size={13} />
          </div>
          <p className='text-sm'>{data.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
